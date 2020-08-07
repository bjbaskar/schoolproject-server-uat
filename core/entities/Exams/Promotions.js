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
const Student_1 = require("../Students/Student");
const ClassSections_1 = require("../Master/ClassSections");
const AcadYear_1 = require("../Master/AcadYear");
let Promotions = class Promotions {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn("uuid"),
    __metadata("design:type", String)
], Promotions.prototype, "id", void 0);
__decorate([
    typeorm_1.OneToMany(type => Student_1.Students, student => student.id),
    __metadata("design:type", String)
], Promotions.prototype, "student", void 0);
__decorate([
    typeorm_1.OneToMany(type => ClassSections_1.ClassSections, c_from => c_from.id),
    __metadata("design:type", String)
], Promotions.prototype, "class_from", void 0);
__decorate([
    typeorm_1.OneToMany(type => ClassSections_1.ClassSections, c_to => c_to.id),
    __metadata("design:type", String)
], Promotions.prototype, "class_to", void 0);
__decorate([
    typeorm_1.Column("timestamp", { nullable: false }),
    __metadata("design:type", Date)
], Promotions.prototype, "promotion_date", void 0);
__decorate([
    typeorm_1.Column("varchar", { length: 10, nullable: false }),
    __metadata("design:type", String)
], Promotions.prototype, "graduated", void 0);
__decorate([
    typeorm_1.OneToMany(type => AcadYear_1.AcadYear, acd_from => acd_from.id),
    __metadata("design:type", String)
], Promotions.prototype, "acd_year_from", void 0);
__decorate([
    typeorm_1.OneToMany(type => AcadYear_1.AcadYear, acd_to => acd_to.id),
    __metadata("design:type", String)
], Promotions.prototype, "acd_year_to", void 0);
__decorate([
    typeorm_1.Column("varchar", { length: 500, nullable: true }),
    __metadata("design:type", String)
], Promotions.prototype, "notes", void 0);
__decorate([
    typeorm_1.Column("varchar", { nullable: false }),
    __metadata("design:type", String)
], Promotions.prototype, "createdby", void 0);
__decorate([
    typeorm_1.Column("timestamp", {
        precision: 2,
        default: () => "CURRENT_TIMESTAMP(2)"
    }),
    __metadata("design:type", Date)
], Promotions.prototype, "createdon", void 0);
__decorate([
    typeorm_1.Column("varchar", { nullable: true }),
    __metadata("design:type", String)
], Promotions.prototype, "updatedby", void 0);
__decorate([
    typeorm_1.Column("timestamp", {
        precision: 2,
        nullable: true,
        onUpdate: "CURRENT_TIMESTAMP(2)"
    }),
    __metadata("design:type", Date)
], Promotions.prototype, "updatedon", void 0);
Promotions = __decorate([
    typeorm_1.Entity("exam_promotions")
], Promotions);
exports.Promotions = Promotions;
//# sourceMappingURL=Promotions.js.map