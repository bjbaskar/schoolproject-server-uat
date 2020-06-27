"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const typeorm_1 = require("typeorm");
const inversify_1 = require("inversify");
const InversifyTypes_1 = require("../core/config/InversifyTypes");
const AbstractSetting_1 = require("../core/config/AbstractSetting");
const Users_1 = require("../core/entities/Users/Users");
const exceptions_1 = require("../core/exceptions");
let AuthService = class AuthService {
    constructor(setting) {
        this.setting = setting;
        this.getAuthUser = (req) => __awaiter(this, void 0, void 0, function* () {
            const token = req.headers["authorization"] || "";
            const secret = this.setting.config.server.jwt_secret;
            let userType = "";
            let userFound = undefined;
            if (token) {
                try {
                    if (token === "LOGIN") {
                        const currentUser = {
                            UserId: undefined,
                            UserName: undefined,
                            UserType: "LOGIN",
                            Student: undefined,
                            Staff: undefined,
                            Roles: undefined
                        };
                        return currentUser;
                    }
                    const tokenValue = token.replace("Bearer ", "");
                    const verificationRes = (yield jsonwebtoken_1.default.verify(tokenValue, secret));
                    const userName = verificationRes.username;
                    const checkUser = yield typeorm_1.getManager()
                        .getRepository(Users_1.Users)
                        .findOne({ where: { username: userName } });
                    if (checkUser) {
                        userType = checkUser.usertype;
                        if (userType.toUpperCase() === "STUDENT") {
                            userFound = yield typeorm_1.getManager()
                                .getRepository(Users_1.Users)
                                .createQueryBuilder("user")
                                .leftJoinAndSelect("user.students", "students")
                                .leftJoinAndSelect("user.roles", "roles")
                                .leftJoinAndSelect("roles.permissions", "permissions")
                                .where("user.username = :username", { username: userName })
                                .andWhere("user.isactive = true")
                                .getOne();
                        }
                        else {
                            userFound = yield typeorm_1.getManager()
                                .getRepository(Users_1.Users)
                                .createQueryBuilder("user")
                                .leftJoinAndSelect("user.staff", "staff")
                                .leftJoinAndSelect("user.roles", "roles")
                                .leftJoinAndSelect("roles.permissions", "permissions")
                                .where("user.username = :username", { username: userName })
                                .andWhere("user.isactive = true")
                                .getOne();
                        }
                    }
                    if (!userFound) {
                        throw new exceptions_1.Unauthorized(`User not found`);
                    }
                    const currentUser = {
                        UserId: userFound.id,
                        UserName: userFound.username,
                        UserType: userFound.usertype,
                        Student: userFound.students,
                        Staff: userFound.staff,
                        Roles: Object.assign([], userFound.roles)
                    };
                    return currentUser;
                }
                catch (error) {
                    throw new exceptions_1.Unauthorized(`Your session expired. Sign in again. ${error}`);
                }
            }
            else {
                throw new exceptions_1.Unauthorized(`User token not found.`);
            }
        });
        this.getAuthorize = (Roles, moduleName, title, key) => {
            let verifyPerm = false;
            Roles.map((p) => __awaiter(this, void 0, void 0, function* () {
                return p.permissions.filter(pp => {
                    if (pp.module === moduleName &&
                        pp.title === title &&
                        pp.key === key) {
                        verifyPerm = true;
                    }
                });
            }));
            return verifyPerm;
        };
    }
};
AuthService = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(InversifyTypes_1.TYPES.Setting)),
    __metadata("design:paramtypes", [AbstractSetting_1.AbstractSetting])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=AuthService.js.map