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
        getDataconfig(_, args, context) {
            return __awaiter(this, void 0, void 0, function* () {
                const dataService = context.DataConfigService;
                return yield dataService.findDataConfigById(args.name);
            });
        },
        getAllDataconfigs(_, args, context) {
            return __awaiter(this, void 0, void 0, function* () {
                return yield context.DataConfigService.listDataConfig();
            });
        },
        getCaste(_, args, context) {
            return __awaiter(this, void 0, void 0, function* () {
                return yield context.DataConfigService.getCaste();
            });
        }
    },
    Mutation: {
        addDataConfig(root, args, context) {
            return __awaiter(this, void 0, void 0, function* () {
                const currentUser = context.CurrentUser.UserName;
                const res = yield context.DataConfigService.addDataConfig(args.input, currentUser);
                return res;
            });
        },
        editDataConfig(root, args, context) {
            return __awaiter(this, void 0, void 0, function* () {
                const currentUser = context.CurrentUser.UserName;
                const res = yield context.DataConfigService.editDataConfig(args.id, args.input, currentUser);
                return res;
            });
        },
        delDataConfig(root, args, context) {
            return __awaiter(this, void 0, void 0, function* () {
                const currentUser = context.CurrentUser.UserName;
                const res = yield context.DataConfigService.delDataConfig(args.id, currentUser);
                return res;
            });
        }
    }
};
//# sourceMappingURL=resolver.js.map