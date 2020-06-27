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
const Permissions_1 = require("./Permissions");
const Staff_1 = require("../Staff/Staff");
const Student_1 = require("../Students/Student");
let Users = class Users {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn("uuid"),
    __metadata("design:type", String)
], Users.prototype, "id", void 0);
__decorate([
    typeorm_1.Column("varchar", { length: 20, nullable: false }),
    __metadata("design:type", String)
], Users.prototype, "username", void 0);
__decorate([
    typeorm_1.Column("varchar", { length: 255, nullable: true }),
    __metadata("design:type", String)
], Users.prototype, "email", void 0);
__decorate([
    typeorm_1.Column("text", { nullable: false }),
    __metadata("design:type", String)
], Users.prototype, "password", void 0);
__decorate([
    typeorm_1.Column("boolean", { nullable: false, default: true }),
    __metadata("design:type", Boolean)
], Users.prototype, "isactive", void 0);
__decorate([
    typeorm_1.Column("boolean", { nullable: false, default: false }),
    __metadata("design:type", Boolean)
], Users.prototype, "isadmin", void 0);
__decorate([
    typeorm_1.Column("int", { nullable: false, default: 0 }),
    __metadata("design:type", Number)
], Users.prototype, "loginattempts", void 0);
__decorate([
    typeorm_1.Column("varchar", { nullable: false, default: 0 }),
    __metadata("design:type", Number)
], Users.prototype, "lockuntil", void 0);
__decorate([
    typeorm_1.Column("int", { nullable: true, default: 0 }),
    __metadata("design:type", Number)
], Users.prototype, "passwordexpires", void 0);
__decorate([
    typeorm_1.ManyToMany(type => Roles_1.Roles, roles => roles.user),
    typeorm_1.JoinTable({
        name: "m_j_user_roles"
    }),
    __metadata("design:type", Array)
], Users.prototype, "roles", void 0);
__decorate([
    typeorm_1.OneToMany(type => Permissions_1.Permissions, perm => perm.user),
    __metadata("design:type", Array)
], Users.prototype, "permissions", void 0);
__decorate([
    typeorm_1.Column("varchar", { length: 15, nullable: false }),
    __metadata("design:type", String)
], Users.prototype, "usertype", void 0);
__decorate([
    typeorm_1.OneToOne(type => Staff_1.Staff, staff => staff.user),
    typeorm_1.JoinColumn(),
    __metadata("design:type", Staff_1.Staff)
], Users.prototype, "staff", void 0);
__decorate([
    typeorm_1.OneToOne(type => Student_1.Students, stud => stud.user),
    typeorm_1.JoinColumn(),
    __metadata("design:type", Student_1.Students)
], Users.prototype, "students", void 0);
__decorate([
    typeorm_1.Column("varchar", { length: 500, nullable: true, }),
    __metadata("design:type", String)
], Users.prototype, "notes", void 0);
__decorate([
    typeorm_1.Column("varchar", { nullable: false }),
    __metadata("design:type", String)
], Users.prototype, "createdby", void 0);
__decorate([
    typeorm_1.Column("timestamp", {
        nullable: false,
        precision: 2,
        default: () => "CURRENT_TIMESTAMP(2)"
    }),
    __metadata("design:type", Date)
], Users.prototype, "createdon", void 0);
__decorate([
    typeorm_1.Column("varchar", { nullable: true }),
    __metadata("design:type", String)
], Users.prototype, "updatedby", void 0);
__decorate([
    typeorm_1.Column("timestamp", {
        nullable: true,
        precision: 2,
        onUpdate: "CURRENT_TIMESTAMP(2)"
    }),
    __metadata("design:type", Date)
], Users.prototype, "updatedon", void 0);
Users = __decorate([
    typeorm_1.Entity("m_users"),
    typeorm_1.Unique(["username"])
], Users);
exports.Users = Users;
//# sourceMappingURL=Users.js.map