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
const Exam_1 = require("./Exam");
const Student_1 = require("../Students/Student");
let MarkRegister = class MarkRegister {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn("uuid"),
    __metadata("design:type", String)
], MarkRegister.prototype, "id", void 0);
__decorate([
    typeorm_1.ManyToMany(type => Exam_1.Exams, {
        cascade: true
    }),
    typeorm_1.JoinTable({ name: "exam_j_reg_exam" }),
    __metadata("design:type", Array)
], MarkRegister.prototype, "exam_class_sub", void 0);
__decorate([
    typeorm_1.ManyToMany(type => Student_1.Students, {
        cascade: true
    }),
    typeorm_1.JoinTable({ name: "exam_j_reg_students" }),
    __metadata("design:type", Array)
], MarkRegister.prototype, "students", void 0);
__decorate([
    typeorm_1.Column("int", { nullable: false }),
    __metadata("design:type", Number)
], MarkRegister.prototype, "marks_obtained", void 0);
__decorate([
    typeorm_1.Column("varchar", { length: 100, nullable: true }),
    __metadata("design:type", String)
], MarkRegister.prototype, "grade", void 0);
__decorate([
    typeorm_1.Column("int", { nullable: false }),
    __metadata("design:type", Number)
], MarkRegister.prototype, "percentage", void 0);
__decorate([
    typeorm_1.Column("varchar", { length: 100, nullable: true }),
    __metadata("design:type", String)
], MarkRegister.prototype, "acad_year", void 0);
__decorate([
    typeorm_1.Column("varchar", { length: 500, nullable: true }),
    __metadata("design:type", String)
], MarkRegister.prototype, "notes", void 0);
__decorate([
    typeorm_1.Column("varchar", { nullable: false }),
    __metadata("design:type", String)
], MarkRegister.prototype, "createdby", void 0);
__decorate([
    typeorm_1.Column("timestamp", {
        precision: 2,
        default: () => "CURRENT_TIMESTAMP(2)"
    }),
    __metadata("design:type", Date)
], MarkRegister.prototype, "createdon", void 0);
__decorate([
    typeorm_1.Column("varchar", { nullable: true }),
    __metadata("design:type", String)
], MarkRegister.prototype, "updatedby", void 0);
__decorate([
    typeorm_1.Column("timestamp", {
        precision: 2,
        nullable: true,
        onUpdate: "CURRENT_TIMESTAMP(2)"
    }),
    __metadata("design:type", Date)
], MarkRegister.prototype, "updatedon", void 0);
MarkRegister = __decorate([
    typeorm_1.Entity("exam_markregister")
], MarkRegister);
exports.MarkRegister = MarkRegister;
//# sourceMappingURL=MarkRegister.js.map