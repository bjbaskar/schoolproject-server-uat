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
        roleFind(_, args, context) {
            return __awaiter(this, void 0, void 0, function* () {
                const roleSvc = yield context.UserRoleService.roleFind(args.id);
                return roleSvc;
            });
        },
        roleList: (_, args, context) => __awaiter(this, void 0, void 0, function* () {
            const roleSvc = yield context.UserRoleService.roleList();
            return roleSvc;
        }),
        permFind(_, args, context) {
            return __awaiter(this, void 0, void 0, function* () {
                const roleSvc = yield context.UserRoleService.permFind(args.id);
                return roleSvc;
            });
        },
        permList: (_, args, context) => __awaiter(this, void 0, void 0, function* () {
            const roleSvc = yield context.UserRoleService.permList();
            return roleSvc;
        }),
        rolePermList(_, args, context) {
            return __awaiter(this, void 0, void 0, function* () {
                const roleSvc = yield context.UserRoleService.rolePermList(args.roleId);
                return roleSvc;
            });
        },
        userRolesList(_, args, context) {
            return __awaiter(this, void 0, void 0, function* () {
                const roleSvc = yield context.UserRoleService.userRolesList(args.userId);
                return roleSvc;
            });
        },
    },
    Mutation: {
        roleAdd(root, args, context) {
            return __awaiter(this, void 0, void 0, function* () {
                const role = yield context.UserRoleService.roleAdd(args.role);
                return role;
            });
        },
        roleEdit(root, args, context) {
            return __awaiter(this, void 0, void 0, function* () {
                const role = yield context.UserRoleService.roleEdit(args.id, args.role);
                return role;
            });
        },
        roleDelete(root, args, context) {
            return __awaiter(this, void 0, void 0, function* () {
                const role = yield context.UserRoleService.roleDelete(args.id);
                return role;
            });
        },
        permAddToRole(root, args, context) {
            return __awaiter(this, void 0, void 0, function* () {
                const role = yield context.UserRoleService.permAddToRole(args.roleId, args.permIds);
                return role;
            });
        },
        rolesAddToUser(root, args, context) {
            return __awaiter(this, void 0, void 0, function* () {
                const userRoles = yield context.UserRoleService.rolesAddToUser(args.userId, args.roleIds);
                return userRoles;
            });
        }
    }
};
//# sourceMappingURL=resolver.js.map