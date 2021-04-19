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
const MarkRegister_1 = require("../core/entities/Exams/MarkRegister");
const Grades_1 = require("../core/entities/Exams/Grades");
const exceptions_1 = require("../core/exceptions");
const ClassSections_1 = require("../core/entities/Master/ClassSections");
const MarkRegisterSum_1 = require("../core/entities/Exams/MarkRegisterSum");
class MarkRegisterService {
    constructor() { }
    getClassMarkRegister(examName, classId, acadyear) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const q_reg_data = yield typeorm_1.getManager()
                    .getRepository(MarkRegister_1.MarkRegister)
                    .createQueryBuilder("marks")
                    .select([
                    "marks.id AS id",
                    "exams.name AS examName",
                    "class.name AS className",
                    "class.section AS classSection",
                    "subjects.name AS subjectName",
                    "subjects.color AS subjectColor",
                    "subjects.subcode AS subjectCode",
                    "subjects.orderby AS subjectOrderby",
                    "students.id AS studentId",
                    "students.firstname AS firstName",
                    "students.lastname AS lastName",
                    "students.gender AS gender",
                    "exams.min_marks AS minMarks",
                    "exams.max_marks AS maxMarks",
                    "marks.marks_obtained AS marksObtained",
                    "marks.percentage AS perc",
                    "marks.acad_year AS acad_year",
                    "marks.notes AS notes",
                    "grade.name AS gradeName",
                    "grade.color AS gradeColor",
                    "grade.grade_point AS gradePoint",
                    "total.total_marks_obtained AS totalMarksObtained",
                    "total.total_max_marks AS totalMaxMarks",
                    "total.total_grade AS totalGrade",
                    "total.total_grade_color as totalGradeColor",
                    "total.total_percentage AS totalPercentage"
                ])
                    .leftJoin("marks.exam_class_sub", "exams")
                    .leftJoin("exams.class", "class")
                    .leftJoin("exams.subjects", "subjects")
                    .leftJoin("marks.students", "students")
                    .leftJoin(Grades_1.ExamGrades, "grade", "grade.id = marks.grade")
                    .leftJoin(subQry => {
                    const qb = subQry
                        .select([
                        "s.*",
                    ])
                        .from(MarkRegisterSum_1.MarkRegisterSummary, "s")
                        .where("s.exam_name = :examName", { examName: examName })
                        .andWhere("s.class_id = :classId", { classId: classId });
                    return qb;
                }, "total", `total.exam_name = exams.name
					AND total.class_id = class.id
					AND total.student_id = students.id`)
                    .where("exams.name = :examName", { examName: examName })
                    .andWhere("class.id = :classId", { classId: classId })
                    .orderBy("students.firstname", "ASC")
                    .addOrderBy("students.gender", "DESC")
                    .addOrderBy("subjects.orderby", "ASC")
                    .getRawMany();
                const q_subj = yield this.getSubjectsByClass(classId);
                const result = yield lodash_1.default.chain(q_reg_data)
                    .groupBy("studentId")
                    .map((value, key) => {
                    let keyValue = undefined;
                    const marksArr = [];
                    let profile = {};
                    lodash_1.default.map(value, o => {
                        const marks = lodash_1.default.pick(o, [
                            "subjectName",
                            "subjectColor",
                            "subjectOrderby",
                            "marksObtained",
                            "maxMarks",
                            "perc",
                            "gradeName",
                            "gradePoint",
                            "gradeColor"
                        ]);
                        marksArr.push(marks);
                        if (key !== keyValue) {
                            keyValue = o.studentId;
                            profile = lodash_1.default.pick(o, [
                                "firstName",
                                "lastName",
                                "gender",
                                "examName",
                                "className",
                                "classSection",
                                "totalMarksObtained",
                                "totalMaxMarks",
                                "totalGrade",
                                "totalGradeColor",
                                "totalPercentage",
                                "notes"
                            ]);
                        }
                    });
                    const unionSubj = [...marksArr, ...q_subj];
                    const distinctSubjects = unionSubj.filter((thing, i, arr) => arr.findIndex(t => t.subjectName === thing.subjectName) === i);
                    const finalSubj = lodash_1.default.orderBy(distinctSubjects, ["subjectOrderby"], ["asc"]);
                    const oResult = {
                        studentId: (key),
                        profile: profile,
                        marks: finalSubj,
                        acad_year: acadyear
                    };
                    return oResult;
                })
                    .value();
                return result;
            }
            catch (error) {
                throw new exceptions_1.InternalServerError("getClassMarkRegister Unhandled Error: ", error);
            }
        });
    }
    getStudentMarks(examName, classId, studentId, acadyear) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const q_data = typeorm_1.getManager()
                    .getRepository(MarkRegister_1.MarkRegister)
                    .createQueryBuilder("marks")
                    .select([
                    "marks.id AS id",
                    "exams.name AS examName",
                    "class.name AS className",
                    "class.section AS classSection",
                    "subjects.name AS subjectName",
                    "subjects.color AS subjectColor",
                    "subjects.subcode AS subjectCode",
                    "subjects.orderby AS subjectOrderby",
                    "students.id AS studentId",
                    "students.firstname AS firstName",
                    "students.lastname AS lastName",
                    "students.gender AS gender",
                    "exams.min_marks AS minMarks",
                    "exams.max_marks AS maxMarks",
                    "marks.marks_obtained AS marksObtained",
                    "marks.percentage AS perc",
                    "marks.acad_year AS acad_year",
                    "marks.notes AS notes",
                    "grade.name AS gradeName",
                    "grade.color AS gradeColor",
                    "grade.grade_point AS gradePoint",
                    "total.total_marks_obtained AS totalMarksObtained",
                    "total.total_max_marks AS totalMaxMarks",
                    "total.total_grade AS totalGrade",
                    "total.total_grade_color as totalGradeColor",
                    "total.total_percentage AS totalPercentage"
                ])
                    .leftJoin("marks.exam_class_sub", "exams")
                    .leftJoin("exams.class", "class")
                    .leftJoin("exams.subjects", "subjects")
                    .leftJoin("marks.students", "students")
                    .leftJoin(Grades_1.ExamGrades, "grade", "grade.id = marks.grade")
                    .leftJoin(subQry => {
                    const qb = subQry
                        .select([
                        "s.*",
                    ])
                        .from(MarkRegisterSum_1.MarkRegisterSummary, "s");
                    if (examName !== "Show All") {
                        qb.where("s.exam_name = :examName", { examName: examName });
                    }
                    qb.andWhere("s.class_id = :classId", { classId: classId })
                        .andWhere("s.student_id = :studentId", { studentId: studentId });
                    return qb;
                }, "total", `total.exam_name = exams.name
					AND total.class_id = class.id
					AND total.student_id = students.id`);
                if (examName !== "Show All") {
                    q_data.where("exams.name = :examName", { examName: examName });
                }
                q_data.andWhere("class.id = :classId", { classId: classId })
                    .andWhere("students.id = :studentId", { studentId: studentId })
                    .orderBy("students.firstname", "ASC")
                    .addOrderBy("students.gender", "DESC")
                    .addOrderBy("subjects.orderby", "ASC");
                const q_data_Result = yield q_data.getRawMany();
                const q_subj = yield this.getSubjectsByClass(classId);
                const result = yield lodash_1.default.chain(q_data_Result)
                    .groupBy("examName")
                    .map((value, key) => {
                    let keyValue = undefined;
                    const marksArr = [];
                    let profile = {};
                    lodash_1.default.map(value, o => {
                        const marks = lodash_1.default.pick(o, [
                            "subjectName",
                            "subjectColor",
                            "subjectOrderby",
                            "marksObtained",
                            "perc",
                            "gradeName",
                            "gradePoint",
                            "gradeColor"
                        ]);
                        marksArr.push(marks);
                        if (key !== keyValue) {
                            keyValue = o.examName;
                            profile = lodash_1.default.pick(o, [
                                "studentId",
                                "firstName",
                                "lastName",
                                "gender",
                                "examName",
                                "className",
                                "classSection",
                                "maxMarks",
                                "totalMarksObtained",
                                "totalMaxMarks",
                                "totalGrade",
                                "totalGradeColor",
                                "totalPercentage",
                                "notes"
                            ]);
                        }
                    });
                    const unionSubj = [...marksArr, ...q_subj];
                    const distinctSubjects = unionSubj.filter((thing, i, arr) => arr.findIndex(t => t.subjectName === thing.subjectName) === i);
                    const finalSubj = lodash_1.default.orderBy(distinctSubjects, ["subjectOrderby"], ["asc"]);
                    return {
                        examName: (key),
                        profile: profile,
                        marks: finalSubj
                    };
                })
                    .value();
                return result;
            }
            catch (error) {
                throw new exceptions_1.InternalServerError("getStudentMarks Unhandled Error: ", error);
            }
        });
    }
    getSubjectsByClass(classId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield typeorm_1.getManager()
                    .getRepository(ClassSections_1.ClassSections)
                    .createQueryBuilder("cls")
                    .select([`s.name as subjectName,
				s.color as subjectColor,
				s.orderby as subjectOrderby,
				0 as marksObtained,
				0 as perc,
				'' as gradeName,
				'' as gradePoint,
				'' as gradeColor`])
                    .leftJoin("cls.classteachersub", "ct")
                    .leftJoin("ct.subject", "s")
                    .where("cls.id = :id", { id: classId })
                    .orderBy("s.orderby")
                    .getRawMany();
                return result;
            }
            catch (error) {
                throw new exceptions_1.InternalServerError("FindGrade Unhandled Error: ", error);
            }
        });
    }
}
exports.MarkRegisterService = MarkRegisterService;
//# sourceMappingURL=ExamMarkRegisterSvc.js.map