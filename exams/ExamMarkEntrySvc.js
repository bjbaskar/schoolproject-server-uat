"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const Exam_1 = require("../core/entities/Exams/Exam");
const MarkRegister_1 = require("../core/entities/Exams/MarkRegister");
const Grades_1 = require("../core/entities/Exams/Grades");
const exceptions_1 = require("../core/exceptions");
const Student_1 = require("../core/entities/Students/Student");
const ClassSections_1 = require("../core/entities/Master/ClassSections");
const MarkRegisterSum_1 = require("../core/entities/Exams/MarkRegisterSum");
class MarkEntryService {
    constructor() { }
    verifyMarkReg(input) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const examName = input.examName;
                const classId = input.classId;
                const subjectId = input.subjectId;
                const res = yield typeorm_1.getManager()
                    .getRepository(MarkRegister_1.MarkRegister)
                    .createQueryBuilder("reg")
                    .leftJoin("reg.exam_class_sub", "exams")
                    .leftJoin("exams.class", "class")
                    .leftJoin("exams.subjects", "subjects")
                    .where("exams.name = :examName", { examName: examName })
                    .andWhere("class.id = :classId", { classId: classId })
                    .andWhere("subjects.id = :subjectId", { subjectId: subjectId })
                    .getCount();
                const resp = {
                    count: res,
                    isFound: res > 0 ? true : false
                };
                return resp;
            }
            catch (error) {
                throw new exceptions_1.InternalServerError("verifyMarkReg Unhandled Error: ", error);
            }
        });
    }
    createMarkRegister(input, acadyear, currentUser) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const examName = input.examName;
                const classId = input.classId;
                const subjectId = input.subjectId;
                const res = yield this.addMarkRegister(input, acadyear, currentUser);
                if (!res) {
                    throw new exceptions_1.InternalServerError("createMarkRegister Unhandled Error: ");
                }
                const result = yield this.getMarkEntry(examName, classId, subjectId, acadyear);
                return result;
            }
            catch (error) {
                throw new exceptions_1.InternalServerError("createMarkRegister Unhandled Error: ", error);
            }
        });
    }
    addMarkRegister(input, acadyear, currentUser) {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = typeorm_1.getConnection();
            const queryRunner = connection.createQueryRunner();
            try {
                yield queryRunner.connect();
                yield queryRunner.startTransaction();
                const examName = input.examName;
                const classId = input.classId;
                const subjectId = input.subjectId;
                const hasData = yield this.verifyMarkReg(input);
                if (hasData.count === 0) {
                    const oStudendID = yield typeorm_1.getManager()
                        .getRepository(ClassSections_1.ClassSections)
                        .createQueryBuilder("c")
                        .select([
                        "st.id AS studentId"
                    ])
                        .leftJoin("c.students", "st")
                        .where("c.id = :classId", { classId: classId })
                        .andWhere("st.isactive = true")
                        .orderBy("st.firstname", "ASC")
                        .addOrderBy("st.gender", "DESC")
                        .getRawMany();
                    const oExam = yield typeorm_1.getManager()
                        .getRepository(Exam_1.Exams)
                        .createQueryBuilder("exam")
                        .where("exam.name = :examName", { examName: examName })
                        .andWhere("exam.class = :classId", { classId: classId })
                        .andWhere("exam.subjects = :subjectId", { subjectId: subjectId })
                        .getOne();
                    for (let i = 0; i <= oStudendID.length - 1; i++) {
                        const entity = new MarkRegister_1.MarkRegister();
                        const oStudent = yield queryRunner.manager.getRepository(Student_1.Students)
                            .findOne({ where: { id: oStudendID[i].studentId } });
                        entity.marks_obtained = 0;
                        entity.grade = "";
                        entity.percentage = 0;
                        entity.acad_year = acadyear;
                        entity.notes = "";
                        entity.createdby = currentUser;
                        yield queryRunner.manager
                            .getRepository(MarkRegister_1.MarkRegister)
                            .createQueryBuilder()
                            .insert()
                            .into(MarkRegister_1.MarkRegister)
                            .values(entity)
                            .execute()
                            .then((r) => __awaiter(this, void 0, void 0, function* () {
                            yield queryRunner.manager
                                .getRepository(MarkRegister_1.MarkRegister)
                                .createQueryBuilder()
                                .relation(MarkRegister_1.MarkRegister, "students")
                                .of(entity)
                                .add(oStudent);
                            yield queryRunner.manager
                                .getRepository(MarkRegister_1.MarkRegister)
                                .createQueryBuilder()
                                .relation(MarkRegister_1.MarkRegister, "exam_class_sub")
                                .of(entity)
                                .add(oExam);
                        }));
                    }
                }
                const res2 = yield this.AddManyToMarkRegSummary(queryRunner.manager, examName, classId, currentUser);
                yield queryRunner.commitTransaction();
                return true;
            }
            catch (error) {
                yield queryRunner.rollbackTransaction();
                throw new exceptions_1.InternalServerError("addMarkRegister Unhandled Error: ", error);
            }
            finally {
                yield queryRunner.release();
            }
        });
    }
    addStudentToRegister(studentId, input, acadyear, currentUser) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const examName = input.examName;
                const classId = input.classId;
                const subjectId = input.subjectId;
                const res = yield this.addStudentToMarkRegister(studentId, input, acadyear, currentUser);
                if (!res) {
                    throw new exceptions_1.InternalServerError("addStudentToRegister Unhandled Error: ");
                }
                const result = yield this.getMarkEntry(examName, classId, subjectId, acadyear);
                return result;
            }
            catch (error) {
                throw new exceptions_1.InternalServerError("addStudentToRegister Unhandled Error: ", error);
            }
        });
    }
    addStudentToMarkRegister(studentId, input, acadyear, currentUser) {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = typeorm_1.getConnection();
            const queryRunner = connection.createQueryRunner();
            try {
                yield queryRunner.connect();
                yield queryRunner.startTransaction();
                const examName = input.examName;
                const classId = input.classId;
                const subjectId = input.subjectId;
                const hasData = yield queryRunner.manager
                    .getRepository(MarkRegister_1.MarkRegister)
                    .createQueryBuilder("reg")
                    .leftJoin("reg.exam_class_sub", "exams")
                    .leftJoin("exams.class", "class")
                    .leftJoin("exams.subjects", "subjects")
                    .leftJoin("reg.students", "students")
                    .where("exams.name = :examName", { examName: examName })
                    .andWhere("class.id = :classId", { classId: classId })
                    .andWhere("subjects.id = :subjectId", { subjectId: subjectId })
                    .andWhere("students.id = :studentId", { studentId: studentId })
                    .getCount();
                if (hasData === 0) {
                    const oExam = yield queryRunner.manager
                        .getRepository(Exam_1.Exams)
                        .createQueryBuilder("exam")
                        .where("exam.name = :examName", { examName: examName })
                        .andWhere("exam.class = :classId", { classId: classId })
                        .andWhere("exam.subjects = :subjectId", { subjectId: subjectId })
                        .getOne();
                    const oStudent = yield queryRunner.manager.getRepository(Student_1.Students)
                        .findOne({ where: { id: studentId } });
                    const entity = new MarkRegister_1.MarkRegister();
                    entity.marks_obtained = 0;
                    entity.grade = "";
                    entity.percentage = 0;
                    entity.acad_year = acadyear;
                    entity.notes = "";
                    entity.createdby = currentUser;
                    yield queryRunner.manager
                        .getRepository(MarkRegister_1.MarkRegister)
                        .createQueryBuilder()
                        .insert()
                        .into(MarkRegister_1.MarkRegister)
                        .values(entity)
                        .execute()
                        .then((r) => __awaiter(this, void 0, void 0, function* () {
                        yield queryRunner.manager
                            .getRepository(MarkRegister_1.MarkRegister)
                            .createQueryBuilder()
                            .relation(MarkRegister_1.MarkRegister, "students")
                            .of(entity)
                            .add(oStudent)
                            .catch(error => {
                            throw new exceptions_1.InternalServerError("addStudentToMarkRegister Error: ", "Student already present in this class");
                        });
                        yield queryRunner.manager
                            .getRepository(MarkRegister_1.MarkRegister)
                            .createQueryBuilder()
                            .relation(MarkRegister_1.MarkRegister, "exam_class_sub")
                            .of(entity)
                            .add(oExam);
                        yield this.upsertMarkRegSummary(queryRunner.manager, examName, classId, studentId, currentUser);
                    })).catch(error => {
                        throw new exceptions_1.InternalServerError("addStudentToMarkRegister Error: ", "Student already present in this class");
                    });
                }
                else {
                    throw new exceptions_1.InternalServerError("Message: ", "Student already present in this class");
                }
                yield queryRunner.commitTransaction();
                return true;
            }
            catch (error) {
                yield queryRunner.rollbackTransaction();
                throw new exceptions_1.InternalServerError("addStudentToMarkRegister Error: ", error);
            }
            finally {
                yield queryRunner.release();
            }
        });
    }
    getMarkEntry(examName, classId, subjectId, acadyear) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const q_reg = yield typeorm_1.getManager()
                    .getRepository(MarkRegister_1.MarkRegister)
                    .createQueryBuilder("marks")
                    .select([
                    "marks.id AS id",
                    "exams.name AS examName",
                    "class.id AS classId",
                    "class.name AS className",
                    "class.section AS classSection",
                    "subjects.id AS subjectId",
                    "subjects.name AS subjectName",
                    "students.id AS studentId",
                    "students.firstname AS firstName",
                    "students.lastname AS lastName",
                    "exams.max_marks AS maxMarks",
                    "marks.marks_obtained AS marksObtained",
                    "marks.percentage AS perc",
                    "marks.acad_year AS acad_year",
                    "marks.notes AS notes"
                ])
                    .leftJoinAndSelect("marks.exam_class_sub", "exams")
                    .leftJoinAndSelect("exams.class", "class")
                    .leftJoinAndSelect("exams.subjects", "subjects")
                    .leftJoinAndSelect("marks.students", "students")
                    .where("exams.name = :examName", { examName: examName })
                    .andWhere("class.id = :classId", { classId: classId })
                    .andWhere("subjects.id = :subjectId", { subjectId: subjectId })
                    .orderBy("students.firstname", "ASC")
                    .addOrderBy("students.gender", "DESC")
                    .getRawMany();
                return q_reg;
            }
            catch (error) {
                throw new exceptions_1.InternalServerError("getAllMarkRegister Unhandled Error: ", error);
            }
        });
    }
    editMarkRegister(id, marksObtained, maxMarks, examName, classId, studentId, currentUser) {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = typeorm_1.getConnection();
            const queryRunner = connection.createQueryRunner();
            try {
                yield queryRunner.connect();
                yield queryRunner.startTransaction();
                const perc = (marksObtained / maxMarks) * 100;
                const getGrade = yield queryRunner.manager
                    .createQueryBuilder()
                    .select(["grd.id", "grd.min", "grd.max"])
                    .from(subQry => {
                    const qb = subQry
                        .select([
                        "g.id AS id", "g.min as min", "g.max as max",
                    ])
                        .from(Grades_1.ExamGrades, "g")
                        .orderBy("g.min", "ASC");
                    return qb;
                }, "grd")
                    .where("grd.min <= :markValue AND grd.max >= :markValue", { markValue: perc })
                    .getRawOne();
                const gradeId = (getGrade && getGrade.id) ? getGrade.id : undefined;
                yield queryRunner.manager
                    .createQueryBuilder()
                    .update(MarkRegister_1.MarkRegister)
                    .set({
                    marks_obtained: Number(marksObtained),
                    percentage: Number(perc),
                    grade: gradeId,
                    updatedby: currentUser
                })
                    .where("id = :id", {
                    id: id
                })
                    .execute()
                    .then((r) => __awaiter(this, void 0, void 0, function* () {
                    yield this.upsertMarkRegSummary(queryRunner.manager, examName, classId, studentId, currentUser);
                    yield queryRunner.commitTransaction();
                    return { Messages: "Updated successfully" };
                }))
                    .catch(() => __awaiter(this, void 0, void 0, function* () {
                    yield queryRunner.rollbackTransaction();
                    return { Messages: "Unable to save" };
                }));
                return { Messages: "Updated successfully" };
            }
            catch (error) {
                console.log("error=", error);
                yield queryRunner.rollbackTransaction();
                throw new exceptions_1.InternalServerError("editMarkRegister Unhandled Error: ", error);
            }
            finally {
                yield queryRunner.release();
            }
        });
    }
    upsertMarkRegSummary(queryRunner, examName, classId, studentId, currentUser) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let response = undefined;
                const getTotals = yield queryRunner
                    .getRepository(MarkRegister_1.MarkRegister)
                    .createQueryBuilder("marks")
                    .select([
                    "students.id AS studentId",
                    "SUM(marks.marks_obtained) AS total_marks_obtained",
                    "SUM(exams.max_marks) AS total_max_marks"
                ])
                    .leftJoin("marks.exam_class_sub", "exams")
                    .leftJoin("exams.class", "class")
                    .leftJoin("exams.subjects", "subjects")
                    .leftJoin("marks.students", "students")
                    .where("exams.name = :examName", { examName: examName })
                    .andWhere("class.id = :classId", { classId: classId })
                    .andWhere("students.id = :studentId", { studentId: studentId })
                    .orderBy("students.firstname", "ASC")
                    .groupBy("students.id")
                    .getRawOne();
                const oSummary = yield queryRunner
                    .getRepository(MarkRegisterSum_1.MarkRegisterSummary)
                    .createQueryBuilder("s")
                    .where("s.exam_name = :examName", { examName: examName })
                    .andWhere("s.class_id = :classId", { classId: classId })
                    .andWhere("s.student_id = :studentId", { studentId: studentId })
                    .getOne();
                const total_marks_obtained = getTotals.total_marks_obtained;
                const total_max_marks = getTotals.total_max_marks;
                const total_perc = (total_marks_obtained / total_max_marks) * 100;
                const totalGradeObj = yield this.findGrade(total_perc);
                const total_grade = totalGradeObj.gradeName;
                const total_grade_color = totalGradeObj.gradeColor;
                const entity = new MarkRegisterSum_1.MarkRegisterSummary();
                entity.exam_name = examName;
                entity.class_id = classId;
                entity.student_id = studentId;
                entity.total_marks_obtained = total_marks_obtained;
                entity.total_max_marks = total_max_marks;
                entity.total_grade = total_grade;
                entity.total_percentage = total_perc;
                entity.total_grade_color = total_grade_color;
                if (oSummary && oSummary.id) {
                    const reg_summary_id = oSummary.id;
                    entity.updatedby = currentUser;
                    response = yield queryRunner
                        .getRepository(MarkRegisterSum_1.MarkRegisterSummary)
                        .update(reg_summary_id, entity)
                        .catch(e => {
                    });
                }
                else {
                    entity.createdby = currentUser;
                    response = yield queryRunner
                        .getRepository(MarkRegisterSum_1.MarkRegisterSummary)
                        .save(entity);
                }
                return response;
            }
            catch (error) {
                throw new exceptions_1.InternalServerError("upsertMarkRegSummary Error: ", error);
            }
        });
    }
    AddManyToMarkRegSummary(queryRunner, examName, classId, currentUser) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let response = undefined;
                const oSummary = yield queryRunner
                    .getRepository(MarkRegisterSum_1.MarkRegisterSummary)
                    .createQueryBuilder("s")
                    .where("s.exam_name = :examName", { examName: examName })
                    .andWhere("s.class_id = :classId", { classId: classId })
                    .getCount();
                if (oSummary === 0) {
                    const oStudendID = yield typeorm_1.getManager()
                        .getRepository(ClassSections_1.ClassSections)
                        .createQueryBuilder("c")
                        .select([
                        "st.id AS studentId"
                    ])
                        .leftJoin("c.students", "st")
                        .where("c.id = :classId", { classId: classId })
                        .andWhere("st.isactive = true")
                        .orderBy("st.firstname", "ASC")
                        .addOrderBy("st.gender", "DESC")
                        .getRawMany();
                    for (let i = 0; i <= oStudendID.length - 1; i++) {
                        const entity = new MarkRegisterSum_1.MarkRegisterSummary();
                        entity.exam_name = examName;
                        entity.class_id = classId;
                        entity.student_id = oStudendID[i].studentId;
                        entity.total_marks_obtained = 0;
                        entity.total_max_marks = 0;
                        entity.total_grade = "";
                        entity.total_percentage = 0;
                        entity.total_grade_color = "";
                        entity.createdby = currentUser;
                        response = yield queryRunner
                            .getRepository(MarkRegisterSum_1.MarkRegisterSummary)
                            .save(entity);
                    }
                }
                return response;
            }
            catch (error) {
                throw new exceptions_1.InternalServerError("AddMarkRegisterSummary Error: ", error);
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
    findPercentage(examId, marks) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let perc = 0;
                const res = yield typeorm_1.getManager()
                    .getRepository(Exam_1.Exams)
                    .createQueryBuilder("exams")
                    .where("exams = :id", { id: examId })
                    .getOne();
                if (res) {
                    const max_marks = Number(res.max_marks);
                    const t_marks = Number(marks);
                    perc = ((max_marks / t_marks) * 100);
                }
                return perc;
            }
            catch (error) {
                throw new exceptions_1.InternalServerError("FindGrade Unhandled Error: ", error);
            }
        });
    }
}
exports.MarkEntryService = MarkEntryService;
//# sourceMappingURL=ExamMarkEntrySvc.js.map