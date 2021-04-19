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
let FeeMaster = class FeeMaster {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn("uuid"),
    __metadata("design:type", String)
], FeeMaster.prototype, "id", void 0);
__decorate([
    typeorm_1.Column("varchar", { length: 50, nullable: false }),
    __metadata("design:type", String)
], FeeMaster.prototype, "class_id", void 0);
__decorate([
    typeorm_1.Column("varchar", { length: 50, nullable: false }),
    __metadata("design:type", String)
], FeeMaster.prototype, "fee_particulars_id", void 0);
__decorate([
    typeorm_1.Column("varchar", { length: 50, nullable: false }),
    __metadata("design:type", String)
], FeeMaster.prototype, "fee_installments_id", void 0);
__decorate([
    typeorm_1.Column("timestamp", { nullable: true }),
    __metadata("design:type", Date)
], FeeMaster.prototype, "effective_from", void 0);
__decorate([
    typeorm_1.Column("timestamp", { nullable: false }),
    __metadata("design:type", Date)
], FeeMaster.prototype, "due_date", void 0);
__decorate([
    typeorm_1.Column("double", { nullable: false }),
    __metadata("design:type", Number)
], FeeMaster.prototype, "amount", void 0);
__decorate([
    typeorm_1.Column("boolean", { nullable: true }),
    __metadata("design:type", Boolean)
], FeeMaster.prototype, "is_required_to_all", void 0);
__decorate([
    typeorm_1.Column("boolean", { nullable: true }),
    __metadata("design:type", Boolean)
], FeeMaster.prototype, "is_refundable", void 0);
__decorate([
    typeorm_1.Column("boolean", { nullable: false, default: true }),
    __metadata("design:type", Boolean)
], FeeMaster.prototype, "isactive", void 0);
__decorate([
    typeorm_1.Column("varchar", { length: 50, nullable: false }),
    __metadata("design:type", String)
], FeeMaster.prototype, "acad_year", void 0);
__decorate([
    typeorm_1.Column("varchar", { length: 50, nullable: false }),
    __metadata("design:type", String)
], FeeMaster.prototype, "school_id", void 0);
__decorate([
    typeorm_1.Column("varchar", { nullable: false }),
    __metadata("design:type", String)
], FeeMaster.prototype, "createdby", void 0);
__decorate([
    typeorm_1.Column("timestamp", {
        precision: 2,
        default: () => "CURRENT_TIMESTAMP(2)"
    }),
    __metadata("design:type", Date)
], FeeMaster.prototype, "createdon", void 0);
__decorate([
    typeorm_1.Column("varchar", { nullable: true }),
    __metadata("design:type", String)
], FeeMaster.prototype, "updatedby", void 0);
__decorate([
    typeorm_1.Column("timestamp", {
        precision: 2,
        nullable: true,
        onUpdate: "CURRENT_TIMESTAMP(2)"
    }),
    __metadata("design:type", Date)
], FeeMaster.prototype, "updatedon", void 0);
FeeMaster = __decorate([
    typeorm_1.Entity("fee_master")
], FeeMaster);
exports.FeeMaster = FeeMaster;
//# sourceMappingURL=FeeMaster.js.map