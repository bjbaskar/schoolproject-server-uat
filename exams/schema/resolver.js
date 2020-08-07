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
        getAllExamMaster(_, args, context) {
            return __awaiter(this, void 0, void 0, function* () {
                const svr = context.ExamService;
                const res = yield svr.getAllExamMaster(args.examName, args.classId);
                return res;
            });
        },
        getOneExamMaster(_, args, context) {
            return __awaiter(this, void 0, void 0, function* () {
                const svr = context.ExamService;
                const res = yield svr.getOneExamMaster(args.id);
                return res;
            });
        },
        getMarkRegister(_, args, context) {
            return __awaiter(this, void 0, void 0, function* () {
                const svr = context.ExamService;
                const res = yield svr.getMarkRegister(args.studentId);
                return res;
            });
        },
        getAllMarkRegister(_, args, context) {
            return __awaiter(this, void 0, void 0, function* () {
                const svr = context.ExamService;
                const res = yield svr.getAllMarkRegister(args.classId);
                return res;
            });
        },
        getExamGrade(_, args, context) {
            return __awaiter(this, void 0, void 0, function* () {
                const svr = context.ExamService;
                const res = yield svr.getExamGrade(args.id);
                return res;
            });
        },
        getAllExamGrade(_, args, context) {
            return __awaiter(this, void 0, void 0, function* () {
                const svr = context.ExamService;
                const res = yield svr.getAllExamGrade();
                return res;
            });
        }
    },
    Mutation: {
        addExamMaster(root, args, context) {
            return __awaiter(this, void 0, void 0, function* () {
                const currentUser = context.CurrentUser.UserName;
                const res = yield context.ExamService.addExamMaster(args.input, currentUser);
                return res;
            });
        },
        editExamMaster(root, args, context) {
            return __awaiter(this, void 0, void 0, function* () {
                const currentUser = context.CurrentUser.UserName;
                const res = yield context.ExamService.editExamMaster(args.id, args.input, currentUser);
                return res;
            });
        },
        delExamMaster(root, args, context) {
            return __awaiter(this, void 0, void 0, function* () {
                const res = yield context.ExamService.delExamMaster(args.id);
                return res;
            });
        },
        addMarkReg(root, args, context) {
            return __awaiter(this, void 0, void 0, function* () {
                const currentUser = context.CurrentUser.UserName;
                const res = yield context.ExamService.addMarkReg(args.input, currentUser);
                return res;
            });
        },
        editMarkReg(root, args, context) {
            return __awaiter(this, void 0, void 0, function* () {
                const currentUser = context.CurrentUser.UserName;
                const res = yield context.ExamService.editMarkReg(args.id, args.input, currentUser);
                return res;
            });
        },
        delMarkReg(root, args, context) {
            return __awaiter(this, void 0, void 0, function* () {
                const res = yield context.ExamService.delMarkReg(args.id);
                return res;
            });
        },
        addMarkGrade(root, args, context) {
            return __awaiter(this, void 0, void 0, function* () {
                const currentUser = context.CurrentUser.UserName;
                const res = yield context.ExamService.addMarkGrade(args.input, currentUser);
                return res;
            });
        },
        editMarkGrade(root, args, context) {
            return __awaiter(this, void 0, void 0, function* () {
                const currentUser = context.CurrentUser.UserName;
                const res = yield context.ExamService.editMarkGrade(args.id, args.input, currentUser);
                return res;
            });
        },
        delMarkGrade(root, args, context) {
            return __awaiter(this, void 0, void 0, function* () {
                const res = yield context.ExamService.delMarkGrade(args.id);
                return res;
            });
        },
    }
};
//# sourceMappingURL=resolver.js.map