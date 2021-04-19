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
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = require("inversify");
const typeorm_1 = require("typeorm");
const ClassSections_1 = require("../../core/entities/Master/ClassSections");
const exceptions_1 = require("../../core/exceptions");
const ClassTeacher_1 = require("../../core/entities/Master/ClassTeacher");
let ClassService = class ClassService {
    constructor() { }
    addClassSec(classSec, subjectIds, currentUser) {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = typeorm_1.getConnection();
            const queryRunner = connection.createQueryRunner();
            try {
                yield queryRunner.connect();
                yield queryRunner.startTransaction();
                const classSecEntity = Object.assign(new ClassSections_1.ClassSections(), classSec);
                classSecEntity.createdby = currentUser;
                const classSaved = yield queryRunner.manager
                    .getRepository(ClassSections_1.ClassSections)
                    .save(classSecEntity);
                const classSubj = {
                    classId: classSaved.id,
                    subjectId: subjectIds
                };
                const res = yield this.addSubjectToClass(classSubj, queryRunner.manager);
                yield queryRunner.commitTransaction();
                if (res) {
                    return { Messages: "Class & Subject added successfully" };
                }
                else {
                    return { Messages: "No Records updated" };
                }
            }
            catch (error) {
                yield queryRunner.rollbackTransaction();
                throw new exceptions_1.InternalServerError("Unhandled Error", error);
            }
            finally {
                yield queryRunner.release();
            }
        });
    }
    editClassSec(id, classSec, subjectIds, currentUser) {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = typeorm_1.getConnection();
            const queryRunner = connection.createQueryRunner();
            try {
                yield queryRunner.connect();
                yield queryRunner.startTransaction();
                const classSecEntity = Object.assign(new ClassSections_1.ClassSections(), classSec);
                classSecEntity.updatedby = currentUser;
                yield queryRunner.manager
                    .getRepository(ClassSections_1.ClassSections)
                    .update(id, classSecEntity);
                const classSubj = {
                    classId: id,
                    subjectId: subjectIds
                };
                const res = yield this.editSubjectToClass(classSubj, queryRunner.manager);
                yield queryRunner.commitTransaction();
                if (res) {
                    return { Messages: "Class & Subject updated successfully" };
                }
                else {
                    return { Messages: "No Records updated" };
                }
            }
            catch (error) {
                yield queryRunner.rollbackTransaction();
                throw new exceptions_1.InternalServerError("Unhandled Error", error);
            }
            finally {
                yield queryRunner.release();
            }
        });
    }
    delClassSec(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const res = yield typeorm_1.getManager()
                    .createQueryBuilder()
                    .delete()
                    .from(ClassSections_1.ClassSections)
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
                throw new exceptions_1.InternalServerError("Unhandled Error", error);
            }
        });
    }
    getAllClass() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const classSecs = yield typeorm_1.getManager()
                    .getRepository(ClassSections_1.ClassSections)
                    .createQueryBuilder("classSec")
                    .leftJoinAndSelect("classSec.classteachersub", "ct")
                    .leftJoinAndSelect("ct.subject", "subjects")
                    .leftJoinAndSelect("ct.staff", "staff")
                    .leftJoinAndSelect("classSec.classteacher", "classteacher")
                    .leftJoinAndSelect("classSec.asstclassteacher", "asstclassteacher")
                    .leftJoinAndSelect("classSec.edusystem", "edusystem")
                    .leftJoinAndSelect("classSec.academicyear", "academicyear")
                    .orderBy({
                    "classSec.orderby": "ASC",
                    "classSec.name": "ASC",
                    "classSec.section": "ASC",
                })
                    .getMany();
                return classSecs;
            }
            catch (error) {
                throw new exceptions_1.InternalServerError("Unhandled Error", error);
            }
        });
    }
    findClassSecById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const classSecs = yield typeorm_1.getManager()
                    .getRepository(ClassSections_1.ClassSections)
                    .createQueryBuilder("classSec")
                    .leftJoinAndSelect("classSec.subjects", "subjects")
                    .where("classSec.id = :classId", { classId: id })
                    .getOne();
                return classSecs;
            }
            catch (error) {
                throw new exceptions_1.InternalServerError("Unhandled Error", error);
            }
        });
    }
    editSubjectToClass(classSubj, queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const classId = classSubj.classId;
                const subjId = classSubj.subjectId;
                if (classId.length === 0 || !subjId.length || !subjId[0].length) {
                    throw new exceptions_1.BadRequest("Please select Class and Subject");
                }
                try {
                    yield typeorm_1.getManager()
                        .createQueryBuilder()
                        .delete()
                        .from(ClassTeacher_1.ClassTeacher)
                        .where("classes = :id", { id: classId })
                        .execute();
                }
                catch (error) {
                    throw new exceptions_1.InternalServerError("Class Subject Delete Error:", error);
                }
                const clsSubjects = [];
                for (let i = 0; i <= subjId.length - 1; i++) {
                    const sub = new ClassTeacher_1.ClassTeacher();
                    sub.classes = classId;
                    sub.subject = subjId[i];
                    sub.staff = undefined;
                    clsSubjects.push(sub);
                }
                const result = yield queryRunner
                    .getRepository(ClassTeacher_1.ClassTeacher)
                    .save(clsSubjects);
                return result;
            }
            catch (error) {
                throw new exceptions_1.InternalServerError("Class Subject Assigning Error:", error);
            }
        });
    }
    addSubjectToClass(classSubj, queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const classId = classSubj.classId;
                const subjId = classSubj.subjectId;
                if (classId.length === 0 || !subjId.length || !subjId[0].length) {
                    throw new exceptions_1.BadRequest("Please select Class and Subject");
                }
                const clsSubjects = [];
                for (let i = 0; i <= subjId.length - 1; i++) {
                    const sub = new ClassTeacher_1.ClassTeacher();
                    sub.classes = classId;
                    sub.subject = subjId[i];
                    sub.staff = undefined;
                    clsSubjects.push(sub);
                }
                const result = yield queryRunner
                    .getRepository(ClassTeacher_1.ClassTeacher)
                    .save(clsSubjects);
                return result;
            }
            catch (error) {
                throw error;
            }
        });
    }
    setupClassSubjRemove(classSubj) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const classId = classSubj.classId;
                const subjId = classSubj.subjectId;
                if (classId.length === 0 || !subjId.length || !subjId[0].length) {
                    throw new exceptions_1.BadRequest("Please select Class and Subject");
                }
                const res = yield typeorm_1.getManager()
                    .getRepository(ClassSections_1.ClassSections)
                    .createQueryBuilder()
                    .relation(ClassSections_1.ClassSections, "subjects")
                    .of(classId)
                    .remove(subjId)
                    .then(res => {
                    return { Messages: "Subjects are removed from the Class" };
                })
                    .catch(err => {
                    throw new exceptions_1.BadMapping("Class and Subject Mapping not match. Please select Class and Subject");
                });
                return res;
            }
            catch (error) {
                throw error;
            }
        });
    }
    addStaffToClass(id, input, currentUser) {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = typeorm_1.getConnection();
            const queryRunner = connection.createQueryRunner();
            try {
                yield queryRunner.connect();
                yield queryRunner.startTransaction();
                let res_main;
                if (input.classteacher || input.asstclassteacher) {
                    res_main = yield queryRunner.manager
                        .createQueryBuilder()
                        .update(ClassSections_1.ClassSections)
                        .set({
                        classteacher: input.classteacher,
                        asstclassteacher: input.asstclassteacher,
                        updatedby: currentUser
                    })
                        .where("id = :id", {
                        id: id
                    })
                        .execute();
                }
                const res = yield this.assignStaffToClass(id, input, queryRunner.manager);
                yield queryRunner.commitTransaction();
                if (res) {
                    return { Messages: "Subjects are assigned to the Class" };
                }
                else {
                    return { Messages: "Error: Staff has not assigned to the selected Class" };
                }
            }
            catch (error) {
                yield queryRunner.rollbackTransaction();
                throw new exceptions_1.InternalServerError("addStaffToClass - Unhandled Error", error);
            }
            finally {
                yield queryRunner.release();
            }
        });
    }
    assignStaffToClass(classId, clsStaff, queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const subj_staff = clsStaff.subj_staff;
                let result;
                if (classId.length === 0) {
                    throw new exceptions_1.BadRequest("Please select Class");
                }
                for (let i = 0; i <= subj_staff.length - 1; i++) {
                    result = yield queryRunner
                        .createQueryBuilder()
                        .update(ClassTeacher_1.ClassTeacher)
                        .set({ staff: subj_staff[i].staffId })
                        .where("classes = :id", {
                        id: classId
                    })
                        .andWhere("subject = :subId", {
                        subId: subj_staff[i].subjectId
                    })
                        .execute();
                }
                return result;
            }
            catch (error) {
                throw error;
            }
        });
    }
};
ClassService = __decorate([
    inversify_1.injectable(),
    __metadata("design:paramtypes", [])
], ClassService);
exports.ClassService = ClassService;
//# sourceMappingURL=ClassService.js.map