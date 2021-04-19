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
const Student_1 = require("./Student");
let StudentTC = class StudentTC {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn("uuid"),
    __metadata("design:type", String)
], StudentTC.prototype, "id", void 0);
__decorate([
    typeorm_1.OneToOne(type => Student_1.Students),
    typeorm_1.JoinColumn({ referencedColumnName: "id" }),
    __metadata("design:type", Student_1.Students)
], StudentTC.prototype, "student", void 0);
__decorate([
    typeorm_1.Column("varchar", { length: 250, nullable: true }),
    __metadata("design:type", String)
], StudentTC.prototype, "identifications", void 0);
__decorate([
    typeorm_1.Column("varchar", { length: 250, nullable: true }),
    __metadata("design:type", String)
], StudentTC.prototype, "scholarship", void 0);
__decorate([
    typeorm_1.Column("varchar", { length: 250, nullable: true }),
    __metadata("design:type", String)
], StudentTC.prototype, "rte", void 0);
__decorate([
    typeorm_1.Column("timestamp", { nullable: false }),
    __metadata("design:type", Date)
], StudentTC.prototype, "medicalinspection", void 0);
__decorate([
    typeorm_1.Column("varchar", { length: 250, nullable: true }),
    __metadata("design:type", String)
], StudentTC.prototype, "conductcharacter", void 0);
__decorate([
    typeorm_1.Column("varchar", { length: 100, nullable: true }),
    __metadata("design:type", String)
], StudentTC.prototype, "class_studied", void 0);
__decorate([
    typeorm_1.Column("varchar", { length: 100, nullable: true }),
    __metadata("design:type", String)
], StudentTC.prototype, "period_of_study", void 0);
__decorate([
    typeorm_1.Column("timestamp", { nullable: false }),
    __metadata("design:type", Date)
], StudentTC.prototype, "doj", void 0);
__decorate([
    typeorm_1.Column("varchar", { length: 100, nullable: true }),
    __metadata("design:type", String)
], StudentTC.prototype, "leaving_class", void 0);
__decorate([
    typeorm_1.Column("varchar", { length: 250, nullable: true }),
    __metadata("design:type", String)
], StudentTC.prototype, "promoted", void 0);
__decorate([
    typeorm_1.Column("timestamp", { nullable: false }),
    __metadata("design:type", Date)
], StudentTC.prototype, "lastdate", void 0);
__decorate([
    typeorm_1.Column("varchar", { length: 20, nullable: true }),
    __metadata("design:type", String)
], StudentTC.prototype, "firstlanguage", void 0);
__decorate([
    typeorm_1.Column("varchar", { length: 100, nullable: true }),
    __metadata("design:type", String)
], StudentTC.prototype, "medium_of_instruct", void 0);
__decorate([
    typeorm_1.Column("varchar", { length: 30, nullable: true }),
    __metadata("design:type", String)
], StudentTC.prototype, "schoolrecogno", void 0);
__decorate([
    typeorm_1.Column("timestamp", { nullable: false }),
    __metadata("design:type", Date)
], StudentTC.prototype, "tcappdate", void 0);
__decorate([
    typeorm_1.Column("timestamp", { nullable: false }),
    __metadata("design:type", Date)
], StudentTC.prototype, "tcissuedate", void 0);
__decorate([
    typeorm_1.Column("varchar", { length: 500, nullable: true }),
    __metadata("design:type", String)
], StudentTC.prototype, "notes", void 0);
__decorate([
    typeorm_1.Column("varchar", { nullable: false }),
    __metadata("design:type", String)
], StudentTC.prototype, "createdby", void 0);
__decorate([
    typeorm_1.Column("timestamp", {
        precision: 2,
        default: () => "CURRENT_TIMESTAMP(2)"
    }),
    __metadata("design:type", Date)
], StudentTC.prototype, "createdon", void 0);
__decorate([
    typeorm_1.Column("varchar", { nullable: true }),
    __metadata("design:type", String)
], StudentTC.prototype, "updatedby", void 0);
__decorate([
    typeorm_1.Column("timestamp", {
        precision: 2,
        nullable: true,
        onUpdate: "CURRENT_TIMESTAMP(2)"
    }),
    __metadata("design:type", Date)
], StudentTC.prototype, "updatedon", void 0);
StudentTC = __decorate([
    typeorm_1.Entity("s_students_tc")
], StudentTC);
exports.StudentTC = StudentTC;
//# sourceMappingURL=StudentTC.js.map