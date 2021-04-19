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
let FeeDiscount = class FeeDiscount {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn("uuid"),
    __metadata("design:type", String)
], FeeDiscount.prototype, "id", void 0);
__decorate([
    typeorm_1.Column("varchar", { length: 50, nullable: true }),
    __metadata("design:type", String)
], FeeDiscount.prototype, "class_id", void 0);
__decorate([
    typeorm_1.Column("varchar", { length: 50, nullable: false }),
    __metadata("design:type", String)
], FeeDiscount.prototype, "student_id", void 0);
__decorate([
    typeorm_1.Column("varchar", { length: 50, nullable: false }),
    __metadata("design:type", String)
], FeeDiscount.prototype, "fee_master_id", void 0);
__decorate([
    typeorm_1.Column("varchar", { length: 250, nullable: false }),
    __metadata("design:type", String)
], FeeDiscount.prototype, "discount_reason", void 0);
__decorate([
    typeorm_1.Column("double", { nullable: false }),
    __metadata("design:type", Number)
], FeeDiscount.prototype, "discount_perc", void 0);
__decorate([
    typeorm_1.Column("double", { nullable: false }),
    __metadata("design:type", Number)
], FeeDiscount.prototype, "discount_amount", void 0);
__decorate([
    typeorm_1.Column("varchar", { length: 50, nullable: false }),
    __metadata("design:type", String)
], FeeDiscount.prototype, "acad_year", void 0);
__decorate([
    typeorm_1.Column("varchar", { length: 50, nullable: false }),
    __metadata("design:type", String)
], FeeDiscount.prototype, "school_id", void 0);
__decorate([
    typeorm_1.Column("varchar", { nullable: false }),
    __metadata("design:type", String)
], FeeDiscount.prototype, "createdby", void 0);
__decorate([
    typeorm_1.Column("timestamp", {
        precision: 2,
        default: () => "CURRENT_TIMESTAMP(2)"
    }),
    __metadata("design:type", Date)
], FeeDiscount.prototype, "createdon", void 0);
__decorate([
    typeorm_1.Column("varchar", { nullable: true }),
    __metadata("design:type", String)
], FeeDiscount.prototype, "updatedby", void 0);
__decorate([
    typeorm_1.Column("timestamp", {
        precision: 2,
        nullable: true,
        onUpdate: "CURRENT_TIMESTAMP(2)"
    }),
    __metadata("design:type", Date)
], FeeDiscount.prototype, "updatedon", void 0);
FeeDiscount = __decorate([
    typeorm_1.Entity("fee_discount")
], FeeDiscount);
exports.FeeDiscount = FeeDiscount;
//# sourceMappingURL=FeeDiscount.js.map