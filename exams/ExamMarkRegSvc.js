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
class MarkRegisterService {
    constructor() { }
    addMarkReg(input, currentUser) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const entity = Object.assign(new MarkRegister_1.MarkRegister(), input);
                entity.createdby = currentUser;
                const grade_obtained = yield this.findGrade(entity.exam_class_sub, entity.marks_obtained);
                entity.grade = grade_obtained;
                const perc = yield this.findPercentage(entity.exam_class_sub, entity.marks_obtained);
                entity.percentage = perc;
                const result = yield typeorm_1.getManager()
                    .getRepository(MarkRegister_1.MarkRegister)
                    .save(entity);
                return result;
            }
            catch (error) {
                throw new exceptions_1.InternalServerError("addMarkReg Unhandled Error: Unable to save", error);
            }
        });
    }
    editMarkReg(id, input, currentUser) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const entity = Object.assign(new MarkRegister_1.MarkRegister(), input);
                entity.createdby = currentUser;
                const grade_obtained = yield this.findGrade(entity.exam_class_sub, entity.marks_obtained);
                entity.grade = grade_obtained;
                const perc = yield this.findPercentage(entity.exam_class_sub, entity.marks_obtained);
                entity.percentage = perc;
                const result = yield typeorm_1.getManager()
                    .getRepository(MarkRegister_1.MarkRegister)
                    .update(id, entity);
                return result;
            }
            catch (error) {
                throw new exceptions_1.InternalServerError("editMarkReg Unhandled Error: Unable to save", error);
            }
        });
    }
    delMarkReg(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const res = yield typeorm_1.getManager()
                    .createQueryBuilder()
                    .delete()
                    .from(MarkRegister_1.MarkRegister)
                    .where("id = :id", { id: id })
                    .execute();
                if (res.affected >= 1) {
                    return { Messages: "Deleted successfully" };
                }
                else {
                    return { Messages: "No Records Deleted" };
                }
            }
            catch (error) {
                throw new exceptions_1.InternalServerError("delMarkReg Unhandled Error: Unable to delete", error);
            }
        });
    }
    getMarkRegister(studentId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const res = yield typeorm_1.getManager()
                    .getRepository(MarkRegister_1.MarkRegister)
                    .createQueryBuilder("marks")
                    .leftJoinAndSelect("marks.exam_class_sub", "exams")
                    .leftJoinAndSelect("exams.class", "class")
                    .leftJoinAndSelect("exams.subjects", "subjects")
                    .leftJoinAndSelect("marks.students", "students")
                    .leftJoinAndSelect("marks.grade", "grade")
                    .leftJoinAndSelect("marks.acad_year", "acdyr")
                    .where("students.id = :id", { id: studentId })
                    .orderBy("students.gender", "DESC")
                    .addOrderBy("students.firstname", "ASC")
                    .getMany();
                return res;
            }
            catch (error) {
                throw new exceptions_1.InternalServerError("getMarkRegister Unhandled Error: ", error);
            }
        });
    }
    getAllMarkRegister(classId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const res = yield typeorm_1.getManager()
                    .getRepository(MarkRegister_1.MarkRegister)
                    .createQueryBuilder("marks")
                    .leftJoinAndSelect("marks.exam_class_sub", "exams")
                    .leftJoinAndSelect("exams.class", "class")
                    .leftJoinAndSelect("exams.subjects", "subjects")
                    .leftJoinAndSelect("marks.students", "students")
                    .leftJoinAndSelect("marks.grade", "grade")
                    .leftJoinAndSelect("marks.acad_year", "acdyr")
                    .where("class.id = :id", { id: classId })
                    .orderBy("students.gender", "DESC")
                    .addOrderBy("students.firstname", "ASC")
                    .getMany();
                return res;
            }
            catch (error) {
                throw new exceptions_1.InternalServerError("getAllMarkRegister Unhandled Error: ", error);
            }
        });
    }
    findGrade(examId, marks) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const moreThan = (date) => typeorm_1.MoreThanOrEqual(Number(marks));
                const lessThan = (date) => typeorm_1.LessThanOrEqual(Number(marks));
                const res = yield typeorm_1.getManager()
                    .getRepository(Grades_1.ExamGrades)
                    .createQueryBuilder("g")
                    .leftJoin("g.exam_class_sub", "exam")
                    .where("g.min = :moreThan AND g.max = :lessThan", {
                    moreThan: moreThan,
                    lessThan: lessThan
                })
                    .getOne();
                const result = res ? res.id : undefined;
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
exports.MarkRegisterService = MarkRegisterService;
//# sourceMappingURL=ExamMarkRegSvc.js.map