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
const exceptions_1 = require("../../core/exceptions");
const FeeTransaction_1 = require("../../core/entities/Fee/FeeTransaction");
const FeeRegister_1 = require("../../core/entities/Fee/FeeRegister");
const FeeMaster_1 = require("../../core/entities/Fee/FeeMaster");
const ClassSections_1 = require("../../core/entities/Master/ClassSections");
const FeeParticulars_1 = require("../../core/entities/Fee/FeeParticulars");
const FeeInstallments_1 = require("../../core/entities/Fee/FeeInstallments");
let FeeTransactionRptSvc = class FeeTransactionRptSvc {
    constructor() {
    }
    getTransWidgetRpt(fromDate, toDate) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = {};
                let f_paydate = moment_1.default().format("YYYY-MM-DD");
                let t_paydate = moment_1.default().format("YYYY-MM-DD");
                if (fromDate) {
                    f_paydate = moment_1.default(fromDate).format("YYYY-MM-DD");
                }
                if (toDate) {
                    t_paydate = moment_1.default(toDate).format("YYYY-MM-DD");
                }
                const daily_tr = yield typeorm_1.getManager()
                    .getRepository(FeeTransaction_1.FeeTransaction)
                    .createQueryBuilder("ft")
                    .select([
                    "SUM(amount_paid) AS total_amount_paid",
                    "COUNT(DISTINCT(student_id)) AS total_students"
                ])
                    .where("DATE_FORMAT(ft.paydate, '%Y-%m-%d') BETWEEN :fromDate AND :toDate")
                    .setParameter("fromDate", f_paydate)
                    .setParameter("toDate", t_paydate)
                    .getRawOne();
                const daily_tr_res = {
                    amount: daily_tr.total_amount_paid,
                    no_of_student: daily_tr.total_students
                };
                result.daily_trans = daily_tr_res;
                const q_main = typeorm_1.getManager()
                    .getRepository(FeeRegister_1.FeeRegister)
                    .createQueryBuilder("fr")
                    .select([
                    "fr_dt.is_paid_fully AS is_paid_fully",
                    "fr_dt.amount_paid AS amount_paid",
                    "fr.student_id AS student_id"
                ])
                    .innerJoin("fr.fee_reg_details", "fr_dt")
                    .where("DATE_FORMAT(fr_dt.paydate, '%Y-%m-%d') BETWEEN :fromDate AND :toDate")
                    .getQuery();
                const daily_paid = yield typeorm_1.getManager()
                    .createQueryBuilder()
                    .select([
                    "res.is_paid_fully AS is_paid_fully"
                ])
                    .addSelect("SUM(res.amount_paid) AS total_amount_paid")
                    .from("(" + q_main + ")", "res")
                    .groupBy("res.is_paid_fully")
                    .setParameter("fromDate", f_paydate)
                    .setParameter("toDate", t_paydate)
                    .getRawMany();
                const daily_paid_stud = yield typeorm_1.getManager()
                    .createQueryBuilder()
                    .select([
                    "res.is_paid_fully AS is_paid_fully",
                    "COUNT(DISTINCT(res.student_id)) AS total_students"
                ])
                    .from("(" + q_main + ")", "res")
                    .groupBy("res.is_paid_fully")
                    .setParameter("fromDate", f_paydate)
                    .setParameter("toDate", t_paydate)
                    .getRawMany();
                let p_paid = {
                    amount: 0,
                    no_of_student: 0
                };
                let f_paid = {
                    amount: 0,
                    no_of_student: 0
                };
                lodash_1.default.map(daily_paid, d => {
                    if (d.is_paid_fully) {
                        f_paid = {
                            amount: d.total_amount_paid,
                            no_of_student: 0
                        };
                    }
                    else {
                        p_paid = {
                            amount: d.total_amount_paid,
                            no_of_student: 0
                        };
                    }
                    return;
                });
                lodash_1.default.map(daily_paid_stud, d => {
                    if (d.is_paid_fully) {
                        f_paid = Object.assign({}, f_paid, { no_of_student: d.total_students });
                    }
                    else {
                        p_paid = Object.assign({}, p_paid, { no_of_student: d.total_students });
                    }
                    return;
                });
                result.fully_paid = f_paid;
                result.partially_paid = p_paid;
                return result;
            }
            catch (error) {
                throw new exceptions_1.InternalServerError("getTransWidgetRpt: ", error);
            }
        });
    }
    getClassFeeReport(class_id, fromDate, toDate, rpt_type, particulars_id, installments_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let result = [];
                let f_paydate = moment_1.default().format("YYYY-MM-DD");
                let t_paydate = moment_1.default().format("YYYY-MM-DD");
                if (fromDate) {
                    f_paydate = moment_1.default(fromDate).format("YYYY-MM-DD");
                }
                if (toDate) {
                    t_paydate = moment_1.default(toDate).format("YYYY-MM-DD");
                }
                const qb_cl = typeorm_1.getManager()
                    .getRepository(ClassSections_1.ClassSections)
                    .createQueryBuilder("cl")
                    .select([
                    "cl.id AS class_id",
                    "CONCAT(cl.name, ' - ', cl.section) AS class_name",
                    "cl.orderby AS cls_orderby",
                    "st.id AS student_id",
                    "CONCAT(st.firstname, ' ', st.lastname) AS student_name",
                    "st.studentno AS studentno",
                    "fp.id AS fee_particulars_id",
                    "fp.name AS particulars_name",
                    "fi.fee_period AS fee_period",
                    "fi.term_name AS term_name",
                    "fi.no_of_months AS no_of_months",
                    "fm.id AS fee_master_id",
                    "fm.amount AS payable_amount",
                    "fm.due_date AS due_date",
                    "reg.amount_paid AS amount_paid",
                    "reg.amount_discount AS amount_discount",
                    "reg.amount_balance AS amount_balance",
                    "reg.paydate AS paydate"
                ])
                    .addSelect(`CASE
						WHEN reg.is_paid_fully = true THEN "FULLY_PAID"
						WHEN reg.is_paid_fully = false THEN "PARTIALLY_PAID"
						ELSE "NOT_PAID"
					END`, "paid_status")
                    .leftJoin("cl.students", "st")
                    .leftJoin(FeeMaster_1.FeeMaster, "fm", "cl.id = fm.class_id")
                    .innerJoinAndMapMany("fm.fee_particulars_id", FeeParticulars_1.FeeParticulars, "fp", "fp.id = fm.fee_particulars_id")
                    .innerJoinAndMapMany("fm.fee_installments_id", FeeInstallments_1.FeeInstallments, "fi", "fi.id = fm.fee_installments_id")
                    .leftJoin(subQry => {
                    const qb = subQry
                        .select([
                        "r.class_id AS class_id",
                        "r.student_id AS student_id",
                        "r_dt.is_paid_fully AS is_paid_fully",
                        "r_dt.amount_paid AS amount_paid",
                        "r_dt.amount_discount AS amount_discount",
                        "r_dt.amount_balance AS amount_balance",
                        "r_dt.fee_master_id AS fee_master_id",
                        "r_dt.paydate AS paydate"
                    ])
                        .from(FeeRegister_1.FeeRegister, "r")
                        .leftJoin("r.fee_reg_details", "r_dt");
                    return qb;
                }, "reg", "reg.fee_master_id = fm.id AND reg.class_id = cl.id AND reg.student_id = st.id")
                    .where("DATE_FORMAT(fm.due_date, '%Y-%m-%d') <= :toDate");
                if (class_id && class_id !== "ALL") {
                    qb_cl.andWhere("fm.class_id = :classId");
                }
                if (particulars_id && particulars_id !== "ALL") {
                    qb_cl.andWhere("fp.id = :particulars_id");
                }
                if (installments_id && installments_id !== "ALL") {
                    qb_cl.andWhere("fi.id = :installments_id");
                }
                const qb_res = qb_cl.getQuery();
                const final_qry = typeorm_1.getManager()
                    .createQueryBuilder()
                    .select("res.*")
                    .from("(" + qb_res + ")", "res");
                if (rpt_type === "NOT_PAID") {
                    final_qry.andWhere("paid_status = 'NOT_PAID'");
                }
                if (rpt_type === "PARTIALLY_PAID") {
                    final_qry.andWhere("paid_status = 'PARTIALLY_PAID'");
                }
                if (rpt_type === "FULLY_PAID") {
                    final_qry.andWhere("paid_status = 'FULLY_PAID'");
                }
                result = yield final_qry
                    .orderBy("res.cls_orderby", "ASC")
                    .addOrderBy("res.student_name", "ASC")
                    .setParameter("classId", class_id)
                    .setParameter("fromDate", f_paydate)
                    .setParameter("toDate", t_paydate)
                    .setParameter("particulars_id", particulars_id)
                    .getRawMany();
                return result;
            }
            catch (error) {
                throw new exceptions_1.InternalServerError("getClassFeeReport: ", error);
            }
        });
    }
    getFeeSummaryReport() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const due_date = moment_1.default().format("YYYY-MM-DD");
                const q_cl = typeorm_1.getManager()
                    .getRepository(ClassSections_1.ClassSections)
                    .createQueryBuilder("cl")
                    .select([
                    "cl.id AS class_id",
                    "CONCAT(cl.name, ' - ', cl.section) AS cl_name",
                    "COUNT(st.firstname) AS noofst"
                ])
                    .leftJoin("cl.students", "st")
                    .where("st.isactive = true")
                    .groupBy("class_id")
                    .addGroupBy("cl_name")
                    .getQuery();
                const q_fm = typeorm_1.getManager()
                    .getRepository(FeeMaster_1.FeeMaster)
                    .createQueryBuilder("fm")
                    .select([
                    "fm.class_id AS class_id",
                    "SUM(fm.amount) as per_st_amount"
                ])
                    .where("fm.due_date <= :dueDate")
                    .groupBy("fm.class_id")
                    .getQuery();
                const q_reg = typeorm_1.getManager()
                    .getRepository(FeeRegister_1.FeeRegister)
                    .createQueryBuilder("fr")
                    .select([
                    "fr.class_id as class_id",
                    "SUM(fr.total_amount_paid) as t_amt"
                ])
                    .groupBy("fr.class_id")
                    .getQuery();
                const res = typeorm_1.getManager()
                    .createQueryBuilder()
                    .select([
                    "cl.cl_name AS class_name",
                    "cl.noofst AS no_of_st",
                    "m.per_st_amount AS per_st_amount",
                    "(m.per_st_amount * cl.noofst) AS payable_amount",
                    "r.t_amt AS total_amount_paid",
                ])
                    .addSelect(`CASE
						WHEN ((m.per_st_amount * cl.noofst) - r.t_amt) IS NULL THEN (m.per_st_amount * cl.noofst)
						ELSE ((m.per_st_amount * cl.noofst) - r.t_amt)
					END`, "overdue_amount")
                    .from("(" + q_cl + ")", "cl")
                    .leftJoin("(" + q_fm + ")", "m", "cl.class_id = m.class_id")
                    .leftJoin("(" + q_reg + ")", "r", "cl.class_id = r.class_id")
                    .leftJoin(ClassSections_1.ClassSections, "cls", "cls.id = cl.class_id")
                    .setParameter("dueDate", due_date)
                    .orderBy("cls.orderby", "ASC")
                    .getRawMany();
                return res;
            }
            catch (error) {
                throw new exceptions_1.InternalServerError("getFeeSummaryReport: ", error);
            }
        });
    }
    getStudentInvoice(class_id, student_id, from_date, to_date) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const f_paydate = moment_1.default(from_date).format("YYYY-MM-DD");
                const t_paydate = moment_1.default(to_date).format("YYYY-MM-DD");
                const qb_cl = typeorm_1.getManager()
                    .getRepository(ClassSections_1.ClassSections)
                    .createQueryBuilder("cl")
                    .select([
                    "cl.id AS class_id",
                    "CONCAT(cl.name, ' - ', cl.section) AS class_name",
                    "cl.orderby AS cls_orderby",
                    "st.id AS student_id",
                    "CONCAT(st.firstname, ' ', st.lastname) AS student_name",
                    "st.studentno AS studentno",
                    "fp.id AS fee_particulars_id",
                    "fp.name AS particulars_name",
                    "fi.fee_period AS fee_period",
                    "fi.term_name AS term_name",
                    "fi.no_of_months AS no_of_months",
                    "fm.id AS fee_master_id",
                    "fm.amount AS payable_amount",
                    "fm.due_date AS due_date",
                    "ft.amount_paid AS amount_paid",
                    "ft.amount_balance AS amount_balance",
                    "ft.paydate AS paydate",
                    "reg.amount_discount AS amount_discount"
                ])
                    .addSelect(`CASE
						WHEN reg.is_paid_fully = true THEN "FULLY_PAID"
						WHEN reg.is_paid_fully = false THEN "PARTIALLY_PAID"
						ELSE "NOT_PAID"
					END`, "paid_status")
                    .leftJoin("cl.students", "st")
                    .leftJoin(FeeMaster_1.FeeMaster, "fm", "cl.id = fm.class_id")
                    .innerJoin(FeeTransaction_1.FeeTransaction, "ft", `ft.class_id = cl.id
					AND ft.student_id = st.id
					AND ft.fee_master_id = fm.id`)
                    .innerJoinAndMapMany("fm.fee_particulars_id", FeeParticulars_1.FeeParticulars, "fp", "fp.id = fm.fee_particulars_id")
                    .innerJoinAndMapMany("fm.fee_installments_id", FeeInstallments_1.FeeInstallments, "fi", "fi.id = fm.fee_installments_id")
                    .innerJoin(subQry => {
                    const qb = subQry
                        .select([
                        "r.class_id AS class_id",
                        "r.student_id AS student_id",
                        "r_dt.is_paid_fully AS is_paid_fully",
                        "r_dt.amount_paid AS amount_paid",
                        "r_dt.amount_discount AS amount_discount",
                        "r_dt.amount_balance AS amount_balance",
                        "r_dt.fee_master_id AS fee_master_id",
                        "r_dt.paydate AS paydate",
                        "r_dt.fee_trans_id AS fee_trans_id"
                    ])
                        .from(FeeRegister_1.FeeRegister, "r")
                        .leftJoin("r.fee_reg_details", "r_dt")
                        .where("r.class_id = :classId")
                        .andWhere("r.student_id = :studentId")
                        .andWhere("DATE_FORMAT(r_dt.paydate, '%Y-%m-%d') BETWEEN :fromDate AND :toDate");
                    return qb;
                }, "reg", `reg.fee_master_id = fm.id
					AND reg.class_id = cl.id
					AND reg.student_id = st.id`)
                    .where("reg.class_id = :classId")
                    .andWhere("reg.student_id =:studentId")
                    .andWhere("DATE_FORMAT(ft.paydate, '%Y-%m-%d') BETWEEN :fromDate AND :toDate")
                    .orderBy("fi.term_name", "ASC")
                    .addOrderBy("fp.name", "ASC")
                    .addOrderBy("ft.paydate", "DESC");
                const q_res = yield qb_cl
                    .setParameter("classId", class_id)
                    .setParameter("studentId", student_id)
                    .setParameter("fromDate", f_paydate)
                    .setParameter("toDate", t_paydate)
                    .getRawMany();
                const q_total = {
                    total_amount_paid: lodash_1.default.sumBy(q_res, "amount_paid"),
                    total_amount_discount: lodash_1.default.sumBy(q_res, "amount_discount"),
                    total_amount_balance: lodash_1.default.sumBy(q_res, "amount_balance")
                };
                const result = {
                    rows: q_res,
                    total: q_total
                };
                return result;
            }
            catch (error) {
                throw new exceptions_1.InternalServerError("getFeeSummaryReport: ", error);
            }
        });
    }
    getTransactionReport(class_id, from_date, to_date) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const f_paydate = moment_1.default(from_date).format("YYYY-MM-DD");
                const t_paydate = moment_1.default(to_date).format("YYYY-MM-DD");
                const qb_cl = typeorm_1.getManager()
                    .getRepository(ClassSections_1.ClassSections)
                    .createQueryBuilder("cl")
                    .select([
                    "cl.id AS class_id",
                    "CONCAT(cl.name, ' - ', cl.section) AS class_name",
                    "cl.orderby AS cls_orderby",
                    "st.id AS student_id",
                    "CONCAT(st.firstname, ' ', st.lastname) AS student_name",
                    "st.studentno AS studentno",
                    "fp.id AS fee_particulars_id",
                    "fp.name AS particulars_name",
                    "fi.fee_period AS fee_period",
                    "fi.term_name AS term_name",
                    "fi.no_of_months AS no_of_months",
                    "fm.id AS fee_master_id",
                    "fm.amount AS payable_amount",
                    "fm.due_date AS due_date",
                    "ft.amount_paid AS amount_paid",
                    "ft.amount_balance AS amount_balance",
                    "ft.paydate AS paydate",
                    "NULL AS amount_discount",
                    "'' AS paid_status"
                ])
                    .leftJoin("cl.students", "st")
                    .leftJoin(FeeMaster_1.FeeMaster, "fm", "cl.id = fm.class_id")
                    .innerJoin(FeeTransaction_1.FeeTransaction, "ft", `ft.class_id = cl.id
					AND ft.student_id = st.id
					AND ft.fee_master_id = fm.id`)
                    .innerJoinAndMapMany("fm.fee_particulars_id", FeeParticulars_1.FeeParticulars, "fp", "fp.id = fm.fee_particulars_id")
                    .innerJoinAndMapMany("fm.fee_installments_id", FeeInstallments_1.FeeInstallments, "fi", "fi.id = fm.fee_installments_id")
                    .where("DATE_FORMAT(ft.paydate, '%Y-%m-%d') BETWEEN :fromDate AND :toDate");
                if (class_id !== "ALL") {
                    qb_cl.andWhere("cl.id = :classId");
                }
                qb_cl.orderBy("cl.orderby", "ASC")
                    .addOrderBy("ft.paydate", "DESC")
                    .addOrderBy("fi.term_name", "ASC")
                    .addOrderBy("fp.name", "ASC");
                const q_res = yield qb_cl
                    .setParameter("classId", class_id)
                    .setParameter("fromDate", f_paydate)
                    .setParameter("toDate", t_paydate)
                    .getRawMany();
                const q_total = {
                    total_amount_paid: lodash_1.default.sumBy(q_res, "amount_paid"),
                    total_amount_discount: 0,
                    total_amount_balance: lodash_1.default.sumBy(q_res, "amount_balance")
                };
                const result = {
                    rows: q_res,
                    total: q_total
                };
                return result;
            }
            catch (error) {
                throw new exceptions_1.InternalServerError("getTransactionReport: ", error);
            }
        });
    }
};
FeeTransactionRptSvc = __decorate([
    inversify_1.injectable(),
    __metadata("design:paramtypes", [])
], FeeTransactionRptSvc);
exports.FeeTransactionRptSvc = FeeTransactionRptSvc;
//# sourceMappingURL=FeeTransactionRptSvc.js.map