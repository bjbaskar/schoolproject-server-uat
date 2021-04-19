"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const lodash_1 = __importDefault(require("lodash"));
const Exam_1 = require("../core/entities/Exams/Exam");
const Grades_1 = require("../core/entities/Exams/Grades");
const MarkRegisterSum_1 = require("../core/entities/Exams/MarkRegisterSum");
const Student_1 = require("../core/entities/Students/Student");
const ClassSections_1 = require("../core/entities/Master/ClassSections");
const exceptions_1 = require("../core/exceptions");
const PromotionSvcBase_1 = require("./PromotionSvcBase");
const PromotionStatus_1 = require("../core/entities/Exams/PromotionStatus");
class PromotionService extends PromotionSvcBase_1.PromotionServiceBase {
    constructor(params) {
        super(params);
        this.IN_PARAMS = params;
    }
    getStudentsForPromotion(examName, classId, acadyear) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let result = {
                    promotionData: [],
                    status: undefined
                };
                if ((yield this.verifyPromotion(classId)) > 0) {
                    result = {
                        promotionData: [],
                        status: "COMPLETED"
                    };
                }
                else {
                    const q_reg_data = yield typeorm_1.getManager()
                        .getRepository(MarkRegisterSum_1.MarkRegisterSummary)
                        .createQueryBuilder("mrs")
                        .select([
                        "DISTINCT CONCAT(students.firstname, ' ', students.lastname) AS studentName",
                        "CONCAT(class.name, ' ', class.section) AS classNameSection",
                        "students.id AS studentId",
                        "students.gender AS gender",
                        "'' AS totalGrade",
                        "'' AS totalGradeColor",
                        "FORMAT((total.total_percentage/total.examCount),2) AS totalPercentage",
                        "mrs.acad_year AS acadYear"
                    ])
                        .leftJoin(Exam_1.Exams, "exams", "mrs.exam_name = exams.name")
                        .leftJoin(ClassSections_1.ClassSections, "class", "mrs.class_id = class.id")
                        .leftJoin(Student_1.Students, "students", "mrs.student_id = students.id")
                        .leftJoin(subQry => {
                        const qb = subQry
                            .select([
                            "SUM(s.total_percentage) AS total_percentage",
                            "COUNT(s.exam_name) AS examCount",
                            "s.class_id AS class_id",
                            "s.student_id AS student_id"
                        ])
                            .from(MarkRegisterSum_1.MarkRegisterSummary, "s")
                            .where("s.exam_name IN (:examName)", { examName: examName })
                            .andWhere("s.class_id = :classId", { classId: classId })
                            .groupBy("s.student_id")
                            .addGroupBy("s.class_id");
                        return qb;
                    }, "total", "total.class_id = mrs.class_id AND total.student_id = mrs.student_id")
                        .where("exams.name IN (:examName)", { examName: examName })
                        .andWhere("class.id = :classId", { classId: classId })
                        .orderBy("studentName", "ASC")
                        .addOrderBy("gender", "DESC")
                        .getRawMany();
                    const gRes = lodash_1.default.map(q_reg_data, (d) => __awaiter(this, void 0, void 0, function* () {
                        const gradeObj = yield this.findGrade(d.totalPercentage);
                        if (gradeObj) {
                            const total_grade = gradeObj.gradeName;
                            const total_grade_color = gradeObj.gradeColor;
                            const grade = {
                                totalGrade: total_grade,
                                totalGradeColor: total_grade_color
                            };
                            const res = Object.assign({}, d, grade);
                            return res;
                        }
                    }));
                    result = {
                        status: undefined,
                        promotionData: gRes
                    };
                }
                return result;
            }
            catch (error) {
                throw new exceptions_1.InternalServerError("getStudentsForPromotion: ", error);
            }
        });
    }
    findGrade(marks) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const res = yield typeorm_1.getManager()
                    .getRepository(Grades_1.ExamGrades)
                    .createQueryBuilder("g")
                    .select(["g.name AS gradeName", "g.color as gradeColor"])
                    .where("g.min <= :markValue AND g.max >= :markValue", { markValue: marks })
                    .getRawOne();
                const result = res ? {
                    gradeName: res.gradeName,
                    gradeColor: res.gradeColor
                } : undefined;
                return result;
            }
            catch (error) {
                throw new exceptions_1.InternalServerError("FindGrade Unhandled Error: ", error);
            }
        });
    }
    verifyPromotion(classId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield typeorm_1.getManager()
                    .getRepository(PromotionStatus_1.PromotionStatus)
                    .createQueryBuilder("ps")
                    .where("class_id = :classId", { classId: classId })
                    .andWhere("status = 'COMPLETED'")
                    .getCount();
                return result;
            }
            catch (error) {
                throw new exceptions_1.InternalServerError("verifyPromotion: ", error);
            }
        });
    }
    doPromotion() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (this.IN_PARAMS.isFinalYear) {
                    const final = yield this.doPromotionFinalYear();
                }
                else {
                    const inter = yield this.doPromotionInternal();
                }
                yield this.updatePromotionHistory();
                const histAtt = {
                    classFrom: this.PARAMS.classIdFrom,
                    classTo: this.PARAMS.classIdTo,
                    acadFrom: this.PARAMS.acadYearFrom,
                    acadTo: this.PARAMS.acadYearTo
                };
                const finalResult = Object.assign({}, this.PR_LOG, histAtt);
                return finalResult;
            }
            catch (error) {
                console.log("error=", error);
                throw new exceptions_1.InternalServerError("doPromotion: ", error);
            }
        });
    }
    doPromotionInternal() {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = typeorm_1.getConnection();
            const queryRunner = connection.createQueryRunner();
            try {
                yield queryRunner.connect();
                yield queryRunner.startTransaction();
                const addToNewClass = yield this.addToNewClass(queryRunner.manager);
                const updateAcadYear = yield this.updateAcadYear(queryRunner.manager);
                const updateDetainedStudents = yield this.updateDetainedStudents(queryRunner.manager);
                const addMarksToArchieve = yield this.addMarksToArchieve(queryRunner.manager);
                const delMarkRegister = yield this.deleteMarkRegister(queryRunner.manager);
                const delMarkRegisterSum = yield this.deleteMarkRegisterSummary(queryRunner.manager);
                const addAttendanceTpArchieve = yield this.addAttendanceToArchieve(queryRunner.manager);
                const deleteAttendanceToArchieve = yield this.deleteAttendance(queryRunner.manager);
                const updPromotionStatus = yield this.updatePromotionStatus(queryRunner.manager);
                yield queryRunner.rollbackTransaction();
            }
            catch (error) {
                console.log("error=", error);
                yield queryRunner.rollbackTransaction();
                throw new exceptions_1.InternalServerError("doPromotionInternal: ", error);
            }
            finally {
                yield queryRunner.release();
            }
        });
    }
    doPromotionFinalYear() {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = typeorm_1.getConnection();
            const queryRunner = connection.createQueryRunner();
            try {
                yield queryRunner.connect();
                yield queryRunner.startTransaction();
                const addToAlumni = yield this.addToAlumni(queryRunner.manager);
                const updateDetainedStudents = yield this.updateDetainedStudents(queryRunner.manager);
                const addMarksToArchieve = yield this.addMarksToArchieve(queryRunner.manager);
                const delMarkRegister = yield this.deleteMarkRegister(queryRunner.manager);
                const delMarkRegisterSum = yield this.deleteMarkRegisterSummary(queryRunner.manager);
                const addAttendanceToArchieve = yield this.addAttendanceToArchieve(queryRunner.manager);
                const deleteAttendance = yield this.deleteAttendance(queryRunner.manager);
                const updPromotionStatus = yield this.updatePromotionStatus(queryRunner.manager);
                yield queryRunner.rollbackTransaction();
            }
            catch (error) {
                console.log("error=", error);
                yield queryRunner.rollbackTransaction();
                throw new exceptions_1.InternalServerError("doPromotionFinalYear: ", error);
            }
            finally {
                yield queryRunner.release();
            }
        });
    }
}
exports.PromotionService = PromotionService;
//# sourceMappingURL=PromotionSvc.js.map