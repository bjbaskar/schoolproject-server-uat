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
const ClassSections_1 = require("./ClassSections");
let AcadYear = class AcadYear {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn("uuid"),
    __metadata("design:type", String)
], AcadYear.prototype, "id", void 0);
__decorate([
    typeorm_1.Column("timestamp", { nullable: false }),
    __metadata("design:type", Date)
], AcadYear.prototype, "fromdate", void 0);
__decorate([
    typeorm_1.Column("timestamp", { nullable: false }),
    __metadata("design:type", Date)
], AcadYear.prototype, "todate", void 0);
__decorate([
    typeorm_1.Column("varchar", { length: 20, nullable: false }),
    __metadata("design:type", String)
], AcadYear.prototype, "displayname", void 0);
__decorate([
    typeorm_1.Column("int", { nullable: false }),
    __metadata("design:type", Number)
], AcadYear.prototype, "prefixyear", void 0);
__decorate([
    typeorm_1.Column("boolean", { nullable: false }),
    __metadata("design:type", Boolean)
], AcadYear.prototype, "isactive", void 0);
__decorate([
    typeorm_1.OneToMany(type => ClassSections_1.ClassSections, cls => cls.academicyear),
    __metadata("design:type", String)
], AcadYear.prototype, "classsec", void 0);
__decorate([
    typeorm_1.Column("varchar", { nullable: false }),
    __metadata("design:type", String)
], AcadYear.prototype, "createdby", void 0);
__decorate([
    typeorm_1.Column("timestamp", {
        precision: 2,
        default: () => "CURRENT_TIMESTAMP(2)"
    }),
    __metadata("design:type", Date)
], AcadYear.prototype, "createdon", void 0);
__decorate([
    typeorm_1.Column("varchar", { nullable: true }),
    __metadata("design:type", String)
], AcadYear.prototype, "updatedby", void 0);
__decorate([
    typeorm_1.Column("timestamp", {
        precision: 2,
        nullable: true,
        onUpdate: "CURRENT_TIMESTAMP(2)"
    }),
    __metadata("design:type", Date)
], AcadYear.prototype, "updatedon", void 0);
AcadYear = __decorate([
    typeorm_1.Entity("m_acadyear")
], AcadYear);
exports.AcadYear = AcadYear;
//# sourceMappingURL=AcadYear.js.map