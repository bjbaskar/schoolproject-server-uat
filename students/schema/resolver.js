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
        getStudent(_, args, context) {
            return __awaiter(this, void 0, void 0, function* () {
                const studService = context.StudentService;
                return yield studService.getStudent(args.id);
            });
        },
        studentList: (_, args, context) => __awaiter(this, void 0, void 0, function* () {
            return yield context.StudentService.listStudents(args.pageNo, args.pageSize, args.sortCol, args.isAsc, args.filter);
        }),
        getStudentByClass(_, args, context) {
            return __awaiter(this, void 0, void 0, function* () {
                const studService = context.StudentService;
                const res = yield studService.getStudentByClass(args.classId);
                return res;
            });
        }
    },
    Mutation: {
        addNewAdmission(root, args, context) {
            return __awaiter(this, void 0, void 0, function* () {
                const currentUser = context.CurrentUser.UserName;
                const res = yield context.StudentService.addNewAdmission(args.profile, args.parents, args.address, args.class_section, currentUser);
                return res;
            });
        },
        editProfileParents(root, args, context) {
            return __awaiter(this, void 0, void 0, function* () {
                const currentUser = context.CurrentUser.UserName;
                const res = yield context.StudentService.editProfileParents(args.id, args.profile, args.parents, args.classId, currentUser);
                return res;
            });
        },
        editAddress(root, args, context) {
            return __awaiter(this, void 0, void 0, function* () {
                const currentUser = context.CurrentUser.UserName;
                return yield context.StudentService.editAddress(args.id, args.address, currentUser);
            });
        },
        studentInactive(root, args, context) {
            return __awaiter(this, void 0, void 0, function* () {
                const currentUser = context.CurrentUser.UserName;
                const res = yield context.StudentService.studentInactive(args.id, currentUser);
                return res;
            });
        }
    }
};
//# sourceMappingURL=resolver.js.map