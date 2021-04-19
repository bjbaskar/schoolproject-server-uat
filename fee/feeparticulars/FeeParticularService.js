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
const FeeParticulars_1 = require("../../core/entities/Fee/FeeParticulars");
const exceptions_1 = require("../../core/exceptions");
const FeeMaster_1 = require("../../core/entities/Fee/FeeMaster");
const FeeRegisterDetails_1 = require("../../core/entities/Fee/FeeRegisterDetails");
let FeeParticularService = class FeeParticularService {
    constructor() { }
    addFeeParticulars(feeParticulars, currentUser) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const entity = Object.assign(new FeeParticulars_1.FeeParticulars(), feeParticulars);
                entity.createdby = currentUser;
                const res = yield typeorm_1.getManager()
                    .getRepository(FeeParticulars_1.FeeParticulars)
                    .save(entity);
                return res;
            }
            catch (error) {
                throw new exceptions_1.InternalServerError("Unhandled Error", error);
            }
        });
    }
    editFeeParticulars(id, feeParticulars, currentUser) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const entity = Object.assign(new FeeParticulars_1.FeeParticulars(), feeParticulars);
                entity.updatedby = currentUser;
                const res = yield typeorm_1.getManager()
                    .getRepository(FeeParticulars_1.FeeParticulars)
                    .update(id, entity);
                return res;
            }
            catch (error) {
                throw new exceptions_1.InternalServerError("Unhandled Error", error);
            }
        });
    }
    delFeeParticulars(id, currentUser) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let is_found = false;
                const find_in_master = yield typeorm_1.getManager()
                    .getRepository(FeeMaster_1.FeeMaster)
                    .createQueryBuilder("fm")
                    .where("fm.fee_particulars_id = :p_id")
                    .setParameter("p_id", id)
                    .getMany();
                if (find_in_master.length) {
                    is_found = true;
                    throw new exceptions_1.InternalServerError("Fee Particulars found in Class Fee setup. Please delete from Fee Class inorder to delete this record");
                }
                yield typeorm_1.getManager()
                    .getRepository(FeeRegisterDetails_1.FeeRegisterDetails)
                    .createQueryBuilder("frd")
                    .leftJoin(FeeMaster_1.FeeMaster, "fm", "frd.fee_master_id = fm.id")
                    .leftJoin(FeeParticulars_1.FeeParticulars, "fp", "fp.id = fm.fee_particulars_id")
                    .where("fp.id = :p_id")
                    .setParameter("p_id", id)
                    .getMany()
                    .then((d) => __awaiter(this, void 0, void 0, function* () {
                    if (d.length > 0) {
                        throw new exceptions_1.InternalServerError("Fee Particulars found in Fee Register setup. Please delete from Fee Register inorder to delete this record");
                    }
                    else {
                        const res = yield typeorm_1.getManager()
                            .createQueryBuilder()
                            .delete()
                            .from(FeeParticulars_1.FeeParticulars)
                            .where("id = :id", { id: id })
                            .execute();
                        if (res.affected >= 1) {
                            return { Messages: "Deleted successfully" };
                        }
                        else {
                            return { Messages: "No Records Deleted" };
                        }
                    }
                }));
            }
            catch (error) {
                throw new exceptions_1.InternalServerError("Unhandled Error", error);
            }
        });
    }
    listFeeParticulars() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const res = yield typeorm_1.getManager()
                    .getRepository(FeeParticulars_1.FeeParticulars)
                    .createQueryBuilder("fh")
                    .orderBy("fh.name", "ASC")
                    .getMany();
                return res;
            }
            catch (error) {
                throw new exceptions_1.InternalServerError("Unhandled Error", error);
            }
        });
    }
    findFeeParticularsById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const res = yield typeorm_1.getManager()
                    .getRepository(FeeParticulars_1.FeeParticulars)
                    .findOne({ where: { id: id } });
                return res;
            }
            catch (error) {
                throw new exceptions_1.InternalServerError("Unhandled Error", error);
            }
        });
    }
};
FeeParticularService = __decorate([
    inversify_1.injectable(),
    __metadata("design:paramtypes", [])
], FeeParticularService);
exports.FeeParticularService = FeeParticularService;
//# sourceMappingURL=FeeParticularService.js.map