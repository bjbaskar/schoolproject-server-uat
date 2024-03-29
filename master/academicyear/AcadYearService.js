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
const AcadYear_1 = require("../../core/entities/Master/AcadYear");
const exceptions_1 = require("../../core/exceptions");
let AcadYearService = class AcadYearService {
    constructor() { }
    addAcadYear(acadYr, currentUser) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const acadYrEntity = Object.assign(new AcadYear_1.AcadYear(), acadYr);
                acadYrEntity.createdby = currentUser;
                const res = yield typeorm_1.getManager().getRepository(AcadYear_1.AcadYear).save(acadYrEntity);
                return res;
            }
            catch (error) {
                throw new exceptions_1.InternalServerError("Unhandled Error", error);
            }
        });
    }
    editAcadYear(id, acadYr, currentUser) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const acadYrEntity = Object.assign(new AcadYear_1.AcadYear(), acadYr);
                acadYrEntity.updatedby = currentUser;
                const res = yield typeorm_1.getManager()
                    .getRepository(AcadYear_1.AcadYear)
                    .update(id, acadYrEntity);
                return res;
            }
            catch (error) {
                throw new exceptions_1.InternalServerError("Unhandled Error", error);
            }
        });
    }
    delAcadYear(id, currentUser) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const res = yield typeorm_1.getManager()
                    .createQueryBuilder()
                    .delete()
                    .from(AcadYear_1.AcadYear)
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
    listAcadYear() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const res = yield typeorm_1.getManager()
                    .getRepository(AcadYear_1.AcadYear)
                    .createQueryBuilder("acdyear")
                    .getMany();
                return res;
            }
            catch (error) {
                throw new exceptions_1.InternalServerError("Unhandled Error", error);
            }
        });
    }
    getNextAcadYear() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const res = yield typeorm_1.getManager()
                    .getRepository(AcadYear_1.AcadYear)
                    .createQueryBuilder("a")
                    .where("a.is_current = true")
                    .orWhere("a.is_next = true")
                    .getMany();
                return res;
            }
            catch (error) {
                throw new exceptions_1.InternalServerError("Unhandled Error", error);
            }
        });
    }
    getAcadYearByCurrent() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const res = yield typeorm_1.getManager()
                    .getRepository(AcadYear_1.AcadYear)
                    .createQueryBuilder("a")
                    .where("a.is_current = true")
                    .getOne();
                return res;
            }
            catch (error) {
                throw new exceptions_1.InternalServerError("Unhandled Error", error);
            }
        });
    }
    findAcadYearById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const res = yield typeorm_1.getManager()
                    .getRepository(AcadYear_1.AcadYear)
                    .findOne({ where: { id: id } });
                return res;
            }
            catch (error) {
                throw new exceptions_1.InternalServerError("Unhandled Error", error);
            }
        });
    }
};
AcadYearService = __decorate([
    inversify_1.injectable(),
    __metadata("design:paramtypes", [])
], AcadYearService);
exports.AcadYearService = AcadYearService;
//# sourceMappingURL=AcadYearService.js.map