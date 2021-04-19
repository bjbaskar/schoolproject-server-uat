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
const FeeMaster_1 = require("../../core/entities/Fee/FeeMaster");
const ClassSections_1 = require("../../core/entities/Master/ClassSections");
const FeeInstallments_1 = require("../../core/entities/Fee/FeeInstallments");
const FeeParticulars_1 = require("../../core/entities/Fee/FeeParticulars");
const exceptions_1 = require("../../core/exceptions");
const FeeRegister_1 = require("../../core/entities/Fee/FeeRegister");
let FeeMasterService = class FeeMasterService {
    constructor() { }
    addFeeMaster(feeMaster, currentUser) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const entity = Object.assign(new FeeMaster_1.FeeMaster(), feeMaster);
                entity.createdby = currentUser;
                let result = undefined;
                const validate = yield this.validate(feeMaster);
                if (validate > 0) {
                    throw new Error(`Duplicate Error! Class / Fee Installments / Fee Particulars Already found.`);
                }
                else {
                    result = yield typeorm_1.getManager()
                        .getRepository(FeeMaster_1.FeeMaster)
                        .save(entity);
                }
                return result;
            }
            catch (error) {
                throw new exceptions_1.InternalServerError("Unhandled Error", error);
            }
        });
    }
    editFeeMaster(id, feeMaster, currentUser) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const entity = Object.assign(new FeeMaster_1.FeeMaster(), feeMaster);
                entity.updatedby = currentUser;
                const result = yield typeorm_1.getManager()
                    .createQueryBuilder()
                    .update(FeeMaster_1.FeeMaster)
                    .set({
                    due_date: entity.due_date,
                    amount: entity.amount,
                    is_required_to_all: entity.is_required_to_all,
                    is_refundable: entity.is_refundable,
                    isactive: entity.isactive,
                    updatedby: currentUser
                })
                    .where("id = :id", { id: id })
                    .execute();
                return result;
            }
            catch (error) {
                throw new exceptions_1.InternalServerError("Unhandled Error", error);
            }
        });
    }
    delFeeMaster(id, currentUser) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const res = yield typeorm_1.getManager()
                    .createQueryBuilder()
                    .delete()
                    .from(FeeMaster_1.FeeMaster)
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
    listFeeMaster(class_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const qb = typeorm_1.getManager()
                    .getRepository(FeeMaster_1.FeeMaster)
                    .createQueryBuilder("fm")
                    .leftJoinAndMapOne("fm.class_id", ClassSections_1.ClassSections, "class_sec", "class_sec.id = fm.class_id")
                    .leftJoinAndMapOne("fm.fee_particulars_id", FeeParticulars_1.FeeParticulars, "fh", "fh.id = fm.fee_particulars_id")
                    .leftJoinAndMapOne("fm.fee_installments_id", FeeInstallments_1.FeeInstallments, "fsr", "fsr.id = fm.fee_installments_id")
                    .orderBy("class_sec.orderby", "ASC")
                    .addOrderBy("fh.name", "ASC")
                    .addOrderBy("fm.amount", "DESC");
                if (class_id !== "ALL") {
                    qb.where("class_sec.id = :class_id", { class_id: class_id });
                }
                const res = yield qb.getMany();
                return res;
            }
            catch (error) {
                throw new exceptions_1.InternalServerError("Unhandled Error", error);
            }
        });
    }
    getFilterFeeMaster(class_id, student_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const q_main = typeorm_1.getManager()
                    .getRepository(FeeMaster_1.FeeMaster)
                    .createQueryBuilder("fm")
                    .select([
                    "cl.id AS class_id",
                    "st.id AS student_id",
                    "fm.id AS fee_master_id",
                    "fm.amount AS amount",
                    "fm.due_date AS due_date",
                    "fp.id AS fee_particulars_id",
                    "fp.name AS particulars_name",
                    "fi.id AS fee_installments_id",
                    "fi.fee_period AS fee_period",
                    "fi.term_name AS term_name",
                    "fi.no_of_months AS no_of_months",
                    "fi.term_month_names AS term_month_names",
                    "fi.from_date AS from_date",
                    "fi.to_date AS to_date",
                    "fm.is_required_to_all AS is_required_to_all",
                    "fm.is_refundable AS is_refundable",
                    "fm.isactive AS isactive",
                    "reg.amount_balance AS amount_balance"
                ])
                    .addSelect(`CASE
						WHEN reg.is_paid_fully = true THEN "FULLY_PAID"
						WHEN reg.is_paid_fully = false THEN "PARTIALLY_PAID"
						ELSE "NOT_PAID"
					END`, "paid_status")
                    .leftJoinAndMapOne("fm.class_id", ClassSections_1.ClassSections, "cl", "cl.id = fm.class_id")
                    .leftJoin("cl.students", "st")
                    .leftJoinAndMapOne("fm.fee_particulars_id", FeeParticulars_1.FeeParticulars, "fp", "fp.id = fm.fee_particulars_id")
                    .leftJoinAndMapOne("fm.fee_installments_id", FeeInstallments_1.FeeInstallments, "fi", "fi.id = fm.fee_installments_id")
                    .leftJoin(subQry => {
                    const qb = subQry
                        .select([
                        "r.class_id AS class_id",
                        "r.student_id AS student_id",
                        "r_dt.is_paid_fully AS is_paid_fully",
                        "r_dt.fee_master_id AS fee_master_id",
                        "r_dt.amount_balance AS amount_balance",
                    ])
                        .from(FeeRegister_1.FeeRegister, "r")
                        .leftJoin("r.fee_reg_details", "r_dt")
                        .where("r.class_id = :classId");
                    return qb;
                }, "reg", `reg.fee_master_id = fm.id
					AND reg.class_id = cl.id
					AND reg.student_id = st.id`)
                    .where("cl.id = :classId")
                    .orderBy("cl.orderby", "ASC")
                    .addOrderBy("fp.name", "ASC")
                    .addOrderBy("fm.amount", "DESC")
                    .getQuery();
                const result = yield typeorm_1.getManager()
                    .createQueryBuilder()
                    .select("res.*")
                    .from("(" + q_main + ")", "res")
                    .where("res.paid_status != 'FULLY_PAID'")
                    .andWhere("res.student_id = :studentId")
                    .setParameter("classId", class_id)
                    .setParameter("studentId", student_id)
                    .getRawMany();
                return result;
            }
            catch (error) {
                throw new exceptions_1.InternalServerError("getFilterFeeMaster: ", error);
            }
        });
    }
    validate(entity) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const res = yield typeorm_1.getManager()
                    .getRepository(FeeMaster_1.FeeMaster)
                    .createQueryBuilder("f")
                    .where("f.class_id = :class_id", { class_id: entity.class_id })
                    .andWhere("f.fee_particulars_id = :fee_particulars_id", { fee_particulars_id: entity.fee_particulars_id })
                    .andWhere("f.fee_installments_id = :fee_installments_id", { fee_installments_id: entity.fee_installments_id })
                    .getCount();
                return res;
            }
            catch (error) {
                throw new exceptions_1.InternalServerError("Unhandled Error", error);
            }
        });
    }
};
FeeMasterService = __decorate([
    inversify_1.injectable(),
    __metadata("design:paramtypes", [])
], FeeMasterService);
exports.FeeMasterService = FeeMasterService;
//# sourceMappingURL=FeeMasterService.js.map