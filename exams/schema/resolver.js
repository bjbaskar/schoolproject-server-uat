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
                const res = yield svr.getAllExamMaster(args.pageNo, args.pageSize, args.examName, args.classId);
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
        verifyMarkRegister(_, args, context) {
            return __awaiter(this, void 0, void 0, function* () {
                const svr = context.ExamService;
                const res = yield svr.verifyMarkRegister(args.input);
                return res;
            });
        },
        getMarkEntry(root, args, context) {
            return __awaiter(this, void 0, void 0, function* () {
                const svr = context.ExamService;
                const res = yield svr.getMarkEntry(args.input, args.acadyear);
                return res;
            });
        },
        getClassMarkRegister(root, args, context) {
            return __awaiter(this, void 0, void 0, function* () {
                const svr = context.ExamService;
                const res = yield svr.getClassMarkRegister(args.examName, args.classId, args.acadyear);
                return res;
            });
        },
        getStudentMarks(root, args, context) {
            return __awaiter(this, void 0, void 0, function* () {
                const svr = context.ExamService;
                const res = yield svr.getStudentMarks(args.examName, args.classId, args.studentId, args.acadyear);
                return res;
            });
        },
        getStudentsForPromotion(root, args, context) {
            return __awaiter(this, void 0, void 0, function* () {
                const svr = context.ExamService;
                const res = yield svr.getStudentsForPromotion(args.examName, args.classId, args.acadyear);
                return res;
            });
        },
        getPromotionHistory(root, args, context) {
            return __awaiter(this, void 0, void 0, function* () {
                const svr = context.ExamService;
                const res = yield svr.getPromotionHistory(args.classId, args.acadyear);
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
        createMarkRegister(root, args, context) {
            return __awaiter(this, void 0, void 0, function* () {
                const currentUser = context.CurrentUser.UserName;
                const svr = context.ExamService;
                const res = yield svr.createMarkRegister(args.input, args.acadyear, currentUser);
                return res;
            });
        },
        editMarkRegister(root, args, context) {
            return __awaiter(this, void 0, void 0, function* () {
                const currentUser = context.CurrentUser.UserName;
                const svr = context.ExamService;
                const res = yield svr.editMarkRegister(args.id, args.marksObtained, args.maxMarks, args.examName, args.classId, args.studentId, currentUser);
                return res;
            });
        },
        addStudentToRegister(root, args, context) {
            return __awaiter(this, void 0, void 0, function* () {
                const currentUser = context.CurrentUser.UserName;
                const svr = context.ExamService;
                const res = yield svr.addStudentToRegister(args.studentId, args.input, args.acadyear, currentUser);
                return res;
            });
        },
        doPromotion(root, args, context) {
            return __awaiter(this, void 0, void 0, function* () {
                const currentUser = context.CurrentUser.UserName;
                const svr = context.ExamService;
                const res = yield svr.doPromotion(args.input, currentUser);
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