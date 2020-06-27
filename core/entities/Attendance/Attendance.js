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
const ClassSections_1 = require("../Master/ClassSections");
const Student_1 = require("../../entities/Students/Student");
let Attendance = class Attendance {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn("uuid"),
    __metadata("design:type", String)
], Attendance.prototype, "id", void 0);
__decorate([
    typeorm_1.Column("timestamp", {
        precision: 2,
        default: () => "CURRENT_TIMESTAMP(2)"
    }),
    __metadata("design:type", Date)
], Attendance.prototype, "attdate", void 0);
__decorate([
    typeorm_1.ManyToOne(type => ClassSections_1.ClassSections, cls => cls.id),
    __metadata("design:type", String)
], Attendance.prototype, "classid", void 0);
__decorate([
    typeorm_1.ManyToOne(type => Student_1.Students, stud => stud.id),
    __metadata("design:type", String)
], Attendance.prototype, "studentid", void 0);
__decorate([
    typeorm_1.Column("varchar", { length: 12 }),
    __metadata("design:type", String)
], Attendance.prototype, "session", void 0);
__decorate([
    typeorm_1.Column("boolean", { nullable: false }),
    __metadata("design:type", Boolean)
], Attendance.prototype, "allpresent", void 0);
__decorate([
    typeorm_1.Column("varchar", { length: 255, nullable: true }),
    __metadata("design:type", String)
], Attendance.prototype, "notes", void 0);
__decorate([
    typeorm_1.Column("varchar", { nullable: false }),
    __metadata("design:type", String)
], Attendance.prototype, "createdby", void 0);
__decorate([
    typeorm_1.Column("timestamp", {
        precision: 2,
        default: () => "CURRENT_TIMESTAMP(2)"
    }),
    __metadata("design:type", Date)
], Attendance.prototype, "createdon", void 0);
__decorate([
    typeorm_1.Column("varchar", { nullable: true }),
    __metadata("design:type", String)
], Attendance.prototype, "updatedby", void 0);
__decorate([
    typeorm_1.Column("timestamp", {
        precision: 2,
        nullable: true,
        onUpdate: "CURRENT_TIMESTAMP(2)"
    }),
    __metadata("design:type", Date)
], Attendance.prototype, "updatedon", void 0);
Attendance = __decorate([
    typeorm_1.Entity("m_attendance")
], Attendance);
exports.Attendance = Attendance;
//# sourceMappingURL=Attendance.js.map