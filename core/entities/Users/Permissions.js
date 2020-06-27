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
const Roles_1 = require("./Roles");
const Users_1 = require("./Users");
let Permissions = class Permissions {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn("uuid"),
    __metadata("design:type", String)
], Permissions.prototype, "id", void 0);
__decorate([
    typeorm_1.Column("varchar", { length: 20, nullable: false }),
    __metadata("design:type", String)
], Permissions.prototype, "module", void 0);
__decorate([
    typeorm_1.Column("varchar", { length: 20, nullable: false }),
    __metadata("design:type", String)
], Permissions.prototype, "title", void 0);
__decorate([
    typeorm_1.Column("varchar", { length: 20, nullable: false }),
    __metadata("design:type", String)
], Permissions.prototype, "key", void 0);
__decorate([
    typeorm_1.ManyToMany(type => Roles_1.Roles, roles => roles.permissions, {
        cascade: true
    }),
    __metadata("design:type", Array)
], Permissions.prototype, "roles", void 0);
__decorate([
    typeorm_1.ManyToOne(type => Users_1.Users, userroles => userroles.permissions),
    __metadata("design:type", Users_1.Users)
], Permissions.prototype, "user", void 0);
__decorate([
    typeorm_1.Column("varchar", {
        nullable: false,
        default: "SYSTEM"
    }),
    __metadata("design:type", String)
], Permissions.prototype, "createdby", void 0);
__decorate([
    typeorm_1.Column("timestamp", {
        precision: 2,
        default: () => "CURRENT_TIMESTAMP(2)"
    }),
    __metadata("design:type", Date)
], Permissions.prototype, "createdon", void 0);
__decorate([
    typeorm_1.Column("varchar", { nullable: true }),
    __metadata("design:type", String)
], Permissions.prototype, "updatedby", void 0);
__decorate([
    typeorm_1.Column("timestamp", {
        precision: 2,
        default: () => "CURRENT_TIMESTAMP(2)",
        onUpdate: "CURRENT_TIMESTAMP(2)"
    }),
    __metadata("design:type", Date)
], Permissions.prototype, "updatedon", void 0);
Permissions = __decorate([
    typeorm_1.Entity("m_permissions")
], Permissions);
exports.Permissions = Permissions;
//# sourceMappingURL=Permissions.js.map