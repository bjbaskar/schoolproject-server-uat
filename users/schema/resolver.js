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
const apollo_server_express_1 = require("apollo-server-express");
exports.resolvers = {
    Query: {
        user(_, args, context) {
            return __awaiter(this, void 0, void 0, function* () {
                const verifyPerm = yield context.AuthService.getAuthorize(context.CurrentUser.Roles, "MASTER", "USER", "CAN_READ");
                if (!verifyPerm) {
                    throw new apollo_server_express_1.AuthenticationError("Authorization failed!");
                }
                const userService = context.userService.user(args.username);
                return userService;
            });
        },
        getUsers(_, args, context) {
            return __awaiter(this, void 0, void 0, function* () {
                const userService = context.userService.getUsers(args.classId, args.userType, args.pageNo, args.pageSize);
                return userService;
            });
        }
    },
    Mutation: {
        registerUser(root, args, context) {
            return __awaiter(this, void 0, void 0, function* () {
                const currentUser = context.CurrentUser.UserName;
                const user = yield context.userService.registerUser(args, currentUser);
                return user;
            });
        },
        login(root, args, context) {
            return __awaiter(this, void 0, void 0, function* () {
                const userAgent = context.ReqUserAgent;
                const user = yield context.userService.login(args.username, args.password, userAgent);
                return user;
            });
        },
        loginWithToken(root, args, context) {
            return __awaiter(this, void 0, void 0, function* () {
                const userAgent = context.ReqUserAgent;
                const user = yield context.userService.loginWithToken(context.CurrentUser.UserName, userAgent);
                return user;
            });
        },
        changePassword(root, args, context) {
            return __awaiter(this, void 0, void 0, function* () {
                const verifyPerm = yield context.AuthService.getAuthorize(context.CurrentUser.Roles, "MASTER", "USER", "CAN_EDIT");
                if (!verifyPerm) {
                    throw new apollo_server_express_1.AuthenticationError("Authorization failed!");
                }
                const auth = context.CurrentUser.UserId;
                const user = yield context.userService.changePassword(auth, args.newPassword);
                return user;
            });
        },
        resetPassword(root, args, context) {
            return __awaiter(this, void 0, void 0, function* () {
                const currentUser = context.CurrentUser;
                if (!currentUser) {
                    throw new Error(`authentication failed`);
                }
                const user = yield context.userService.resetPassword(currentUser, args.userId, args.password);
                return user;
            });
        },
        forgotPassword(root, args, context) {
            return __awaiter(this, void 0, void 0, function* () {
                const user = yield context.userService.registerUser(args);
                return user;
            });
        },
        updateInactive(root, args, context) {
            return __awaiter(this, void 0, void 0, function* () {
                const currentUser = context.CurrentUser.UserName;
                const user = yield context.userService.updateInactive(args.userId, currentUser);
                return user;
            });
        },
        updateUser(root, args, context) {
            return __awaiter(this, void 0, void 0, function* () {
                const user = yield context.userService.registerUser(args);
                return user;
            });
        }
    }
};
//# sourceMappingURL=resolver.js.map