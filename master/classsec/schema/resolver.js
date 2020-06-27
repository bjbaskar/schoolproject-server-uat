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
        getClass(_, args, context) {
            return __awaiter(this, void 0, void 0, function* () {
                const subjService = context.ClassService;
                return subjService.findClassSecById(args.id);
            });
        },
        getAllClass: (_, args, context) => __awaiter(this, void 0, void 0, function* () {
            return context.ClassService.getAllClass();
        })
    },
    Mutation: {
        addClassSection(root, args, context) {
            return __awaiter(this, void 0, void 0, function* () {
                const currentUser = context.CurrentUser.UserName;
                const res = yield context.ClassService.addClassSec(args.input, args.subjectIds, currentUser);
                return res;
            });
        },
        editClassSection(root, args, context) {
            return __awaiter(this, void 0, void 0, function* () {
                const currentUser = context.CurrentUser.UserName;
                const res = yield context.ClassService.editClassSec(args.id, args.input, args.subjectIds, currentUser);
                return res;
            });
        },
        delClassSection(root, args, context) {
            return __awaiter(this, void 0, void 0, function* () {
                const res = yield context.ClassService.delClassSec(args.id);
                return res;
            });
        },
        addStaffToClass(root, args, context) {
            return __awaiter(this, void 0, void 0, function* () {
                const currentUser = context.CurrentUser.UserName;
                const res = yield context.ClassService.addStaffToClass(args.id, args.input, currentUser);
                return res;
            });
        }
    }
};
//# sourceMappingURL=resolver.js.map