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
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const Users_1 = require("./Users");
const Permissions_1 = require("./Permissions");
let Roles = class Roles {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn("uuid"),
    __metadata("design:type", String)
], Roles.prototype, "id", void 0);
__decorate([
    typeorm_1.Column("varchar", { length: 20, nullable: false }),
    __metadata("design:type", String)
], Roles.prototype, "rolename", void 0);
__decorate([
    typeorm_1.ManyToMany(type => Permissions_1.Permissions, perm => perm.roles),
    typeorm_1.JoinTable({
        name: "m_j_role_permission"
    }),
    __metadata("design:type", Array)
], Roles.prototype, "permissions", void 0);
__decorate([
    typeorm_1.ManyToMany(type => Users_1.Users, userroles => userroles.roles, {
        cascade: true
    }),
    __metadata("design:type", Array)
], Roles.prototype, "user", void 0);
__decorate([
    typeorm_1.Column("varchar", { nullable: false }),
    __metadata("design:type", String)
], Roles.prototype, "createdby", void 0);
__decorate([
    typeorm_1.Column("timestamp", {
        precision: 2,
        default: () => "CURRENT_TIMESTAMP(2)"
    }),
    __metadata("design:type", Date)
], Roles.prototype, "createdon", void 0);
__decorate([
    typeorm_1.Column("varchar", { nullable: true }),
    __metadata("design:type", String)
], Roles.prototype, "updatedby", void 0);
__decorate([
    typeorm_1.Column("timestamp", {
        precision: 2,
        nullable: true,
        onUpdate: "CURRENT_TIMESTAMP(2)"
    }),
    __metadata("design:type", Date)
], Roles.prototype, "updatedon", void 0);
Roles = __decorate([
    typeorm_1.Entity("m_roles")
], Roles);
exports.Roles = Roles;
//# sourceMappingURL=Roles.js.map