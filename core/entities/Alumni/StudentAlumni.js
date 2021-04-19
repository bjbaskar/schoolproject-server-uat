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
let StudentsAlumni = class StudentsAlumni {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn("uuid"),
    __metadata("design:type", String)
], StudentsAlumni.prototype, "id", void 0);
__decorate([
    typeorm_1.Column("varchar", { length: 100, nullable: true }),
    __metadata("design:type", String)
], StudentsAlumni.prototype, "student_id", void 0);
__decorate([
    typeorm_1.Column("varchar", { length: 250, nullable: true }),
    __metadata("design:type", String)
], StudentsAlumni.prototype, "promoted_to", void 0);
__decorate([
    typeorm_1.Column("varchar", { length: 250, nullable: true }),
    __metadata("design:type", String)
], StudentsAlumni.prototype, "promote_reason", void 0);
__decorate([
    typeorm_1.Column("varchar", { length: 100, nullable: true }),
    __metadata("design:type", String)
], StudentsAlumni.prototype, "classsec", void 0);
__decorate([
    typeorm_1.Column("simple-json", { nullable: true }),
    __metadata("design:type", Object)
], StudentsAlumni.prototype, "profile", void 0);
__decorate([
    typeorm_1.Column("simple-json", { nullable: true }),
    __metadata("design:type", Array)
], StudentsAlumni.prototype, "parents", void 0);
__decorate([
    typeorm_1.Column("varchar", { length: 100, nullable: true }),
    __metadata("design:type", String)
], StudentsAlumni.prototype, "documents", void 0);
__decorate([
    typeorm_1.Column("simple-json", { nullable: true }),
    __metadata("design:type", Array)
], StudentsAlumni.prototype, "govtrte", void 0);
__decorate([
    typeorm_1.Column("varchar", { length: 100, nullable: true }),
    __metadata("design:type", String)
], StudentsAlumni.prototype, "acadyear", void 0);
__decorate([
    typeorm_1.Column("simple-json", { nullable: true }),
    __metadata("design:type", Object)
], StudentsAlumni.prototype, "school_id", void 0);
__decorate([
    typeorm_1.Column("varchar", { length: 100, nullable: true }),
    __metadata("design:type", String)
], StudentsAlumni.prototype, "user", void 0);
__decorate([
    typeorm_1.Column("varchar", { nullable: false }),
    __metadata("design:type", String)
], StudentsAlumni.prototype, "createdby", void 0);
__decorate([
    typeorm_1.Column("timestamp", {
        precision: 2,
        default: () => "CURRENT_TIMESTAMP(2)"
    }),
    __metadata("design:type", Date)
], StudentsAlumni.prototype, "createdon", void 0);
StudentsAlumni = __decorate([
    typeorm_1.Entity("alumni_students")
], StudentsAlumni);
exports.StudentsAlumni = StudentsAlumni;
//# sourceMappingURL=StudentAlumni.js.map