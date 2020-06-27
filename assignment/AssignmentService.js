"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
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
const inversify_1 = require("inversify");
const typeorm_1 = require("typeorm");
const lodash_1 = __importDefault(require("lodash"));
const moment_1 = __importDefault(require("moment"));
const exceptions_1 = require("../core/exceptions");
const ClassSections_1 = require("../core/entities/Master/ClassSections");
const Assignments_1 = require("../core/entities/Assignments/Assignments");
const Subject_1 = require("../core/entities/Master/Subject");
let AssignmentService = class AssignmentService {
    constructor() { }
    getAssignment(classId, dueDate, mode) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const qb = typeorm_1.getManager()
                    .getRepository(Assignments_1.Assignment)
                    .createQueryBuilder("asg")
                    .leftJoinAndSelect("asg.classsec", "cls")
                    .leftJoinAndSelect("asg.subject", "sub")
                    .leftJoinAndSelect("asg.documents", "docs");
                if (classId) {
                    qb.where("cls.id = :id", { id: classId });
                }
                if (mode === "LIST") {
                    const toDate = moment_1.default(new Date()).format("YYYY-MM-DD");
                    const fromDate = moment_1.default(new Date()).subtract(7, "days").format("YYYY-MM-DD");
                    qb.andWhere("DATE_FORMAT(asg.dueDate, '%Y-%m-%d') BETWEEN :fromDate AND :toDate", {
                        fromDate: fromDate,
                        toDate: toDate
                    });
                }
                if (mode === "CAL" && dueDate) {
                    const dueDateString = dueDate;
                    qb.andWhere("DATE_FORMAT(asg.dueDate, '%Y-%m-%d') = :dueDate", {
                        dueDate: dueDateString
                    });
                }
                const result = yield qb.getMany();
                const response = yield lodash_1.default(result)
                    .groupBy(grp => moment_1.default(grp.duedate).format("YYYY-MM-DD"))
                    .map((value, key) => ({
                    duedate: key, data: value
                }))
                    .orderBy(ord => moment_1.default(ord.duedate).format("YYYY-MM-DD"), ["desc"])
                    .value();
                return response;
            }
            catch (error) {
                throw new exceptions_1.NotFound(`getAssignment Error: Please change the search criteria`);
            }
        });
    }
    getSubjectsByClass(classId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const res = yield typeorm_1.getManager()
                    .getRepository(ClassSections_1.ClassSections)
                    .createQueryBuilder("cls")
                    .select(["s.id as id, s.name as name, s.color as color, s.subcode as subcode"])
                    .leftJoin("cls.classteachersub", "ct")
                    .leftJoin("ct.subject", "s")
                    .where("cls.id = :id", { id: classId })
                    .getRawMany();
                return res;
            }
            catch (error) {
                throw new exceptions_1.NotFound(`getSubjectsByClass Error: Please change the search criteria`);
            }
        });
    }
    addAssignment(input, currentUser) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const entity = new Assignments_1.Assignment();
                entity.duedate = input.duedate;
                entity.taskname = input.taskname;
                entity.notes = input.notes;
                entity.priority = input.priority;
                entity.tag = input.tag;
                entity.createdby = currentUser;
                const cls = new ClassSections_1.ClassSections();
                cls.id = input.classsec;
                const clsArr = [];
                clsArr.push(cls);
                entity.classsec = clsArr;
                const sub = new Subject_1.Subject();
                sub.id = input.subject;
                const subArr = [];
                subArr.push(sub);
                entity.subject = subArr;
                const res = yield typeorm_1.getManager()
                    .getRepository(Assignments_1.Assignment).save(entity);
                return res;
            }
            catch (error) {
                throw new exceptions_1.InternalServerError("addAssignment", error);
            }
        });
    }
    editAssignment(id, input, currentUser) {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = typeorm_1.getConnection();
            const queryRunner = connection.createQueryRunner();
            try {
                yield queryRunner.connect();
                yield queryRunner.startTransaction();
                const entity = new Assignments_1.Assignment();
                entity.id = id;
                entity.duedate = input.duedate;
                entity.taskname = input.taskname;
                entity.notes = input.notes;
                entity.priority = input.priority;
                entity.tag = input.tag;
                entity.createdby = currentUser;
                const cls = yield queryRunner.manager
                    .createQueryBuilder()
                    .relation(Assignments_1.Assignment, "classsec")
                    .of({ id: id })
                    .loadMany();
                const remCls = yield queryRunner.manager
                    .createQueryBuilder()
                    .relation(Assignments_1.Assignment, "classsec")
                    .of({ id: id })
                    .addAndRemove(input.classsec, cls);
                const subj = yield queryRunner.manager
                    .createQueryBuilder()
                    .relation(Assignments_1.Assignment, "subject")
                    .of({ id: id })
                    .loadMany();
                const remSub = yield queryRunner.manager
                    .createQueryBuilder()
                    .relation(Assignments_1.Assignment, "subject")
                    .of({ id: id })
                    .addAndRemove(input.subject, subj);
                const res = yield queryRunner.manager
                    .getRepository(Assignments_1.Assignment)
                    .update(id, entity);
                yield queryRunner.commitTransaction();
                return entity;
            }
            catch (error) {
                yield queryRunner.rollbackTransaction();
                throw new exceptions_1.InternalServerError("editAssignment", error);
            }
            finally {
                yield queryRunner.release();
            }
        });
    }
    delAssignment(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield typeorm_1.getManager()
                    .createQueryBuilder()
                    .delete()
                    .from(Assignments_1.Assignment)
                    .where("id = :id", { id: id })
                    .execute();
            }
            catch (error) {
                throw new exceptions_1.InternalServerError("Class Subject Delete Error:", error);
            }
        });
    }
};
AssignmentService = __decorate([
    inversify_1.injectable(),
    __metadata("design:paramtypes", [])
], AssignmentService);
exports.AssignmentService = AssignmentService;
//# sourceMappingURL=AssignmentService.js.map