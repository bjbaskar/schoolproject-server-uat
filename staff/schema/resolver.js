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
        getStaff: (_, args, context) => __awaiter(this, void 0, void 0, function* () {
            return yield context.StaffService.getStaff(args.id, args.isactive);
        }),
        getAllStaff: (_, args, context) => __awaiter(this, void 0, void 0, function* () {
            return yield context.StaffService.getAllStaff(args.isactive);
        })
    },
    Mutation: {
        addStaffProfile(root, args, context) {
            return __awaiter(this, void 0, void 0, function* () {
                const currentUser = context.CurrentUser.UserName;
                const res = yield context.StaffService.addStaffProfile(args.input, currentUser);
                return res;
            });
        },
        editStaffProfile(root, args, context) {
            return __awaiter(this, void 0, void 0, function* () {
                const currentUser = context.CurrentUser.UserName;
                const res = yield context.StaffService.editStaffProfile(args.id, args.input, currentUser);
                return res;
            });
        },
        delStaffProfile(root, args, context) {
            return __awaiter(this, void 0, void 0, function* () {
                const currentUser = context.CurrentUser.UserName;
                const res = yield context.StaffService.delStaffProfile(args.id, currentUser);
                return res;
            });
        }
    }
};
//# sourceMappingURL=resolver.js.map