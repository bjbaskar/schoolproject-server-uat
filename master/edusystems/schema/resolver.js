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
        getEduSystem(_, args, context) {
            return __awaiter(this, void 0, void 0, function* () {
                const res = context.EduSystemService;
                return res.findEduSystemById(args.id);
            });
        },
        getEduSystems(_, args, context) {
            return __awaiter(this, void 0, void 0, function* () {
                return context.EduSystemService.listEduSystem();
            });
        }
    },
    Mutation: {
        addEduSystem(root, args, context) {
            return __awaiter(this, void 0, void 0, function* () {
                const currentUser = context.CurrentUser.UserName;
                const res = yield context.EduSystemService.addEduSystem(args.input, currentUser);
                return res;
            });
        },
        editEduSystem(root, args, context) {
            return __awaiter(this, void 0, void 0, function* () {
                const currentUser = context.CurrentUser.UserName;
                const res = yield context.EduSystemService.editEduSystem(args.id, args.input, currentUser);
                return res;
            });
        },
        delEduSystem(root, args, context) {
            return __awaiter(this, void 0, void 0, function* () {
                const currentUser = context.CurrentUser.UserName;
                const res = yield context.EduSystemService.delEduSystem(args.id, currentUser);
                return res;
            });
        }
    }
};
//# sourceMappingURL=resolver.js.map