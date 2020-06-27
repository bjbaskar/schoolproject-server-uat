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
        getSubject(_, args, context) {
            return __awaiter(this, void 0, void 0, function* () {
                const subjService = context.SubjectService;
                return yield subjService.findSubjectById(args.id);
            });
        },
        getSubjects(_, args, context) {
            return __awaiter(this, void 0, void 0, function* () {
                return yield context.SubjectService.listSubject();
            });
        }
    },
    Mutation: {
        addSubject(root, args, context) {
            return __awaiter(this, void 0, void 0, function* () {
                const currentUser = context.CurrentUser.UserName;
                const res = yield context.SubjectService.addSubject(args.input, currentUser);
                return res;
            });
        },
        editSubject(root, args, context) {
            return __awaiter(this, void 0, void 0, function* () {
                const currentUser = context.CurrentUser.UserName;
                const res = yield context.SubjectService.editSubject(args.id, args.input, currentUser);
                return res;
            });
        },
        delSubject(root, args, context) {
            return __awaiter(this, void 0, void 0, function* () {
                const currentUser = context.CurrentUser.UserName;
                const res = yield context.SubjectService.delSubject(args.id, currentUser);
                return res;
            });
        }
    }
};
//# sourceMappingURL=resolver.js.map