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
        getFeeStudent(_, args, context) {
            return __awaiter(this, void 0, void 0, function* () {
                const svc = context.FeeStudentConfigService;
                return yield svc.findFeeStudentById(args.id);
            });
        },
        getAllFeeStudent(_, args, context) {
            return __awaiter(this, void 0, void 0, function* () {
                return yield context.FeeStudentConfigService.listFeeStudent();
            });
        }
    },
    Mutation: {
        addFeeStudent(root, args, context) {
            return __awaiter(this, void 0, void 0, function* () {
                const currentUser = context.CurrentUser.UserName;
                const res = yield context.FeeStudentConfigService.addFeeStudent(args.input, currentUser);
                return res;
            });
        },
        editFeeStudent(root, args, context) {
            return __awaiter(this, void 0, void 0, function* () {
                const currentUser = context.CurrentUser.UserName;
                const res = yield context.FeeStudentConfigService.editFeeStudent(args.id, args.input, currentUser);
                return res;
            });
        },
        delFeeStudent(root, args, context) {
            return __awaiter(this, void 0, void 0, function* () {
                const currentUser = context.CurrentUser.UserName;
                const res = yield context.FeeStudentConfigService.delFeeStudent(args.id, currentUser);
                return res;
            });
        }
    }
};
//# sourceMappingURL=resolver.js.map