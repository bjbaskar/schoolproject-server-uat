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
        getFeeDiscount(_, args, context) {
            return __awaiter(this, void 0, void 0, function* () {
                const svc = context.FeeDiscountService;
                return yield svc.findFeeDiscountById(args.id);
            });
        },
        getAllFeeDiscount(_, args, context) {
            return __awaiter(this, void 0, void 0, function* () {
                return yield context.FeeDiscountService.listFeeDiscount();
            });
        }
    },
    Mutation: {
        addFeeDiscount(root, args, context) {
            return __awaiter(this, void 0, void 0, function* () {
                const currentUser = context.CurrentUser.UserName;
                const res = yield context.FeeDiscountService.addFeeDiscount(args.input, currentUser);
                return res;
            });
        },
        editFeeDiscount(root, args, context) {
            return __awaiter(this, void 0, void 0, function* () {
                const currentUser = context.CurrentUser.UserName;
                const res = yield context.FeeDiscountService.editFeeDiscount(args.id, args.input, currentUser);
                return res;
            });
        },
        delFeeDiscount(root, args, context) {
            return __awaiter(this, void 0, void 0, function* () {
                const currentUser = context.CurrentUser.UserName;
                const res = yield context.FeeDiscountService.delFeeDiscount(args.id, currentUser);
                return res;
            });
        }
    }
};
//# sourceMappingURL=resolver.js.map