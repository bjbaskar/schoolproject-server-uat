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
const Parents_1 = require("./Parents");
const DocsPhotos_1 = require("../DocsPhotos/DocsPhotos");
const GovtRTE_1 = require("./GovtRTE");
const ClassSections_1 = require("../Master/ClassSections");
const Users_1 = require("../Users/Users");
let Students = class Students {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn("uuid"),
    __metadata("design:type", String)
], Students.prototype, "id", void 0);
__decorate([
    typeorm_1.Column("int", { nullable: false }),
    __metadata("design:type", Number)
], Students.prototype, "studentno", void 0);
__decorate([
    typeorm_1.Column("int", { nullable: false }),
    __metadata("design:type", Number)
], Students.prototype, "prefixyear", void 0);
__decorate([
    typeorm_1.Column("varchar", { length: 50, nullable: true }),
    __metadata("design:type", String)
], Students.prototype, "aadhaarno", void 0);
__decorate([
    typeorm_1.Column("varchar", { length: 50, nullable: true }),
    __metadata("design:type", String)
], Students.prototype, "emisno", void 0);
__decorate([
    typeorm_1.Column("varchar", { length: 50, nullable: true }),
    __metadata("design:type", String)
], Students.prototype, "udiseno", void 0);
__decorate([
    typeorm_1.Column("varchar", { length: 50, nullable: false }),
    __metadata("design:type", String)
], Students.prototype, "firstname", void 0);
__decorate([
    typeorm_1.Column("varchar", { length: 50, nullable: false }),
    __metadata("design:type", String)
], Students.prototype, "lastname", void 0);
__decorate([
    typeorm_1.Column("varchar", { length: 6, nullable: false }),
    __metadata("design:type", String)
], Students.prototype, "gender", void 0);
__decorate([
    typeorm_1.Column("timestamp", { nullable: false }),
    __metadata("design:type", Date)
], Students.prototype, "dob", void 0);
__decorate([
    typeorm_1.Column("timestamp", {
        nullable: false,
        precision: 2,
        default: () => "CURRENT_TIMESTAMP(2)"
    }),
    __metadata("design:type", Date)
], Students.prototype, "doj", void 0);
__decorate([
    typeorm_1.Column("varchar", {
        length: 25,
        nullable: false
    }),
    __metadata("design:type", String)
], Students.prototype, "nationality", void 0);
__decorate([
    typeorm_1.Column("varchar", { length: 50, nullable: false }),
    __metadata("design:type", String)
], Students.prototype, "religion", void 0);
__decorate([
    typeorm_1.Column("varchar", { length: 50, nullable: false }),
    __metadata("design:type", String)
], Students.prototype, "castecategory", void 0);
__decorate([
    typeorm_1.Column("varchar", { length: 50, nullable: false }),
    __metadata("design:type", String)
], Students.prototype, "community", void 0);
__decorate([
    typeorm_1.Column("varchar", { length: 50, nullable: false, default: "Tamil" }),
    __metadata("design:type", String)
], Students.prototype, "mothertongue", void 0);
__decorate([
    typeorm_1.Column("varchar", { length: 50, nullable: true }),
    __metadata("design:type", String)
], Students.prototype, "bloodgroup", void 0);
__decorate([
    typeorm_1.Column("varchar", { length: 255, nullable: true }),
    __metadata("design:type", String)
], Students.prototype, "identification", void 0);
__decorate([
    typeorm_1.Column("boolean", {
        nullable: false,
        default: () => true
    }),
    __metadata("design:type", Boolean)
], Students.prototype, "isactive", void 0);
__decorate([
    typeorm_1.Column("varchar", { length: 100, nullable: true }),
    __metadata("design:type", String)
], Students.prototype, "disability", void 0);
__decorate([
    typeorm_1.Column("varchar", { length: 500, nullable: true }),
    __metadata("design:type", String)
], Students.prototype, "notes", void 0);
__decorate([
    typeorm_1.Column("varchar", { length: 1024, nullable: true }),
    __metadata("design:type", String)
], Students.prototype, "photo", void 0);
__decorate([
    typeorm_1.ManyToMany(type => ClassSections_1.ClassSections, cls => cls.students),
    typeorm_1.JoinTable({
        name: "s_j_student_classsec"
    }),
    __metadata("design:type", Array)
], Students.prototype, "classsec", void 0);
__decorate([
    typeorm_1.ManyToMany(type => Parents_1.Parents, par => par.students),
    typeorm_1.JoinTable({
        name: "s_j_student_parents"
    }),
    __metadata("design:type", Array)
], Students.prototype, "parents", void 0);
__decorate([
    typeorm_1.OneToMany(type => DocsPhotos_1.DocsPhotos, docs => docs.student),
    __metadata("design:type", Array)
], Students.prototype, "documents", void 0);
__decorate([
    typeorm_1.OneToMany(type => GovtRTE_1.GovtRTE, rte => rte.student),
    __metadata("design:type", Array)
], Students.prototype, "govtrte", void 0);
__decorate([
    typeorm_1.OneToOne(type => Users_1.Users, user => user.students),
    __metadata("design:type", Users_1.Users)
], Students.prototype, "user", void 0);
__decorate([
    typeorm_1.Column("varchar", { length: 100, nullable: true }),
    __metadata("design:type", String)
], Students.prototype, "acad_year", void 0);
__decorate([
    typeorm_1.Column("varchar", { length: 100, nullable: true }),
    __metadata("design:type", String)
], Students.prototype, "school_id", void 0);
__decorate([
    typeorm_1.Column("varchar", { nullable: false }),
    __metadata("design:type", String)
], Students.prototype, "createdby", void 0);
__decorate([
    typeorm_1.Column("timestamp", {
        precision: 2,
        default: () => "CURRENT_TIMESTAMP(2)"
    }),
    __metadata("design:type", Date)
], Students.prototype, "createdon", void 0);
__decorate([
    typeorm_1.Column("varchar", { nullable: true }),
    __metadata("design:type", String)
], Students.prototype, "updatedby", void 0);
__decorate([
    typeorm_1.Column("timestamp", {
        precision: 2,
        nullable: true,
        onUpdate: "CURRENT_TIMESTAMP(2)"
    }),
    __metadata("design:type", Date)
], Students.prototype, "updatedon", void 0);
Students = __decorate([
    typeorm_1.Entity("s_students")
], Students);
exports.Students = Students;
//# sourceMappingURL=Student.js.map