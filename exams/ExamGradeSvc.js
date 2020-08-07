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
const Grades_1 = require("../core/entities/Exams/Grades");
const exceptions_1 = require("../core/exceptions");
class ExamGradeService {
    constructor() { }
    addGrade(input, currentUser) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const entity = Object.assign(new Grades_1.ExamGrades(), input);
                entity.createdby = currentUser;
                const result = yield typeorm_1.getManager()
                    .getRepository(Grades_1.ExamGrades)
                    .save(entity);
                return result;
            }
            catch (error) {
                throw new exceptions_1.InternalServerError("addGrade Unhandled Error: Unable to save", error);
            }
        });
    }
    editGrade(id, input, currentUser) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const entity = Object.assign(new Grades_1.ExamGrades(), input);
                entity.createdby = currentUser;
                const result = yield typeorm_1.getManager()
                    .getRepository(Grades_1.ExamGrades)
                    .update(id, entity);
                return result;
            }
            catch (error) {
                throw new exceptions_1.InternalServerError("editGrade Unhandled Error: Unable to save", error);
            }
        });
    }
    delGrade(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const res = yield typeorm_1.getManager()
                    .createQueryBuilder()
                    .delete()
                    .from(Grades_1.ExamGrades)
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
    getGrade(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const res = yield typeorm_1.getManager()
                    .getRepository(Grades_1.ExamGrades)
                    .createQueryBuilder("g")
                    .leftJoinAndSelect("g.exam_class_sub", "exams")
                    .leftJoinAndSelect("exams.class", "class")
                    .leftJoinAndSelect("exams.subjects", "subjects")
                    .leftJoinAndSelect("g.acad_year", "acdyr")
                    .where("g.id = :id", { id: id })
                    .orderBy("g.name", "DESC")
                    .getOne();
                return res;
            }
            catch (error) {
                throw new exceptions_1.InternalServerError("getGrade Unhandled Error: ", error);
            }
        });
    }
    getAllGrade() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const res = yield typeorm_1.getManager()
                    .getRepository(Grades_1.ExamGrades)
                    .createQueryBuilder("g")
                    .orderBy("g.name", "ASC")
                    .getMany();
                return res;
            }
            catch (error) {
                throw new exceptions_1.InternalServerError("getAllGrade Unhandled Error: ", error);
            }
        });
    }
}
exports.ExamGradeService = ExamGradeService;
//# sourceMappingURL=ExamGradeSvc.js.map