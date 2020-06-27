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
        getTextBook(_, args, context) {
            return __awaiter(this, void 0, void 0, function* () {
                const subjService = context.TextBookService;
                return yield subjService.findTextBookById(args.id);
            });
        },
        getTextBooks: (_, args, context) => __awaiter(this, void 0, void 0, function* () {
            return yield context.TextBookService.listTextBooks();
        })
    },
    Mutation: {
        addTextBook(root, args, context) {
            return __awaiter(this, void 0, void 0, function* () {
                const currentUser = context.CurrentUser.UserName;
                const res = yield context.TextBookService.addTextBook(args.input, currentUser);
                return res;
            });
        },
        editTextBook(root, args, context) {
            return __awaiter(this, void 0, void 0, function* () {
                const currentUser = context.CurrentUser.UserName;
                const res = yield context.TextBookService.editTextBook(args.id, args.input, currentUser);
                return res;
            });
        },
        delTextBook(root, args, context) {
            return __awaiter(this, void 0, void 0, function* () {
                const currentUser = context.CurrentUser.UserName;
                const res = yield context.TextBookService.delTextBook(args.id, currentUser);
                return res;
            });
        }
    }
};
//# sourceMappingURL=resolver.js.map