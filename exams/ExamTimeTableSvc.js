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
const exceptions_1 = require("../core/exceptions");
const ExamTimeTable_1 = require("../core/entities/Exams/ExamTimeTable");
class ExamTimeTableService {
    constructor() { }
    addExamTimeTable(input, currentUser) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const entity = Object.assign(new ExamTimeTable_1.ExamTimeTable(), input);
                entity.createdby = currentUser;
                const result = yield typeorm_1.getManager()
                    .getRepository(ExamTimeTable_1.ExamTimeTable)
                    .save(entity);
                return result;
            }
            catch (error) {
                throw new exceptions_1.InternalServerError("addExamTimeTable Unhandled Error: Unable to save", error);
            }
        });
    }
    editExamTimeTable(id, input, currentUser) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const entity = Object.assign(new ExamTimeTable_1.ExamTimeTable(), input);
                entity.createdby = currentUser;
                const result = yield typeorm_1.getManager()
                    .getRepository(ExamTimeTable_1.ExamTimeTable)
                    .update(id, entity);
                return result;
            }
            catch (error) {
                throw new exceptions_1.InternalServerError("editExamTimeTable Unhandled Error: Unable to save", error);
            }
        });
    }
    delExamTimeTable(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const res = yield typeorm_1.getManager()
                    .createQueryBuilder()
                    .delete()
                    .from(ExamTimeTable_1.ExamTimeTable)
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
    getExamTimeTable(classId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const res = yield typeorm_1.getManager()
                    .getRepository(ExamTimeTable_1.ExamTimeTable)
                    .createQueryBuilder("tt")
                    .leftJoinAndSelect("tt.exam_class_sub", "exams")
                    .leftJoinAndSelect("exams.class", "class")
                    .leftJoinAndSelect("exams.subjects", "subjects")
                    .where("g.id = :id", { id: classId })
                    .orderBy("g.examdate", "ASC")
                    .getOne();
                return res;
            }
            catch (error) {
                throw new exceptions_1.InternalServerError("getMarkRegister Unhandled Error: ", error);
            }
        });
    }
    getAllClassExamTimeTable() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const res = yield typeorm_1.getManager()
                    .getRepository(ExamTimeTable_1.ExamTimeTable)
                    .createQueryBuilder("g")
                    .leftJoinAndSelect("g.exam_class_sub", "exams")
                    .leftJoinAndSelect("exams.class", "class")
                    .leftJoinAndSelect("exams.subjects", "subjects")
                    .orderBy("g.examdate", "ASC")
                    .getMany();
                return res;
            }
            catch (error) {
                throw new exceptions_1.InternalServerError("getAllMarkRegister Unhandled Error: ", error);
            }
        });
    }
}
exports.ExamTimeTableService = ExamTimeTableService;
//# sourceMappingURL=ExamTimeTableSvc.js.map