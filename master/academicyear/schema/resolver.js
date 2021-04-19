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
        getAcadYear(_, args, context) {
            return __awaiter(this, void 0, void 0, function* () {
                const subjService = context.AcadYearService;
                return subjService.findAcadYearById(args.id);
            });
        },
        getAcadYears(_, args, context) {
            return __awaiter(this, void 0, void 0, function* () {
                return context.AcadYearService.listAcadYear();
            });
        },
        getNextAcadYear(_, args, context) {
            return __awaiter(this, void 0, void 0, function* () {
                return context.AcadYearService.getNextAcadYear();
            });
        },
        getAcadYearByCurrent(_, args, context) {
            return __awaiter(this, void 0, void 0, function* () {
                return context.AcadYearService.getAcadYearByCurrent();
            });
        }
    },
    Mutation: {
        addAcadYear(root, args, context) {
            return __awaiter(this, void 0, void 0, function* () {
                const currentUser = context.CurrentUser.UserName;
                const res = yield context.AcadYearService.addAcadYear(args.input, currentUser);
                return res;
            });
        },
        editAcadYear(root, args, context) {
            return __awaiter(this, void 0, void 0, function* () {
                const currentUser = context.CurrentUser.UserName;
                const res = yield context.AcadYearService.editAcadYear(args.id, args.input, currentUser);
                return res;
            });
        },
        delAcadYear(root, args, context) {
            return __awaiter(this, void 0, void 0, function* () {
                const currentUser = context.CurrentUser.UserName;
                const res = yield context.AcadYearService.delAcadYear(args.id, currentUser);
                return res;
            });
        }
    }
};
//# sourceMappingURL=resolver.js.map