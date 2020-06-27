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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = require("inversify");
const typeorm_1 = require("typeorm");
const exceptions_1 = require("../core/exceptions");
const Roles_1 = require("../core/entities/Users/Roles");
const Permissions_1 = require("../core/entities/Users/Permissions");
const Users_1 = require("../core/entities/Users/Users");
let UserRoleService = class UserRoleService {
    constructor() { }
    roleAdd(role) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const roleEntity = Object.assign(new Roles_1.Roles(), role);
                roleEntity.createdby = "bb";
                const res = yield typeorm_1.getManager().getRepository(Roles_1.Roles)
                    .save(roleEntity);
                return res;
            }
            catch (error) {
                throw new exceptions_1.InternalServerError("Unhandled Error", error);
            }
        });
    }
    roleEdit(id, role) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const roleEntity = Object.assign(new Roles_1.Roles(), role);
                roleEntity.updatedby = "bb";
                const res = yield typeorm_1.getManager()
                    .getRepository(Roles_1.Roles)
                    .update(id, roleEntity);
                return yield this.findRolesById(id);
            }
            catch (error) {
                throw new exceptions_1.InternalServerError("Unhandled Error", error);
            }
        });
    }
    roleDelete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const res = yield typeorm_1.getManager()
                    .createQueryBuilder()
                    .delete()
                    .from(Roles_1.Roles)
                    .where("id = :id", { id: id })
                    .execute();
                if (res.affected >= 1) {
                    return { Messages: "Deleted successfully" };
                }
                else {
                    return { Messages: "No Records Deleted" };
                }
            }
            catch (error) {
                throw new exceptions_1.InternalServerError("Unhandled Error", error);
            }
        });
    }
    roleList() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const roles = yield typeorm_1.getManager()
                    .getRepository(Roles_1.Roles)
                    .createQueryBuilder("roles")
                    .getMany();
                return roles;
            }
            catch (error) {
                throw new exceptions_1.InternalServerError("Error", error);
            }
        });
    }
    roleFind(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return this.findRolesById(id);
            }
            catch (error) {
                throw new exceptions_1.InternalServerError("Error", error);
            }
        });
    }
    permAddToRole(roleId, permIds) {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = typeorm_1.getConnection();
            const queryRunner = connection.createQueryRunner();
            try {
                yield queryRunner.connect();
                yield queryRunner.startTransaction();
                permIds.map((p) => __awaiter(this, void 0, void 0, function* () {
                    return yield queryRunner.manager
                        .createQueryBuilder()
                        .relation(Roles_1.Roles, "permissions")
                        .of(roleId)
                        .add(p)
                        .catch(error => {
                        throw new exceptions_1.NotFound("Unable to save Role & Permissions", error);
                    });
                }));
                yield queryRunner.commitTransaction();
                return {
                    Messages: "Role & Permissions saved successfully"
                };
            }
            catch (error) {
                yield queryRunner.rollbackTransaction();
                throw new exceptions_1.InternalServerError("Unhandled Error: Unable to save", error);
            }
            finally {
                yield queryRunner.release();
            }
        });
    }
    rolesAddToUser(userId, roleIds) {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = typeorm_1.getConnection();
            const queryRunner = connection.createQueryRunner();
            try {
                yield queryRunner.connect();
                yield queryRunner.startTransaction();
                try {
                    const getRoleIds = yield queryRunner.manager
                        .getRepository(Users_1.Users)
                        .createQueryBuilder("users")
                        .relation(Users_1.Users, "roles")
                        .of(userId).loadMany();
                    const delRoleIds = getRoleIds.map(d => d.id);
                    yield queryRunner.manager
                        .createQueryBuilder()
                        .relation(Users_1.Users, "roles")
                        .of(userId)
                        .remove(delRoleIds)
                        .catch(error => {
                        throw new exceptions_1.NotFound("Unable to remove UserRoles", error);
                    });
                    yield queryRunner.manager
                        .createQueryBuilder()
                        .relation(Users_1.Users, "roles")
                        .of(userId)
                        .add(roleIds)
                        .catch(error => {
                        throw new exceptions_1.NotFound("Unable to save User & Roles", error);
                    });
                }
                catch (error) {
                    throw new exceptions_1.InternalServerError("UserRoles Delete Error:", error);
                }
                yield queryRunner.commitTransaction();
                return {
                    Messages: "Roles are assinged to the user successfully"
                };
            }
            catch (error) {
                yield queryRunner.rollbackTransaction();
                throw new exceptions_1.InternalServerError("Error: Unable to save", error);
            }
            finally {
                yield queryRunner.release();
            }
        });
    }
    permList() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const roles = yield typeorm_1.getManager()
                    .getRepository(Permissions_1.Permissions)
                    .createQueryBuilder("perm")
                    .getMany();
                return roles;
            }
            catch (error) {
                throw new exceptions_1.InternalServerError("Error", error);
            }
        });
    }
    permFind(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield typeorm_1.getManager()
                    .getRepository(Permissions_1.Permissions)
                    .findOne({ where: { id: id } });
            }
            catch (error) {
                throw new exceptions_1.InternalServerError("Error", error);
            }
        });
    }
    rolePermList(roleId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const roles = yield typeorm_1.getManager()
                    .getRepository(Roles_1.Roles)
                    .createQueryBuilder("roles")
                    .leftJoinAndSelect("roles.permissions", "permissions")
                    .where("roles.id = :value", { value: roleId })
                    .getOne();
                return roles;
            }
            catch (error) {
                throw new exceptions_1.NotFound(`Roles not found. Please change the search criteria`);
            }
        });
    }
    userRolesList(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const roles = yield typeorm_1.getManager()
                    .getRepository(Users_1.Users)
                    .createQueryBuilder("user")
                    .leftJoinAndSelect("user.roles", "roles")
                    .leftJoinAndSelect("roles.permissions", "permissions")
                    .where("user.id = :value", { value: userId })
                    .getOne();
                return roles;
            }
            catch (error) {
                throw new exceptions_1.NotFound(`Roles not found. Please change the search criteria`);
            }
        });
    }
    findRolesById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield typeorm_1.getManager()
                    .getRepository(Roles_1.Roles)
                    .findOne({ where: { id: id } });
            }
            catch (error) {
                throw new exceptions_1.InternalServerError("Error", error);
            }
        });
    }
    addPermissions() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const res = yield typeorm_1.getManager()
                    .createQueryBuilder()
                    .insert().into(Permissions_1.Permissions)
                    .values([
                    { module: "MASTER", title: "USER", key: "CAN_ADD" },
                    { module: "MASTER", title: "USER", key: "CAN_EDIT" },
                    { module: "MASTER", title: "USER", key: "CAN_DEL" },
                    { module: "MASTER", title: "USER", key: "CAN_READ" },
                    { module: "MASTER", title: "USER", key: "CAN_VIEW" },
                    { module: "MASTER", title: "ClassSection", key: "CAN_ADD" },
                    { module: "MASTER", title: "ClassSection", key: "CAN_EDIT" },
                    { module: "MASTER", title: "ClassSection", key: "CAN_DEL" },
                    { module: "MASTER", title: "ClassSection", key: "CAN_READ" },
                    { module: "MASTER", title: "ClassSection", key: "CAN_VIEW" },
                    { module: "MASTER", title: "Subject", key: "CAN_ADD" },
                    { module: "MASTER", title: "Subject", key: "CAN_EDIT" },
                    { module: "MASTER", title: "Subject", key: "CAN_DEL" },
                    { module: "MASTER", title: "Subject", key: "CAN_READ" },
                    { module: "MASTER", title: "Subject", key: "CAN_VIEW" },
                    { module: "MASTER", title: "DConfig", key: "CAN_ADD" },
                    { module: "MASTER", title: "DConfig", key: "CAN_EDIT" },
                    { module: "MASTER", title: "DConfig", key: "CAN_DEL" },
                    { module: "MASTER", title: "DConfig", key: "CAN_READ" },
                    { module: "MASTER", title: "DConfig", key: "CAN_VIEW" },
                    { module: "MASTER", title: "AcadYear", key: "CAN_ADD" },
                    { module: "MASTER", title: "AcadYear", key: "CAN_EDIT" },
                    { module: "MASTER", title: "AcadYear", key: "CAN_DEL" },
                    { module: "MASTER", title: "AcadYear", key: "CAN_READ" },
                    { module: "MASTER", title: "AcadYear", key: "CAN_VIEW" },
                    { module: "MASTER", title: "HOLIDAY", key: "CAN_ADD" },
                    { module: "MASTER", title: "HOLIDAY", key: "CAN_EDIT" },
                    { module: "MASTER", title: "HOLIDAY", key: "CAN_DEL" },
                    { module: "MASTER", title: "HOLIDAY", key: "CAN_READ" },
                    { module: "MASTER", title: "HOLIDAY", key: "CAN_VIEW" },
                    { module: "STUDENT", title: "Profile", key: "CAN_ADD" },
                    { module: "STUDENT", title: "Profile", key: "CAN_EDIT" },
                    { module: "STUDENT", title: "Profile", key: "CAN_DEL" },
                    { module: "STUDENT", title: "Profile", key: "CAN_READ" },
                    { module: "STUDENT", title: "Profile", key: "CAN_VIEW" },
                    { module: "STAFF", title: "Profile", key: "CAN_ADD" },
                    { module: "STAFF", title: "Profile", key: "CAN_EDIT" },
                    { module: "STAFF", title: "Profile", key: "CAN_DEL" },
                    { module: "STAFF", title: "Profile", key: "CAN_READ" },
                    { module: "STAFF", title: "Profile", key: "CAN_VIEW" },
                    { module: "EXAM", title: "Profile", key: "CAN_ADD" },
                    { module: "EXAM", title: "Profile", key: "CAN_EDIT" },
                    { module: "EXAM", title: "Profile", key: "CAN_DEL" },
                    { module: "EXAM", title: "Profile", key: "CAN_READ" },
                    { module: "EXAM", title: "Profile", key: "CAN_VIEW" },
                    { module: "PROMOTION", title: "Profile", key: "CAN_ADD" },
                    { module: "PROMOTION", title: "Profile", key: "CAN_EDIT" },
                    { module: "PROMOTION", title: "Profile", key: "CAN_DEL" },
                    { module: "PROMOTION", title: "Profile", key: "CAN_READ" },
                    { module: "PROMOTION", title: "Profile", key: "CAN_VIEW" },
                ])
                    .execute();
                return res;
            }
            catch (error) {
                throw new exceptions_1.InternalServerError("Unhandled Error", error);
            }
        });
    }
};
UserRoleService = __decorate([
    inversify_1.injectable(),
    __metadata("design:paramtypes", [])
], UserRoleService);
exports.UserRoleService = UserRoleService;
//# sourceMappingURL=UserRoleService.js.map