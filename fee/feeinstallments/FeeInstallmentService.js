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
const FeeInstallments_1 = require("../../core/entities/Fee/FeeInstallments");
const exceptions_1 = require("../../core/exceptions");
const moment_1 = __importDefault(require("moment"));
let FeeInstallmentService = class FeeInstallmentService {
    constructor() { }
    addFeeInstallments(feeInstallment, currentUser) {
        return __awaiter(this, void 0, void 0, function* () {
            var e_1, _a;
            try {
                let result;
                const entity = Object.assign(new FeeInstallments_1.FeeInstallments(), feeInstallment);
                const validate = yield this.validateFeePeriod(entity.fee_period, entity.term_name);
                if (validate > 0) {
                    throw new exceptions_1.InternalServerError("Fee Period already found. Please try another");
                }
                const instArray = [];
                if (entity.fee_period === "Monthly Fee") {
                    try {
                        for (var _b = __asyncValues(entity.term_month_names), _c; _c = yield _b.next(), !_c.done;) {
                            const itr = _c.value;
                            const newInst = new FeeInstallments_1.FeeInstallments();
                            const fDate = yield this.getYearMonth(itr);
                            const tDateMn = moment_1.default(fDate).endOf("month").toDate();
                            const tDate = moment_1.default(tDateMn).subtract(1, "days").toDate();
                            newInst.fee_period = entity.fee_period;
                            newInst.term_name = itr;
                            newInst.term_month_names = [itr];
                            newInst.no_of_months = 1;
                            newInst.from_date = moment_1.default(fDate).startOf("month").toDate();
                            newInst.to_date = tDate;
                            newInst.acad_year = entity.acad_year;
                            newInst.school_id = entity.school_id;
                            newInst.createdby = currentUser;
                            instArray.push(newInst);
                        }
                    }
                    catch (e_1_1) { e_1 = { error: e_1_1 }; }
                    finally {
                        try {
                            if (_c && !_c.done && (_a = _b.return)) yield _a.call(_b);
                        }
                        finally { if (e_1) throw e_1.error; }
                    }
                    result = yield typeorm_1.getManager()
                        .getRepository(FeeInstallments_1.FeeInstallments)
                        .save(instArray);
                }
                else {
                    entity.createdby = currentUser;
                    result = yield typeorm_1.getManager()
                        .getRepository(FeeInstallments_1.FeeInstallments)
                        .save(entity);
                }
                return result;
            }
            catch (error) {
                throw new exceptions_1.InternalServerError("Unhandled Error", error);
            }
        });
    }
    getYearMonth(str) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const options = [
                    { value: 0, label: "Jan" },
                    { value: 1, label: "Feb" },
                    { value: 2, label: "Mar" },
                    { value: 3, label: "Apr" },
                    { value: 4, label: "May" },
                    { value: 5, label: "Jun" },
                    { value: 6, label: "Jul" },
                    { value: 7, label: "Aug" },
                    { value: 8, label: "Sep" },
                    { value: 9, label: "Oct" },
                    { value: 10, label: "Nov" },
                    { value: 11, label: "Dec" },
                ];
                const s = str.split("-");
                if (s.length && s.length === 2) {
                    const filterData = options.filter((x) => x.label === s[0]);
                    const val = filterData.map(d => d.value)[0];
                    return [Number(s[1]), Number(val)];
                }
                else {
                    return [];
                }
            }
            catch (error) {
                throw new exceptions_1.InternalServerError("Unhandled Error", error);
            }
        });
    }
    validateFeePeriod(fee_period, term_name) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (fee_period === "Monthly Fee") {
                }
                const res = yield typeorm_1.getManager()
                    .getRepository(FeeInstallments_1.FeeInstallments)
                    .createQueryBuilder("fi")
                    .where("fi.fee_period =:feePeriod", { feePeriod: fee_period })
                    .andWhere("fi.term_name =:tName", { tName: term_name })
                    .getCount();
                return res;
            }
            catch (error) {
                throw new exceptions_1.InternalServerError("Unhandled Error", error);
            }
        });
    }
    editFeeInstallments(id, feeInstallment, currentUser) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const entity = Object.assign(new FeeInstallments_1.FeeInstallments(), feeInstallment);
                entity.updatedby = currentUser;
                const res = yield typeorm_1.getManager()
                    .getRepository(FeeInstallments_1.FeeInstallments)
                    .update(id, entity);
                return res;
            }
            catch (error) {
                throw new exceptions_1.InternalServerError("Unhandled Error", error);
            }
        });
    }
    delFeeInstallments(id, currentUser) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const res = yield typeorm_1.getManager()
                    .createQueryBuilder()
                    .delete()
                    .from(FeeInstallments_1.FeeInstallments)
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
    listFeeInstallments() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const res = yield typeorm_1.getManager()
                    .getRepository(FeeInstallments_1.FeeInstallments)
                    .createQueryBuilder("fr")
                    .orderBy("fr.fee_period", "ASC")
                    .getMany();
                return res;
            }
            catch (error) {
                throw new exceptions_1.InternalServerError("Unhandled Error", error);
            }
        });
    }
    findFeeInstallmentsById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const res = yield typeorm_1.getManager()
                    .getRepository(FeeInstallments_1.FeeInstallments)
                    .findOne({ where: { id: id } });
                return res;
            }
            catch (error) {
                throw new exceptions_1.InternalServerError("Unhandled Error", error);
            }
        });
    }
};
FeeInstallmentService = __decorate([
    inversify_1.injectable(),
    __metadata("design:paramtypes", [])
], FeeInstallmentService);
exports.FeeInstallmentService = FeeInstallmentService;
//# sourceMappingURL=FeeInstallmentService.js.map