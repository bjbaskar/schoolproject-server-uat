"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = {
    Query: {
        getPriorBalance(_, args, context) {
            return __awaiter(this, void 0, void 0, function* () {
                const result = yield context.FeeTransactionService.getPriorBalance(args.class_id, args.student_id);
                return result;
            });
        },
        getFeeReceipt(_, args, context) {
            return __awaiter(this, void 0, void 0, function* () {
                const result = yield context.FeeTransactionService.getFeeReceipt(args.class_id, args.student_id, args.paydate, args.receipt_no);
                return result;
            });
        },
        getTransWidgetRpt(_, args, context) {
            return __awaiter(this, void 0, void 0, function* () {
                const result = yield context.FeeTransactionService.getTransWidgetRpt(args.from_date, args.to_date);
                return result;
            });
        },
        getClasswiseFeeRpt(_, args, context) {
            return __awaiter(this, void 0, void 0, function* () {
                const result = yield context.FeeTransactionService.getClassFeeReport(args.class_id, args.from_date, args.to_date, args.rpt_type, args.particulars_id, args.installments_id);
                return result;
            });
        },
        getFeeSummaryReport(_, args, context) {
            return __awaiter(this, void 0, void 0, function* () {
                const result = yield context.FeeTransactionService.getFeeSummaryReport();
                return result;
            });
        },
        getStudentInvoice(_, args, context) {
            return __awaiter(this, void 0, void 0, function* () {
                const result = yield context.FeeTransactionService.getStudentInvoice(args.class_id, args.student_id, args.from_date, args.to_date);
                return result;
            });
        },
        getTransactionReport(_, args, context) {
            return __awaiter(this, void 0, void 0, function* () {
                const result = yield context.FeeTransactionService.getTransactionReport(args.class_id, args.from_date, args.to_date);
                return result;
            });
        }
    },
    Mutation: {
        addFeeTransaction(root, args, context) {
            return __awaiter(this, void 0, void 0, function* () {
                const currentUser = context.CurrentUser.UserName;
                const res = yield context.FeeTransactionService.addFeeTrans(args.input, currentUser);
                return res;
            });
        },
        editFeeTransaction(root, args, context) {
            return __awaiter(this, void 0, void 0, function* () {
                const currentUser = context.CurrentUser.UserName;
                const res = yield context.FeeTransactionService.editFeeTrans(args.id, args.input, currentUser);
                return res;
            });
        },
        delFeeTransaction(root, args, context) {
            return __awaiter(this, void 0, void 0, function* () {
                const currentUser = context.CurrentUser.UserName;
                const res = yield context.FeeTransactionService.delFeeTrans(args.id, currentUser);
                return res;
            });
        }
    }
};
//# sourceMappingURL=resolver.js.map