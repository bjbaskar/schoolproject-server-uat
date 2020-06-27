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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = require("inversify");
const typeorm_1 = require("typeorm");
const bcrypt = __importStar(require("bcrypt"));
const jwt = __importStar(require("jsonwebtoken"));
const AbstractSetting_1 = require("../core/config/AbstractSetting");
const InversifyTypes_1 = require("../core/config/InversifyTypes");
const Users_1 = require("../core/entities/Users/Users");
const exceptions_1 = require("../core/exceptions");
const LoginHistory_1 = require("../core/entities/Users/LoginHistory");
const parser = __importStar(require("ua-parser-js"));
let UserService = class UserService {
    constructor(settings) {
        this.settings = settings;
    }
    registerUser(user, currentUser) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                    const userFound = yield this.isUserFound(user.username);
                    if (userFound) {
                        reject("UserName already exists");
                    }
                    else {
                        const userEntity = Object.assign(new Users_1.Users(), user);
                        userEntity.createdby = currentUser;
                        const password = user.password;
                        this.hashPassword(password, (err, passwordHashed) => __awaiter(this, void 0, void 0, function* () {
                            if (err) {
                                reject(`Error: HashPassword ${err}`);
                            }
                            else {
                                userEntity.password = passwordHashed;
                                if (user.usertype.toUpperCase() === "STUDENT") {
                                    userEntity.staff = undefined;
                                }
                                else {
                                    userEntity.students = undefined;
                                }
                                yield typeorm_1.getManager()
                                    .getRepository(Users_1.Users)
                                    .save(userEntity)
                                    .then(resUser => {
                                    return resolve(resUser);
                                })
                                    .catch(err => {
                                    return reject(new exceptions_1.BadRequest("Student or Staff mapping not match. please select Student or Staff", err));
                                });
                            }
                        }));
                    }
                }));
            }
            catch (error) {
                throw new exceptions_1.InternalServerError("Error:", error);
            }
        });
    }
    login(usrname, password, userAgent) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            if (!usrname && password) {
                reject(new exceptions_1.Unauthorized(`Please enter UserName and Password!`));
            }
            const userFound = yield this.isUserFound(usrname);
            if (!userFound) {
                reject(new exceptions_1.Unauthorized(`${usrname} ${"User not found."}`));
            }
            else {
                if (this.isLocked(userFound)) {
                    return this.incLoginAttempts(userFound)
                        .then(data => {
                        reject(new exceptions_1.Unauthorized(data));
                    })
                        .catch(error => {
                        reject(new exceptions_1.Unauthorized(error));
                    });
                }
                const userPassword = userFound.password;
                this.comparePassword(password, userPassword, (error, isMatch) => __awaiter(this, void 0, void 0, function* () {
                    if (isMatch) {
                        if (!userFound.loginattempts && !Number(userFound.lockuntil)) {
                            const getAuthToken = yield this.getToken(userFound, userAgent);
                            return resolve({ token: getAuthToken, user: userFound });
                        }
                        yield typeorm_1.getManager()
                            .getRepository(Users_1.Users)
                            .createQueryBuilder()
                            .update(Users_1.Users)
                            .set({ lockuntil: 0, loginattempts: 0 })
                            .where("id = :id", { id: userFound.id })
                            .andWhere("isactive = true")
                            .execute();
                        const getAuthToken = yield this.getToken(userFound, userAgent);
                        return resolve({ token: getAuthToken, user: userFound });
                    }
                    else {
                        return this.incLoginAttempts(userFound)
                            .then(data => {
                            reject(new exceptions_1.Unauthorized(data));
                        })
                            .catch(error => {
                            reject(new exceptions_1.Unauthorized(error));
                        });
                    }
                }));
            }
        }));
    }
    loginWithToken(userName, userAgent) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                const userFound = yield this.isUserFound(userName);
                const getAuthToken = yield this.getToken(userFound, userAgent);
                return resolve({ token: getAuthToken, user: userFound });
            }
            catch (error) {
                reject(error);
            }
        }));
    }
    changePassword(userId, newPassword) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            if (!userId) {
                reject(new Error(`Please enter Password and New Password!`));
            }
            const password = newPassword;
            this.hashPassword(password, (err, passwordHashed) => __awaiter(this, void 0, void 0, function* () {
                if (err) {
                    reject(new Error(`HashPassword ${err}`));
                }
                else {
                    const res = yield typeorm_1.getManager()
                        .getRepository(Users_1.Users)
                        .createQueryBuilder()
                        .update(Users_1.Users)
                        .set({ password: passwordHashed })
                        .where("id = :id", { id: userId })
                        .execute();
                    resolve({ Messages: "Password changed successfully" });
                }
            }));
        }));
    }
    forgotPassword(usrname, password) {
        return undefined;
    }
    resetPassword(userAdmin, userId, newPassword) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            if (!userAdmin.UserName || !userId || !newPassword) {
                reject(new Error(`ERROR: Please enter Username and New Password!`));
            }
            const userAdminFound = yield this.isUserFound(userAdmin.UserName);
            if (userAdminFound.isadmin) {
                const password = newPassword;
                this.hashPassword(password, (err, passwordHashed) => __awaiter(this, void 0, void 0, function* () {
                    if (err) {
                        reject(new Error(`Error: HashPassword ${err}`));
                    }
                    else {
                        const res = yield typeorm_1.getManager()
                            .getRepository(Users_1.Users)
                            .createQueryBuilder()
                            .update(Users_1.Users)
                            .set({ password: passwordHashed })
                            .where("id = :id", { id: userId })
                            .execute();
                        resolve({ Messages: "Password reset successfully" });
                    }
                }));
            }
            else {
                reject(new Error(`ERROR: Only Admin can reset the password of the selected user!`));
            }
        }));
    }
    getUsers(classId, userType, pageNo, pageSize) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const currenPageNo = pageNo === 1 ? 0 : pageNo - 1;
                const qb = typeorm_1.getManager()
                    .getRepository(Users_1.Users)
                    .createQueryBuilder("user")
                    .leftJoinAndSelect("user.roles", "roles")
                    .leftJoinAndSelect("roles.permissions", "permissions");
                if (userType === "student" && classId) {
                    qb.leftJoinAndSelect("user.students", "students")
                        .leftJoinAndSelect("students.classsec", "classsec");
                }
                else {
                    qb.leftJoinAndSelect("user.staff", "staff");
                }
                qb.where("user.isactive = true")
                    .andWhere("user.usertype = :usertype", { usertype: userType });
                if (userType === "student" && classId !== "ALL") {
                    qb.andWhere("classsec.id = :classId", { classId: classId })
                        .orderBy("students.firstname", "ASC");
                }
                qb.skip(currenPageNo * pageSize)
                    .take(pageSize);
                const allUsers = {
                    data: yield qb.getMany(),
                    count: yield qb.getCount()
                };
                return allUsers;
            }
            catch (error) {
                throw error;
            }
        });
    }
    updateInactive(userId, currentUser) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const usr = new Users_1.Users();
                usr.updatedby = currentUser;
                usr.isactive = false;
                const res = yield typeorm_1.getManager()
                    .getRepository(Users_1.Users)
                    .update(userId, usr);
                if (res) {
                    return { Messages: "User has been removed successfully." };
                }
                else {
                    return res;
                }
            }
            catch (error) {
                throw new exceptions_1.InternalServerError("updateInactive Error", error);
            }
        });
    }
    user(username) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const allUsers = yield typeorm_1.getManager()
                    .getRepository(Users_1.Users)
                    .find({
                    where: [
                        { username: typeorm_1.Like(`%${username}%`) },
                        { username: typeorm_1.Like(`%${username}%`) }
                    ]
                })
                    .then(res => res)
                    .catch(error => { throw new exceptions_1.NotFound(`Users not found. ${error}`); });
                return allUsers;
            }
            catch (error) {
                throw error;
            }
        });
    }
    isUserFound(userName) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let userType = "";
                let userFound = undefined;
                const checkUser = yield typeorm_1.getManager()
                    .getRepository(Users_1.Users)
                    .findOne({ where: [{ username: userName, isactive: true }] });
                if (checkUser) {
                    userType = checkUser.usertype;
                    if (userType.toUpperCase() === "STUDENT") {
                        userFound = yield typeorm_1.getManager()
                            .getRepository(Users_1.Users)
                            .createQueryBuilder("user")
                            .leftJoinAndSelect("user.students", "students")
                            .leftJoinAndSelect("user.roles", "roles")
                            .leftJoinAndSelect("roles.permissions", "permissions")
                            .leftJoinAndSelect("students.classsec", "classsec")
                            .where("user.id = :id", { id: checkUser.id })
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
                            .where("user.id = :id", { id: checkUser.id })
                            .andWhere("user.isactive = true")
                            .getOne();
                    }
                }
                return userFound;
            }
            catch (error) {
                throw new Error(`UnHandledError: ${error}`);
            }
        });
    }
    incLoginAttempts(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const MAX_LOGIN_ATTEMPTS = this.settings.config.server.max_login_attempts;
            const LOCK_TIME = this.settings.config.server.lock_time;
            if (Number(user.lockuntil) < Date.now() &&
                user.loginattempts === MAX_LOGIN_ATTEMPTS) {
                yield typeorm_1.getManager()
                    .getRepository(Users_1.Users)
                    .createQueryBuilder()
                    .update(Users_1.Users)
                    .set({ loginattempts: 1, lockuntil: 0 })
                    .where("id = :id", { id: user.id })
                    .execute();
                return "Username or Password is not correct.";
            }
            const loginAttempt = user.loginattempts + 1;
            if (loginAttempt - 1 === MAX_LOGIN_ATTEMPTS) {
                return "The maximum number of login attempts has been reached. Please try again in 5 minutes.";
            }
            if (loginAttempt >= MAX_LOGIN_ATTEMPTS && !this.isLocked(user)) {
                const lockUntil = Date.now() + LOCK_TIME;
                yield typeorm_1.getManager()
                    .getRepository(Users_1.Users)
                    .createQueryBuilder()
                    .update(Users_1.Users)
                    .set({ lockuntil: lockUntil, loginattempts: loginAttempt })
                    .where("id = :id", { id: user.id })
                    .execute();
                return "The maximum number of login attempts has been reached. Please try again in 5 minutes.";
            }
            yield typeorm_1.getManager()
                .getRepository(Users_1.Users)
                .createQueryBuilder()
                .update(Users_1.Users)
                .set({ loginattempts: loginAttempt })
                .where("id = :id", { id: user.id })
                .execute();
            return "Username or Password is not correct.";
        });
    }
    isLocked(user) {
        return !!(user.lockuntil && Number(user.lockuntil) > Date.now());
    }
    getToken(user, userAgent) {
        return __awaiter(this, void 0, void 0, function* () {
            const tokenData = yield this.createToken(user);
            if (tokenData && tokenData.token) {
                const usrAgent = this.parseUserAgent(userAgent);
                const loginHis = new LoginHistory_1.LoginHistory();
                loginHis.username = user.username;
                if (usrAgent.Browser && usrAgent.Browser.name) {
                    loginHis.browser = usrAgent.Browser.name || "";
                }
                if (usrAgent.CPU && usrAgent.CPU.architecture) {
                    loginHis.cpu = usrAgent.CPU.architecture || "";
                }
                if (usrAgent.Device) {
                    let vendor = "";
                    let model = "";
                    if (usrAgent.Device.vendor) {
                        vendor = usrAgent.Device.vendor;
                    }
                    if (usrAgent.Device.model) {
                        model = usrAgent.Device.model;
                    }
                    loginHis.device = vendor + " - " + model;
                }
                if (usrAgent.Engine && usrAgent.Engine.name) {
                    loginHis.engine = usrAgent.Engine.name || "";
                }
                if (usrAgent.OS) {
                    let os = "";
                    let ver = "";
                    if (usrAgent.OS.name) {
                        os = usrAgent.OS.name;
                    }
                    if (usrAgent.OS.version) {
                        ver = " - " + usrAgent.OS.version;
                    }
                    loginHis.os = os + ver;
                }
                typeorm_1.getManager()
                    .getRepository(LoginHistory_1.LoginHistory)
                    .save(loginHis)
                    .then(resUser => {
                    return (resUser);
                })
                    .catch(err => {
                });
            }
            return tokenData.token;
        });
    }
    createToken(user) {
        return __awaiter(this, void 0, void 0, function* () {
            user.password = undefined;
            const expiresIn = this.settings.config.server.token_expires_in;
            const secret = this.settings.config.server.jwt_secret;
            const dataStoredInToken = {
                username: user.username,
                usertype: user.usertype,
                id: user.usertype.toUpperCase() === "STUDENT" ? user.students.id : user.staff.id
            };
            const jwtToken = yield jwt.sign(dataStoredInToken, secret, { expiresIn });
            return {
                expiresIn,
                token: jwtToken
            };
        });
    }
    hashPassword(password, callback) {
        const saltRounds = 10;
        bcrypt.hash(password, saltRounds, (error, hash) => {
            callback(error, hash);
        });
    }
    comparePassword(password, passwordHash, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            yield bcrypt.compare(password, passwordHash, (err, match) => {
                if (match) {
                    callback(undefined, true);
                }
                else {
                    callback(`Invalid password match ${err}`, undefined);
                }
            });
        });
    }
    parseUserAgent(ua) {
        try {
            const data = {};
            const res = new parser.UAParser(ua);
            data.Browser = res.getBrowser() || "";
            data.CPU = res.getCPU() || "";
            data.Device = res.getDevice() || "";
            data.Engine = res.getEngine() || "";
            data.OS = res.getOS() || "";
            return data;
        }
        catch (error) {
        }
    }
};
UserService = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(InversifyTypes_1.TYPES.Setting)),
    __metadata("design:paramtypes", [AbstractSetting_1.AbstractSetting])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=UserService.js.map