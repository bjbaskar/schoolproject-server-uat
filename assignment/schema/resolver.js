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
        getAssignment(_, args, context) {
            return __awaiter(this, void 0, void 0, function* () {
                const svr = context.AssignmentService;
                const res = yield svr.getAssignment(args.classId, args.duedate, args.mode);
                return res;
            });
        },
        getSubjectsByClass(_, args, context) {
            return __awaiter(this, void 0, void 0, function* () {
                const svr = context.AssignmentService;
                const res = yield svr.getSubjectsByClass(args.classId);
                return res;
            });
        },
    },
    Mutation: {
        addAssignment(root, args, context) {
            return __awaiter(this, void 0, void 0, function* () {
                const currentUser = context.CurrentUser.UserName;
                const res = yield context.AssignmentService.addAssignment(args.input, currentUser);
                return res;
            });
        },
        editAssignment(root, args, context) {
            return __awaiter(this, void 0, void 0, function* () {
                const currentUser = context.CurrentUser.UserName;
                const res = yield context.AssignmentService.editAssignment(args.id, args.input, currentUser);
                return res;
            });
        },
        delAssignment(root, args, context) {
            return __awaiter(this, void 0, void 0, function* () {
                const currentUser = context.CurrentUser.UserName;
                const res = yield context.AssignmentService.delAssignment(args.id);
                return res;
            });
        },
    }
};
//# sourceMappingURL=resolver.js.map