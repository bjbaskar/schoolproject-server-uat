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
let PromotionHistory = class PromotionHistory {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn("uuid"),
    __metadata("design:type", String)
], PromotionHistory.prototype, "id", void 0);
__decorate([
    typeorm_1.Column("timestamp", {
        precision: 2,
        default: () => "CURRENT_TIMESTAMP(2)",
    }),
    __metadata("design:type", Date)
], PromotionHistory.prototype, "promotion_date", void 0);
__decorate([
    typeorm_1.Column("varchar", { length: 100, nullable: false }),
    __metadata("design:type", String)
], PromotionHistory.prototype, "class_id_from", void 0);
__decorate([
    typeorm_1.Column("varchar", { length: 100, nullable: false }),
    __metadata("design:type", String)
], PromotionHistory.prototype, "class_id_to", void 0);
__decorate([
    typeorm_1.Column("varchar", { length: 100, nullable: false }),
    __metadata("design:type", String)
], PromotionHistory.prototype, "acad_year_from", void 0);
__decorate([
    typeorm_1.Column("varchar", { length: 100, nullable: false }),
    __metadata("design:type", String)
], PromotionHistory.prototype, "acad_year_to", void 0);
__decorate([
    typeorm_1.Column("varchar", { length: 100, nullable: false }),
    __metadata("design:type", String)
], PromotionHistory.prototype, "school_id", void 0);
__decorate([
    typeorm_1.Column("boolean", { nullable: true }),
    __metadata("design:type", Boolean)
], PromotionHistory.prototype, "addmarkstoarchieved", void 0);
__decorate([
    typeorm_1.Column("varchar", { length: 5, nullable: true }),
    __metadata("design:type", String)
], PromotionHistory.prototype, "detainedstudents", void 0);
__decorate([
    typeorm_1.Column("varchar", { length: 1024, nullable: true }),
    __metadata("design:type", String)
], PromotionHistory.prototype, "getexamname", void 0);
__decorate([
    typeorm_1.Column("boolean", { nullable: true }),
    __metadata("design:type", Boolean)
], PromotionHistory.prototype, "hasattendancearchieved", void 0);
__decorate([
    typeorm_1.Column("boolean", { nullable: true }),
    __metadata("design:type", Boolean)
], PromotionHistory.prototype, "hasdeletedattendance", void 0);
__decorate([
    typeorm_1.Column("boolean", { nullable: true }),
    __metadata("design:type", Boolean)
], PromotionHistory.prototype, "hasdeletedmarkregister", void 0);
__decorate([
    typeorm_1.Column("boolean", { nullable: true }),
    __metadata("design:type", Boolean)
], PromotionHistory.prototype, "hasdeletedmarkregistersum", void 0);
__decorate([
    typeorm_1.Column("boolean", { nullable: true }),
    __metadata("design:type", Boolean)
], PromotionHistory.prototype, "hasupdatepromotionstatus", void 0);
__decorate([
    typeorm_1.Column("boolean", { nullable: true }),
    __metadata("design:type", Boolean)
], PromotionHistory.prototype, "ispromotetonewclass", void 0);
__decorate([
    typeorm_1.Column("varchar", { length: 10, nullable: true }),
    __metadata("design:type", String)
], PromotionHistory.prototype, "noofaddmarksarchieved", void 0);
__decorate([
    typeorm_1.Column("varchar", { length: 10, nullable: true }),
    __metadata("design:type", String)
], PromotionHistory.prototype, "noofattendancearchieved", void 0);
__decorate([
    typeorm_1.Column("varchar", { length: 10, nullable: true }),
    __metadata("design:type", String)
], PromotionHistory.prototype, "noofattendancedeleted", void 0);
__decorate([
    typeorm_1.Column("varchar", { length: 10, nullable: true }),
    __metadata("design:type", String)
], PromotionHistory.prototype, "noofdelmarkregister", void 0);
__decorate([
    typeorm_1.Column("varchar", { length: 10, nullable: true }),
    __metadata("design:type", String)
], PromotionHistory.prototype, "noofdelmarkregistersum", void 0);
__decorate([
    typeorm_1.Column("varchar", { length: 10, nullable: true }),
    __metadata("design:type", String)
], PromotionHistory.prototype, "noofdetained", void 0);
__decorate([
    typeorm_1.Column("varchar", { length: 10, nullable: true }),
    __metadata("design:type", String)
], PromotionHistory.prototype, "noofstudentspromoted", void 0);
__decorate([
    typeorm_1.Column("varchar", { length: 10, nullable: true }),
    __metadata("design:type", String)
], PromotionHistory.prototype, "noofupdateacdyear", void 0);
__decorate([
    typeorm_1.Column("boolean", { nullable: true }),
    __metadata("design:type", Boolean)
], PromotionHistory.prototype, "updateacdyear", void 0);
__decorate([
    typeorm_1.Column("varchar", { nullable: false }),
    __metadata("design:type", String)
], PromotionHistory.prototype, "createdby", void 0);
__decorate([
    typeorm_1.Column("timestamp", {
        precision: 2,
        default: () => "CURRENT_TIMESTAMP(2)",
    }),
    __metadata("design:type", Date)
], PromotionHistory.prototype, "createdon", void 0);
__decorate([
    typeorm_1.Column("varchar", { nullable: true }),
    __metadata("design:type", String)
], PromotionHistory.prototype, "updatedby", void 0);
__decorate([
    typeorm_1.Column("timestamp", {
        precision: 2,
        nullable: true,
        onUpdate: "CURRENT_TIMESTAMP(2)",
    }),
    __metadata("design:type", Date)
], PromotionHistory.prototype, "updatedon", void 0);
PromotionHistory = __decorate([
    typeorm_1.Entity("exam_promotion_history")
], PromotionHistory);
exports.PromotionHistory = PromotionHistory;
//# sourceMappingURL=PromotionHistory.js.map