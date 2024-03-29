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
        getFeeMaster(_, args, context) {
            return __awaiter(this, void 0, void 0, function* () {
                const svc = context.FeeMasterService;
                return yield svc.getFilterFeeMaster(args.class_id, args.student_id);
            });
        },
        getAllFeeMaster(_, args, context) {
            return __awaiter(this, void 0, void 0, function* () {
                return yield context.FeeMasterService.listFeeMaster(args.class_id);
            });
        }
    },
    Mutation: {
        addFeeMaster(root, args, context) {
            return __awaiter(this, void 0, void 0, function* () {
                const currentUser = context.CurrentUser.UserName;
                const res = yield context.FeeMasterService.addFeeMaster(args.input, currentUser);
                return res;
            });
        },
        editFeeMaster(root, args, context) {
            return __awaiter(this, void 0, void 0, function* () {
                const currentUser = context.CurrentUser.UserName;
                const res = yield context.FeeMasterService.editFeeMaster(args.id, args.input, currentUser);
                return res;
            });
        },
        delFeeMaster(root, args, context) {
            return __awaiter(this, void 0, void 0, function* () {
                const currentUser = context.CurrentUser.UserName;
                const res = yield context.FeeMasterService.delFeeMaster(args.id, currentUser);
                return res;
            });
        }
    }
};
//# sourceMappingURL=resolver.js.map