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
const exceptions_1 = require("../core/exceptions");
class ExamMasterService {
    constructor() { }
    addExamMaster(input, currentUser) {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = typeorm_1.getConnection();
            const queryRunner = connection.createQueryRunner();
            try {
                yield queryRunner.connect();
                yield queryRunner.startTransaction();
                const entity = Object.assign(new Exam_1.Exams(), input);
                entity.createdby = currentUser;
                const result = yield queryRunner.manager
                    .getRepository(Exam_1.Exams)
                    .save(entity);
                yield queryRunner.commitTransaction();
                return result;
            }
            catch (error) {
                yield queryRunner.rollbackTransaction();
                throw new exceptions_1.InternalServerError("addExamMaster Unhandled Error: Unable to save", error);
            }
            finally {
                yield queryRunner.release();
            }
        });
    }
    editExamMaster(id, input, currentUser) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const entity = Object.assign(new Exam_1.Exams(), input);
                entity.updatedby = currentUser;
                const res = yield typeorm_1.getManager()
                    .getRepository(Exam_1.Exams)
                    .update(id, entity);
                return res;
            }
            catch (error) {
                throw new exceptions_1.InternalServerError("editExamMaster Unhandled Error: Unable to save", error);
            }
        });
    }
    delExamMaster(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const res = yield typeorm_1.getManager()
                    .createQueryBuilder()
                    .delete()
                    .from(Exam_1.Exams)
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
                throw new exceptions_1.InternalServerError("delExamMaster Unhandled Error: Unable to delete", error);
            }
        });
    }
    getAll(pageNo, pageSize, examName, classId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const currenPageNo = pageNo - 1;
                const res = typeorm_1.getManager()
                    .getRepository(Exam_1.Exams)
                    .createQueryBuilder("exam")
                    .select([
                    "exam.id AS id",
                    "exam.name AS examName",
                    "exam.min_marks AS minMarks",
                    "exam.max_marks AS maxMarks",
                    "exam.orderby AS orderby",
                    "exam.notes AS notes",
                    "exam.is_final_exam AS is_final_exam",
                    "exam.createdby AS createdby",
                    "exam.createdon AS createdon",
                    "exam.updatedby AS updatedby",
                    "exam.updatedon AS updatedon",
                    "class.id AS classId",
                    "class.name AS className",
                    "class.section AS classSection",
                    "subjects.id AS subjectId",
                    "subjects.name AS subjectName",
                    "subjects.subcode AS subjectSubcode",
                    "subjects.color AS subjectColor"
                ])
                    .leftJoin("exam.class", "class")
                    .leftJoin("exam.subjects", "subjects");
                if (classId && classId !== "ALL") {
                    res.where("class.id = :classId", { classId: classId });
                }
                if (examName && examName !== "ALL") {
                    res.andWhere("exam.name = :examName", { examName: examName });
                }
                res.orderBy("exam.orderby", "ASC")
                    .addOrderBy("class.name", "ASC");
                res.offset(currenPageNo * pageSize);
                res.limit(pageSize);
                const examMasterRes = {
                    rows: yield res.getRawMany(),
                    count: yield res.getCount()
                };
                return examMasterRes;
            }
            catch (error) {
                throw new exceptions_1.InternalServerError("Unhandled Error", error);
            }
        });
    }
    getOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const res = yield typeorm_1.getManager()
                    .getRepository(Exam_1.Exams)
                    .createQueryBuilder("exams")
                    .select([
                    "exam.id",
                    "exam.name",
                    "exam.min_marks",
                    "exam.max_marks",
                    "exam.orderby",
                    "exam.notes",
                    "exam.is_final_exam",
                    "exam.createdby",
                    "exam.createdon",
                    "exam.updatedby",
                    "exam.updatedon",
                    "class.id",
                    "class.name",
                    "class.section",
                    "subjects.id",
                    "subjects.name",
                    "subjects.subcode",
                    "subjects.color"
                ])
                    .leftJoin("exam.class", "class")
                    .leftJoin("exam.subjects", "subjects")
                    .where("exams.id = :examId", { examId: id })
                    .getRawOne();
                return res;
            }
            catch (error) {
                throw new exceptions_1.InternalServerError("Unhandled Error", error);
            }
        });
    }
}
exports.ExamMasterService = ExamMasterService;
//# sourceMappingURL=ExamMasterSvc.js.map