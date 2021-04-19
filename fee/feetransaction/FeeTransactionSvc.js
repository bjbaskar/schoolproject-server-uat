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
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = require("inversify");
const typeorm_1 = require("typeorm");
const FeeTransaction_1 = require("../../core/entities/Fee/FeeTransaction");
const exceptions_1 = require("../../core/exceptions");
const FeeMaster_1 = require("../../core/entities/Fee/FeeMaster");
const FeeRegister_1 = require("../../core/entities/Fee/FeeRegister");
const FeeRegisterDetails_1 = require("../../core/entities/Fee/FeeRegisterDetails");
const ClassSections_1 = require("../../core/entities/Master/ClassSections");
const FeeParticulars_1 = require("../../core/entities/Fee/FeeParticulars");
const FeeInstallments_1 = require("../../core/entities/Fee/FeeInstallments");
const moment_1 = __importDefault(require("moment"));
const lodash_1 = __importDefault(require("lodash"));
const shortid_1 = __importDefault(require("shortid"));
const FeeTransactionRptSvc_1 = require("./FeeTransactionRptSvc");
let FeeTransactionService = class FeeTransactionService extends FeeTransactionRptSvc_1.FeeTransactionRptSvc {
    constructor() {
        super();
        this.PARAMS = {
            receipt_no: undefined,
            class_id: "",
            student_id: "",
            pay_mode: "",
            paydate: new Date(),
            trans_id: ""
        };
    }
    addFeeTrans(feeTrans, currentUser) {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = typeorm_1.getConnection();
            const queryRunner = connection.createQueryRunner();
            try {
                yield queryRunner.connect();
                yield queryRunner.startTransaction();
                this.PARAMS.class_id = feeTrans.class_id;
                this.PARAMS.student_id = feeTrans.student_id;
                this.PARAMS.pay_mode = feeTrans.pay_mode;
                this.PARAMS.receipt_no = yield this.getReceiptNo(queryRunner.manager);
                this.PARAMS.paydate = feeTrans.paydate;
                this.PARAMS.trans_id = yield this.generateId(queryRunner.manager);
                if (!feeTrans || !feeTrans.fee_details) {
                    throw new exceptions_1.NotFound("Fee Details cannot be empty.");
                }
                const addToReg = yield this.addFeeRegister(queryRunner.manager, feeTrans, currentUser);
                yield queryRunner.commitTransaction();
                return {
                    receipt_no: this.PARAMS.receipt_no
                };
            }
            catch (error) {
                console.log("error: ", error);
                yield queryRunner.rollbackTransaction();
                throw new exceptions_1.InternalServerError("addFeeTrans: ", error);
            }
            finally {
                yield queryRunner.release();
            }
        });
    }
    addFeeRegister(queryRunner, feeTrans, currentUser) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let blnResult = false;
                let regIsFound = yield this.checkFeeRegister(queryRunner);
                const frEntity = new FeeRegister_1.FeeRegister();
                frEntity.paydate = feeTrans.paydate;
                frEntity.class_id = feeTrans.class_id;
                frEntity.student_id = feeTrans.student_id;
                frEntity.acad_year = feeTrans.acad_year;
                frEntity.school_id = feeTrans.school_id;
                frEntity.createdby = currentUser;
                const feeDetails = feeTrans.fee_details;
                const t_amount_payable = lodash_1.default.sumBy(feeDetails, "amount_payable");
                const t_amount_discount = lodash_1.default.sumBy(feeDetails, "amount_discount");
                let t_amount_paid = lodash_1.default.sumBy(feeDetails, "amount_paid");
                let t_amount_balance = 0;
                if (regIsFound) {
                    t_amount_paid = regIsFound.total_amount_paid + t_amount_paid;
                    frEntity.total_amount_paid = t_amount_paid;
                    t_amount_balance = (t_amount_payable) - (t_amount_paid);
                    frEntity.total_amount_balance = t_amount_balance;
                }
                else {
                    frEntity.total_amount_paid = t_amount_paid;
                    t_amount_balance = t_amount_payable - t_amount_paid;
                    frEntity.total_amount_balance = t_amount_balance;
                }
                frEntity.total_amount_payable = t_amount_payable;
                frEntity.total_amount_discount = t_amount_discount;
                if (!regIsFound) {
                    yield queryRunner
                        .getRepository(FeeRegister_1.FeeRegister)
                        .save(frEntity)
                        .then((res) => __awaiter(this, void 0, void 0, function* () {
                        regIsFound = res;
                        yield this.addFeeRegisterDetails(queryRunner, feeTrans, regIsFound, currentUser);
                        blnResult = true;
                    }))
                        .catch((error) => __awaiter(this, void 0, void 0, function* () {
                        blnResult = false;
                        throw new exceptions_1.InternalServerError("addFeeRegister Unable to add", error);
                    }));
                }
                else {
                    yield queryRunner
                        .createQueryBuilder()
                        .update(FeeRegister_1.FeeRegister)
                        .set({
                        paydate: feeTrans.paydate,
                        total_amount_payable: t_amount_payable,
                        total_amount_discount: t_amount_discount,
                        total_amount_paid: t_amount_paid,
                        total_amount_balance: t_amount_balance,
                        updatedby: currentUser
                    })
                        .where("class_id = :classId")
                        .andWhere("student_id = :studentId")
                        .setParameter("classId", this.PARAMS.class_id)
                        .setParameter("studentId", this.PARAMS.student_id)
                        .execute()
                        .then((r) => __awaiter(this, void 0, void 0, function* () {
                        yield this.addFeeRegisterDetails(queryRunner, feeTrans, regIsFound, currentUser);
                        blnResult = true;
                        console.log(r);
                    }))
                        .catch((error) => {
                        blnResult = false;
                        throw new exceptions_1.InternalServerError("addFeeRegister Unable to update", error);
                    });
                }
                return blnResult;
            }
            catch (error) {
                throw new exceptions_1.InternalServerError("checkFeeRegister", error);
            }
        });
    }
    addFeeRegisterDetails(queryRunner, feeTrans, feeReg, currentUser) {
        return __awaiter(this, void 0, void 0, function* () {
            var e_1, _a;
            try {
                if (!feeReg) {
                    throw new exceptions_1.InternalServerError("addFeeRegisterDetails: unable to find FeeRegister record !");
                }
                let blnResult = false;
                const fee_details = feeTrans.fee_details;
                try {
                    for (var fee_details_1 = __asyncValues(fee_details), fee_details_1_1; fee_details_1_1 = yield fee_details_1.next(), !fee_details_1_1.done;) {
                        const d = fee_details_1_1.value;
                        if (Number(d.amount_paid) > 0) {
                            const fee_master_id = d.fee_master_id;
                            const dtIsFound = yield this.checkFeeRegisterDetails(queryRunner, fee_master_id);
                            const fDt = new FeeRegisterDetails_1.FeeRegisterDetails();
                            fDt.paydate = d.paydate;
                            fDt.fee_master_id = fee_master_id;
                            fDt.pay_mode = d.pay_mode;
                            fDt.fee_register_id = feeReg;
                            fDt.receipt_no = this.PARAMS.receipt_no;
                            fDt.createdby = currentUser;
                            fDt.amount_payable = d.amount_payable;
                            fDt.amount_discount = d.amount_discount;
                            let AMT_PAID = d.amount_paid;
                            if (dtIsFound) {
                                AMT_PAID = dtIsFound.amount_paid + AMT_PAID;
                            }
                            fDt.amount_paid = AMT_PAID;
                            const bal = Number(d.amount_payable) - Number(AMT_PAID);
                            fDt.amount_balance = bal;
                            if (Number(d.amount_payable) === Number(AMT_PAID)) {
                                fDt.is_paid_fully = true;
                            }
                            else if (Number(d.amount_payable) > Number(AMT_PAID)) {
                                fDt.is_paid_fully = false;
                            }
                            else if (Number(d.amount_payable) < Number(AMT_PAID)) {
                                fDt.is_paid_fully = true;
                            }
                            fDt.fee_trans_id = this.PARAMS.trans_id;
                            if (!dtIsFound) {
                                yield queryRunner
                                    .getRepository(FeeRegisterDetails_1.FeeRegisterDetails)
                                    .save(fDt)
                                    .then((r) => __awaiter(this, void 0, void 0, function* () {
                                    blnResult = true;
                                }))
                                    .catch((error) => __awaiter(this, void 0, void 0, function* () {
                                    blnResult = false;
                                    throw new exceptions_1.InternalServerError("addFeeRegister details Unable to add", error);
                                }));
                            }
                            else {
                                yield queryRunner
                                    .createQueryBuilder()
                                    .update(FeeRegisterDetails_1.FeeRegisterDetails)
                                    .set({
                                    paydate: fDt.paydate,
                                    pay_mode: fDt.pay_mode,
                                    amount_payable: fDt.amount_payable,
                                    amount_discount: fDt.amount_discount,
                                    amount_paid: fDt.amount_paid,
                                    amount_balance: fDt.amount_balance,
                                    is_paid_fully: fDt.is_paid_fully,
                                    receipt_no: fDt.receipt_no,
                                    fee_trans_id: this.PARAMS.trans_id,
                                    updatedby: currentUser
                                })
                                    .where("id = :dtId")
                                    .setParameter("dtId", dtIsFound.id)
                                    .execute()
                                    .then((r) => __awaiter(this, void 0, void 0, function* () {
                                    console.log(r);
                                    blnResult = true;
                                }))
                                    .catch((error) => {
                                    blnResult = false;
                                    throw new exceptions_1.InternalServerError("addFeeRegister details Unable to update", error);
                                });
                            }
                            const eTr = {};
                            eTr.paydate = new Date();
                            eTr.class_id = this.PARAMS.class_id;
                            eTr.student_id = this.PARAMS.student_id;
                            eTr.fee_master_id = d.fee_master_id;
                            eTr.pay_mode = this.PARAMS.pay_mode;
                            eTr.amount_paid = d.amount_paid;
                            eTr.amount_balance = bal;
                            eTr.receipt_no = this.PARAMS.receipt_no;
                            eTr.receipt_duplicate = 0;
                            eTr.iscancel = false;
                            eTr.cancel_reason = "";
                            eTr.fee_trans_id = this.PARAMS.trans_id;
                            eTr.acad_year = feeTrans.acad_year;
                            eTr.school_id = feeTrans.school_id;
                            eTr.createdby = currentUser;
                            yield queryRunner
                                .createQueryBuilder()
                                .insert()
                                .into(FeeTransaction_1.FeeTransaction)
                                .values(eTr)
                                .execute()
                                .then((r) => {
                                blnResult = true;
                            });
                        }
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (fee_details_1_1 && !fee_details_1_1.done && (_a = fee_details_1.return)) yield _a.call(fee_details_1);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
                return blnResult;
            }
            catch (error) {
                throw new exceptions_1.InternalServerError("addFeeRegisterDetails", error);
            }
        });
    }
    checkFeeRegister(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield queryRunner
                    .getRepository(FeeRegister_1.FeeRegister)
                    .createQueryBuilder("fr")
                    .where("fr.class_id = :classId")
                    .andWhere("fr.student_id = :studentId")
                    .setParameter("classId", this.PARAMS.class_id)
                    .setParameter("studentId", this.PARAMS.student_id)
                    .getOne();
                return result;
            }
            catch (error) {
                throw new exceptions_1.InternalServerError("checkFeeRegister:", error);
            }
        });
    }
    checkFeeRegisterDetails(queryRunner, fee_master_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield queryRunner
                    .getRepository(FeeRegisterDetails_1.FeeRegisterDetails)
                    .createQueryBuilder("frd")
                    .leftJoin("frd.fee_register_id", "fee_reg")
                    .where("fee_reg.class_id = :classId")
                    .andWhere("fee_reg.student_id = :studentId")
                    .andWhere("frd.fee_master_id = :feeMasterId")
                    .setParameter("classId", this.PARAMS.class_id)
                    .setParameter("studentId", this.PARAMS.student_id)
                    .setParameter("feeMasterId", fee_master_id)
                    .getOne();
                return result;
            }
            catch (error) {
                throw new exceptions_1.InternalServerError("checkFeeRegister", error);
            }
        });
    }
    generateId(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const TRANS_ID = shortid_1.default.generate();
                const result = yield queryRunner
                    .getRepository(FeeTransaction_1.FeeTransaction)
                    .createQueryBuilder("ft")
                    .where("ft.fee_trans_id = :transId")
                    .setParameter("transId", TRANS_ID)
                    .getCount();
                if (result === 0) {
                    return TRANS_ID;
                }
                else {
                    return this.generateId(queryRunner);
                }
            }
            catch (error) {
                throw new exceptions_1.InternalServerError("checkFeeRegister", error);
            }
        });
    }
    getReceiptNo(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield queryRunner
                    .getRepository(FeeTransaction_1.FeeTransaction)
                    .createQueryBuilder("ft")
                    .select("MAX(ft.receipt_no) AS receipt_no")
                    .orderBy("ft.receipt_no", "DESC")
                    .getRawOne();
                const prefix_receipt_no = (moment_1.default().format("MM"));
                let receipt_no = "0";
                if (!result.receipt_no) {
                    receipt_no = prefix_receipt_no + "" + 1;
                }
                else if (result.receipt_no && result.receipt_no !== 0) {
                    const prx_r = Number(result.receipt_no.toString().substring(0, 2));
                    const len_rn = result.receipt_no.toString().length;
                    const sx_r = Number(result.receipt_no.toString().substring(2, len_rn));
                    const newNo = Number(sx_r) + 1;
                    if (prx_r === Number(prefix_receipt_no)) {
                        receipt_no = prefix_receipt_no + "" + newNo;
                    }
                    else {
                        receipt_no = prefix_receipt_no + "" + 1;
                    }
                }
                else {
                    receipt_no = prefix_receipt_no + "" + 1;
                }
                return Number(receipt_no);
            }
            catch (error) {
                throw new exceptions_1.InternalServerError("getReceiptNo", error);
            }
        });
    }
    getFeeReceipt(class_id, student_id, paydate, receipt_no) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const p_paydate = moment_1.default(paydate).format("YYYY-MM-DD");
                const getTransQuery = typeorm_1.getManager()
                    .getRepository(FeeTransaction_1.FeeTransaction)
                    .createQueryBuilder("ft")
                    .select([
                    "class_sec.id AS class_id",
                    "CONCAT(class_sec.name, ' - ', class_sec.section) AS class_name",
                    "stud.id AS student_id",
                    "CONCAT(stud.firstname, ' ', stud.lastname) AS student_name",
                    "stud.studentno AS studentno",
                    "pr.fathername AS fathersname",
                    "adrs.address1 AS address1",
                    "adrs.address2 AS address2",
                    "adrs.city AS city",
                    "adrs.district AS district",
                    "adrs.postalcode AS postalcode",
                    "adrs.mobile AS mobile",
                    "fm.id AS fee_master_id",
                    "fm.due_date AS due_date",
                    "fm.amount AS payable_amount",
                    "ft.amount_paid AS amount_paid",
                    "ft.receipt_no AS receipt_no",
                    "ft.paydate AS paydate",
                    "ft.pay_mode AS pay_mode",
                    "ft.createdby AS createdby",
                    "ft.createdon AS createdon",
                    "ft.updatedby AS updatedby",
                    "ft.updatedon AS updatedon",
                    "fp.name AS particulars_name",
                    "fi.id AS install_id",
                    "fi.fee_period AS fee_period",
                    "fi.term_name AS term_name",
                    "fi.no_of_months AS no_of_months"
                ])
                    .leftJoinAndMapMany("ft.fee_master_id", FeeMaster_1.FeeMaster, "fm", "ft.fee_master_id = fm.id")
                    .leftJoinAndMapOne("fm.class_id", ClassSections_1.ClassSections, "class_sec", "class_sec.id = fm.class_id")
                    .leftJoinAndSelect("class_sec.students", "stud")
                    .leftJoinAndSelect("stud.parents", "pr")
                    .leftJoinAndSelect("pr.address", "adrs")
                    .leftJoinAndMapOne("fm.fee_particulars_id", FeeParticulars_1.FeeParticulars, "fp", "fp.id = fm.fee_particulars_id")
                    .leftJoinAndMapOne("fm.fee_installments_id", FeeInstallments_1.FeeInstallments, "fi", "fi.id = fm.fee_installments_id")
                    .where("fm.class_id = :classId")
                    .andWhere("stud.id = :studentId")
                    .andWhere("DATE_FORMAT(ft.paydate, '%Y-%m-%d') = :payDate")
                    .andWhere("ft.receipt_no = :receiptNo")
                    .setParameter("classId", class_id)
                    .setParameter("studentId", student_id)
                    .setParameter("payDate", p_paydate)
                    .setParameter("receiptNo", receipt_no);
                const getData = yield getTransQuery.getRawMany();
                const getBal = yield typeorm_1.getManager()
                    .getRepository(FeeRegister_1.FeeRegister)
                    .createQueryBuilder("fr")
                    .where("fr.class_id = :classId")
                    .andWhere("fr.student_id = :studentId")
                    .setParameter("classId", class_id)
                    .setParameter("studentId", student_id)
                    .getOne();
                const getAmtPaid = lodash_1.default.sumBy(getData, "amount_paid");
                const getBalData = {
                    total_amount_paid: getAmtPaid,
                    total_amount_balance: getBal.total_amount_balance
                };
                const result = lodash_1.default.chain(getData)
                    .groupBy("student_id")
                    .map((value, key) => {
                    let keyValue = undefined;
                    const feeDetailsArr = [];
                    let header = {};
                    lodash_1.default.map(value, o => {
                        const feeDt = lodash_1.default.pick(o, [
                            "paid_status",
                            "particulars_name",
                            "fee_period",
                            "term_name",
                            "no_of_months",
                            "amount_discount",
                            "amount_paid",
                            "is_paid_fully",
                            "due_date"
                        ]);
                        feeDetailsArr.push(feeDt);
                        if (key !== keyValue) {
                            keyValue = o.student_id;
                            header = lodash_1.default.pick(o, [
                                "class_id",
                                "class_name",
                                "student_id",
                                "studentno",
                                "student_name",
                                "fathersname",
                                "address1",
                                "address2",
                                "city",
                                "district",
                                "postalcode",
                                "mobile",
                                "paydate",
                                "pay_mode",
                                "receipt_no",
                                "acad_year",
                                "school_id",
                                "createdby",
                                "createdon",
                                "updatedby",
                                "updatedon"
                            ]);
                        }
                    });
                    header = Object.assign(Object.assign({}, header, getBalData));
                    const oResult = {
                        id: (key),
                        fee_register: header,
                        fee_details: feeDetailsArr,
                        acad_year: "acadyear",
                        school_id: "schoolid"
                    };
                    return oResult;
                })
                    .value();
                const finalResult = result.length ? result[0] : result;
                return finalResult;
            }
            catch (error) {
                throw new exceptions_1.InternalServerError("getFeeReceipt: ", error);
            }
        });
    }
    getPriorBalance(class_id, student_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const todayDueDate = moment_1.default().format("YYYY-MM-DD");
                const regSelectedCols = [
                    "r.total_amount_payable AS total_amount_payable",
                    "r.total_amount_discount AS total_amount_discount",
                    "r.total_amount_paid AS total_amount_paid",
                    "r.total_amount_balance AS total_amount_balance",
                    "reg_dt.paydate AS paydate",
                    "reg_dt.fee_register_id AS fee_register_id",
                    "reg_dt.fee_master_id AS fee_master_id",
                    "reg_dt.pay_mode AS pay_mode",
                    "reg_dt.amount_payable AS amount_payable",
                    "reg_dt.amount_discount AS amount_discount",
                    "reg_dt.amount_paid AS amount_paid",
                    "reg_dt.amount_balance AS amount_balance",
                    "reg_dt.is_paid_fully AS is_paid_fully",
                    "reg_dt.receipt_no AS receipt_no",
                    "reg_dt.createdby AS createdby",
                    "reg_dt.updatedby AS updatedby",
                ];
                const getPriorBal = yield typeorm_1.getManager()
                    .getRepository(FeeMaster_1.FeeMaster)
                    .createQueryBuilder("fm")
                    .select([
                    "class_sec.id AS class_id",
                    "class_sec.name AS class_name",
                    "stud.id AS student_id",
                    "stud.firstname AS student_name",
                    "fm.id AS fee_master_id",
                    "fm.due_date AS due_date",
                    "fm.amount AS payable_amount",
                    "reg.amount_discount AS amount_discount",
                    "reg.amount_paid AS amount_paid",
                    "reg.amount_balance AS amount_balance",
                    "reg.is_paid_fully AS is_paid_fully",
                    "fp.name AS particulars_name",
                    "fi.id AS install_id",
                    "fi.fee_period AS fee_period",
                    "fi.term_name AS term_name",
                    "fi.no_of_months AS no_of_months",
                    "fi.from_date AS from_date",
                    "fi.to_date AS to_date",
                    "reg.total_amount_payable AS total_amount_payable",
                    "reg.total_amount_discount AS total_amount_discount",
                    "reg.total_amount_paid AS total_amount_paid",
                    "reg.total_amount_balance AS total_amount_balance"
                ])
                    .addSelect(`CASE
						WHEN reg.is_paid_fully = true THEN reg.amount_payable
						WHEN reg.is_paid_fully = false THEN reg.amount_payable
						ELSE fm.amount
					END`, "amount_payable")
                    .addSelect(`CASE
						WHEN reg.is_paid_fully = true THEN "FULLY_PAID"
						WHEN reg.is_paid_fully = false THEN "PARTIALLY_PAID"
						ELSE "NOT_PAID"
					END`, "paid_status")
                    .leftJoinAndMapOne("fm.class_id", ClassSections_1.ClassSections, "class_sec", "class_sec.id = fm.class_id")
                    .leftJoinAndSelect("class_sec.students", "stud")
                    .leftJoinAndMapOne("fm.fee_particulars_id", FeeParticulars_1.FeeParticulars, "fp", "fp.id = fm.fee_particulars_id")
                    .leftJoinAndMapOne("fm.fee_installments_id", FeeInstallments_1.FeeInstallments, "fi", "fi.id = fm.fee_installments_id")
                    .leftJoin(subQry => {
                    const qb = subQry
                        .select(regSelectedCols)
                        .from(FeeRegister_1.FeeRegister, "r")
                        .leftJoinAndSelect("r.fee_reg_details", "reg_dt")
                        .where("r.class_id = :classId")
                        .andWhere("r.student_id = :studentId");
                    return qb;
                }, "reg", "reg.fee_master_id = fm.id")
                    .where("fm.class_id = :classId")
                    .andWhere("stud.id = :studentId")
                    .andWhere("DATE_FORMAT(fm.due_date, '%Y-%m-%d') <= :dueDate")
                    .setParameter("classId", class_id)
                    .setParameter("studentId", student_id)
                    .setParameter("dueDate", todayDueDate)
                    .getRawMany();
                const result = getPriorBal.filter((d) => d.paid_status !== "FULLY_PAID");
                const r_total_payable = lodash_1.default.sumBy(result, "amount_payable");
                const r_total_discount = lodash_1.default.sumBy(result, "amount_discount");
                const r_total_paid = "0.00";
                const r_total_balance = lodash_1.default.sumBy(result, "amount_balance");
                const totals = {
                    total_amount_payable: r_total_payable,
                    total_amount_discount: r_total_discount,
                    total_amount_paid: r_total_paid,
                    total_amount_balance: r_total_balance,
                };
                const finalResult = {
                    fee_data: result,
                    totals: totals
                };
                return finalResult;
            }
            catch (error) {
                throw new exceptions_1.InternalServerError("Unhandled Error", error);
            }
        });
    }
    editFeeTrans(id, feeHead, currentUser) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const entity = Object.assign(new FeeTransaction_1.FeeTransaction(), feeHead);
                entity.updatedby = currentUser;
                const res = yield typeorm_1.getManager()
                    .getRepository(FeeTransaction_1.FeeTransaction)
                    .update(id, entity);
                return res;
            }
            catch (error) {
                throw new exceptions_1.InternalServerError("Unhandled Error", error);
            }
        });
    }
    delFeeTrans(id, currentUser) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const res = yield typeorm_1.getManager()
                    .createQueryBuilder()
                    .delete()
                    .from(FeeTransaction_1.FeeTransaction)
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
};
FeeTransactionService = __decorate([
    inversify_1.injectable(),
    __metadata("design:paramtypes", [])
], FeeTransactionService);
exports.FeeTransactionService = FeeTransactionService;
//# sourceMappingURL=FeeTransactionSvc.js.map