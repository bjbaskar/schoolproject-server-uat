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
const Users_1 = require("../Users/Users");
const ClassSections_1 = require("../Master/ClassSections");
const DocsPhotos_1 = require("../DocsPhotos/DocsPhotos");
const ClassTeacher_1 = require("../Master/ClassTeacher");
let Staff = class Staff {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn("uuid"),
    __metadata("design:type", String)
], Staff.prototype, "id", void 0);
__decorate([
    typeorm_1.Column("int", { nullable: false }),
    __metadata("design:type", String)
], Staff.prototype, "staffno", void 0);
__decorate([
    typeorm_1.Column("int", { nullable: false }),
    __metadata("design:type", Number)
], Staff.prototype, "prefixyear", void 0);
__decorate([
    typeorm_1.Column("varchar", { length: 50 }),
    __metadata("design:type", String)
], Staff.prototype, "aadhaarno", void 0);
__decorate([
    typeorm_1.Column("varchar", { length: 50, nullable: false }),
    __metadata("design:type", String)
], Staff.prototype, "firstname", void 0);
__decorate([
    typeorm_1.Column("varchar", { length: 50, nullable: false }),
    __metadata("design:type", String)
], Staff.prototype, "lastname", void 0);
__decorate([
    typeorm_1.Column("varchar", { length: 6, nullable: false }),
    __metadata("design:type", String)
], Staff.prototype, "gender", void 0);
__decorate([
    typeorm_1.Column("varchar", { length: 25, nullable: false }),
    __metadata("design:type", String)
], Staff.prototype, "designation", void 0);
__decorate([
    typeorm_1.Column("timestamp", { nullable: false }),
    __metadata("design:type", Date)
], Staff.prototype, "dob", void 0);
__decorate([
    typeorm_1.Column("timestamp", {
        nullable: false,
        precision: 2,
        default: () => "CURRENT_TIMESTAMP(2)"
    }),
    __metadata("design:type", Date)
], Staff.prototype, "doj", void 0);
__decorate([
    typeorm_1.Column("varchar", {
        length: 20,
        default: "Indian"
    }),
    __metadata("design:type", String)
], Staff.prototype, "nationality", void 0);
__decorate([
    typeorm_1.Column("varchar", {
        length: 30,
        default: "Hindu"
    }),
    __metadata("design:type", String)
], Staff.prototype, "religion", void 0);
__decorate([
    typeorm_1.Column("varchar", { length: 50 }),
    __metadata("design:type", String)
], Staff.prototype, "castecategory", void 0);
__decorate([
    typeorm_1.Column("varchar", { length: 50 }),
    __metadata("design:type", String)
], Staff.prototype, "community", void 0);
__decorate([
    typeorm_1.Column("varchar", { length: 20, default: "Tamil" }),
    __metadata("design:type", String)
], Staff.prototype, "mothertongue", void 0);
__decorate([
    typeorm_1.Column("varchar", { length: 15 }),
    __metadata("design:type", String)
], Staff.prototype, "bloodgroup", void 0);
__decorate([
    typeorm_1.Column("varchar", { length: 500 }),
    __metadata("design:type", String)
], Staff.prototype, "identification", void 0);
__decorate([
    typeorm_1.Column("boolean", {
        nullable: false,
        default: () => true
    }),
    __metadata("design:type", Boolean)
], Staff.prototype, "isactive", void 0);
__decorate([
    typeorm_1.Column("varchar", { length: 500 }),
    __metadata("design:type", String)
], Staff.prototype, "notes", void 0);
__decorate([
    typeorm_1.Column("varchar", { length: 1024, nullable: true }),
    __metadata("design:type", String)
], Staff.prototype, "photo", void 0);
__decorate([
    typeorm_1.OneToOne(type => Users_1.Users, user => user.staff),
    __metadata("design:type", Users_1.Users)
], Staff.prototype, "user", void 0);
__decorate([
    typeorm_1.OneToMany(type => DocsPhotos_1.DocsPhotos, docs => docs.staff),
    __metadata("design:type", Array)
], Staff.prototype, "documents", void 0);
__decorate([
    typeorm_1.OneToMany(type => ClassTeacher_1.ClassTeacher, ct => ct.staff),
    __metadata("design:type", Array)
], Staff.prototype, "classteacher", void 0);
__decorate([
    typeorm_1.Column("varchar", { nullable: false }),
    __metadata("design:type", String)
], Staff.prototype, "createdby", void 0);
__decorate([
    typeorm_1.Column("timestamp", {
        precision: 2,
        default: () => "CURRENT_TIMESTAMP(2)"
    }),
    __metadata("design:type", Date)
], Staff.prototype, "createdon", void 0);
__decorate([
    typeorm_1.Column("varchar", { nullable: true }),
    __metadata("design:type", String)
], Staff.prototype, "updatedby", void 0);
__decorate([
    typeorm_1.Column("timestamp", {
        precision: 2,
        default: () => "CURRENT_TIMESTAMP(2)",
        onUpdate: "CURRENT_TIMESTAMP(2)"
    }),
    __metadata("design:type", Date)
], Staff.prototype, "updatedon", void 0);
__decorate([
    typeorm_1.OneToOne(type => ClassSections_1.ClassSections, cls => cls.classteacher),
    __metadata("design:type", String)
], Staff.prototype, "classtr", void 0);
__decorate([
    typeorm_1.OneToMany(type => ClassSections_1.ClassSections, cls => cls.asstclassteacher),
    __metadata("design:type", String)
], Staff.prototype, "asstclasstr", void 0);
Staff = __decorate([
    typeorm_1.Entity("t_staff")
], Staff);
exports.Staff = Staff;
//# sourceMappingURL=Staff.js.map