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
const Subject_1 = require("../../core/entities/Master/Subject");
const exceptions_1 = require("../../core/exceptions");
const ClassSections_1 = require("../../core/entities/Master/ClassSections");
let SubjectService = class SubjectService {
    constructor() { }
    addSubject(subject, currentUser) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const subjectEntity = Object.assign(new Subject_1.Subject(), subject);
                subjectEntity.createdby = currentUser;
                const res = yield typeorm_1.getRepository(Subject_1.Subject).save(subjectEntity);
                return res;
            }
            catch (error) {
                throw new exceptions_1.InternalServerError("Unhandled Error", error);
            }
        });
    }
    editSubject(id, subject, currentUser) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const subjectEntity = Object.assign(new Subject_1.Subject(), subject);
                subjectEntity.updatedby = currentUser;
                const res = yield typeorm_1.getManager()
                    .getRepository(Subject_1.Subject)
                    .update(id, subjectEntity);
                const getSubj = yield this.findSubjectById(id);
                return getSubj;
            }
            catch (error) {
                throw new exceptions_1.InternalServerError("Unhandled Error", error);
            }
        });
    }
    delSubject(id, currentUser) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const res = yield typeorm_1.getManager()
                    .createQueryBuilder()
                    .delete()
                    .from(Subject_1.Subject)
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
    listSubject() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const res = yield typeorm_1.getManager()
                    .getRepository(Subject_1.Subject)
                    .createQueryBuilder("subject")
                    .orderBy("subject.name", "ASC")
                    .getMany();
                return res;
            }
            catch (error) {
                throw new exceptions_1.InternalServerError("Unhandled Error", error);
            }
        });
    }
    listSubjectByClass(classId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const res = yield typeorm_1.getManager()
                    .getRepository(ClassSections_1.ClassSections)
                    .createQueryBuilder("cls")
                    .where("cls.id = :clsId", { clsId: classId })
                    .orderBy("subject.name", "ASC")
                    .getMany();
                return res;
            }
            catch (error) {
                throw new exceptions_1.InternalServerError("Unhandled Error", error);
            }
        });
    }
    findSubjectById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const subjects = yield typeorm_1.getManager()
                    .getRepository(Subject_1.Subject)
                    .findOne({ where: { id: id } });
                return subjects;
            }
            catch (error) {
                throw new exceptions_1.InternalServerError("Unhandled Error", error);
            }
        });
    }
    findSubjects(name, code) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const subjects = yield typeorm_1.getManager()
                    .getRepository(Subject_1.Subject)
                    .createQueryBuilder("subj")
                    .where("subj.code = :code OR subj.name = :name", {
                    code: code,
                    name: name
                })
                    .getMany();
                return subjects;
            }
            catch (error) {
                throw new exceptions_1.InternalServerError("Unhandled Error", error);
            }
        });
    }
};
SubjectService = __decorate([
    inversify_1.injectable(),
    __metadata("design:paramtypes", [])
], SubjectService);
exports.SubjectService = SubjectService;
//# sourceMappingURL=SubjectService.js.map