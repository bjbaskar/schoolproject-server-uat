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
let ExamTimeTable = class ExamTimeTable {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn("uuid"),
    __metadata("design:type", String)
], ExamTimeTable.prototype, "id", void 0);
__decorate([
    typeorm_1.OneToMany(type => Exam_1.Exams, exams => exams.id),
    __metadata("design:type", String)
], ExamTimeTable.prototype, "exam_class_sub", void 0);
__decorate([
    typeorm_1.Column("timestamp", {
        precision: 2
    }),
    __metadata("design:type", Date)
], ExamTimeTable.prototype, "examdate", void 0);
__decorate([
    typeorm_1.Column("varchar", { length: 10 }),
    __metadata("design:type", String)
], ExamTimeTable.prototype, "start_time", void 0);
__decorate([
    typeorm_1.Column("varchar", { length: 10 }),
    __metadata("design:type", String)
], ExamTimeTable.prototype, "end_time", void 0);
__decorate([
    typeorm_1.Column("int", { nullable: false }),
    __metadata("design:type", Number)
], ExamTimeTable.prototype, "noofhours", void 0);
__decorate([
    typeorm_1.Column("varchar", { length: 500, nullable: true }),
    __metadata("design:type", String)
], ExamTimeTable.prototype, "notes", void 0);
__decorate([
    typeorm_1.Column("varchar", { nullable: false }),
    __metadata("design:type", String)
], ExamTimeTable.prototype, "createdby", void 0);
__decorate([
    typeorm_1.Column("timestamp", {
        precision: 2,
        default: () => "CURRENT_TIMESTAMP(2)"
    }),
    __metadata("design:type", Date)
], ExamTimeTable.prototype, "createdon", void 0);
__decorate([
    typeorm_1.Column("varchar", { nullable: true }),
    __metadata("design:type", String)
], ExamTimeTable.prototype, "updatedby", void 0);
__decorate([
    typeorm_1.Column("timestamp", {
        precision: 2,
        nullable: true,
        onUpdate: "CURRENT_TIMESTAMP(2)"
    }),
    __metadata("design:type", Date)
], ExamTimeTable.prototype, "updatedon", void 0);
ExamTimeTable = __decorate([
    typeorm_1.Entity("exam_timetable")
], ExamTimeTable);
exports.ExamTimeTable = ExamTimeTable;
//# sourceMappingURL=ExamTimeTable.js.map