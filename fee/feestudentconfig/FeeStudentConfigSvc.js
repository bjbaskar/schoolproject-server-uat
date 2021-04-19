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
const FeeStudentConfig_1 = require("../../core/entities/Fee/FeeStudentConfig");
const exceptions_1 = require("../../core/exceptions");
let FeeStudentConfigService = class FeeStudentConfigService {
    constructor() { }
    addFeeStudent(feeStud, currentUser) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const entity = Object.assign(new FeeStudentConfig_1.FeeStudentConfig(), feeStud);
                entity.createdby = currentUser;
                const res = yield typeorm_1.getManager()
                    .getRepository(FeeStudentConfig_1.FeeStudentConfig)
                    .save(entity);
                return res;
            }
            catch (error) {
                throw new exceptions_1.InternalServerError("Unhandled Error", error);
            }
        });
    }
    editFeeStudent(id, feeStud, currentUser) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const entity = Object.assign(new FeeStudentConfig_1.FeeStudentConfig(), feeStud);
                entity.updatedby = currentUser;
                const res = yield typeorm_1.getManager()
                    .getRepository(FeeStudentConfig_1.FeeStudentConfig)
                    .update(id, entity);
                return res;
            }
            catch (error) {
                throw new exceptions_1.InternalServerError("Unhandled Error", error);
            }
        });
    }
    delFeeStudent(id, currentUser) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const res = yield typeorm_1.getManager()
                    .createQueryBuilder()
                    .delete()
                    .from(FeeStudentConfig_1.FeeStudentConfig)
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
    listFeeStudent() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const res = yield typeorm_1.getManager()
                    .getRepository(FeeStudentConfig_1.FeeStudentConfig)
                    .createQueryBuilder("fsc")
                    .orderBy("fsc.class_sec", "ASC")
                    .getMany();
                return res;
            }
            catch (error) {
                throw new exceptions_1.InternalServerError("Unhandled Error", error);
            }
        });
    }
    findFeeStudentById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const res = yield typeorm_1.getManager()
                    .getRepository(FeeStudentConfig_1.FeeStudentConfig)
                    .findOne({ where: { id: id } });
                return res;
            }
            catch (error) {
                throw new exceptions_1.InternalServerError("Unhandled Error", error);
            }
        });
    }
};
FeeStudentConfigService = __decorate([
    inversify_1.injectable(),
    __metadata("design:paramtypes", [])
], FeeStudentConfigService);
exports.FeeStudentConfigService = FeeStudentConfigService;
//# sourceMappingURL=FeeStudentConfigSvc.js.map