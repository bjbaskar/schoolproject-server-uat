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
const FeeRegister_1 = require("./FeeRegister");
let FeeRegisterDetails = class FeeRegisterDetails {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn("uuid"),
    __metadata("design:type", String)
], FeeRegisterDetails.prototype, "id", void 0);
__decorate([
    typeorm_1.Column("timestamp", { nullable: false }),
    __metadata("design:type", Date)
], FeeRegisterDetails.prototype, "paydate", void 0);
__decorate([
    typeorm_1.ManyToOne(type => FeeRegister_1.FeeRegister, c => c.fee_reg_details),
    typeorm_1.JoinColumn({ name: "fee_register_id" }),
    __metadata("design:type", FeeRegister_1.FeeRegister)
], FeeRegisterDetails.prototype, "fee_register_id", void 0);
__decorate([
    typeorm_1.Column("varchar", { length: 50, nullable: false }),
    __metadata("design:type", String)
], FeeRegisterDetails.prototype, "fee_master_id", void 0);
__decorate([
    typeorm_1.Column("varchar", { length: 50, nullable: false }),
    __metadata("design:type", String)
], FeeRegisterDetails.prototype, "pay_mode", void 0);
__decorate([
    typeorm_1.Column("double", { nullable: false }),
    __metadata("design:type", Number)
], FeeRegisterDetails.prototype, "amount_payable", void 0);
__decorate([
    typeorm_1.Column("double", { nullable: false }),
    __metadata("design:type", Number)
], FeeRegisterDetails.prototype, "amount_discount", void 0);
__decorate([
    typeorm_1.Column("double", { nullable: false }),
    __metadata("design:type", Number)
], FeeRegisterDetails.prototype, "amount_paid", void 0);
__decorate([
    typeorm_1.Column("double", { nullable: false }),
    __metadata("design:type", Number)
], FeeRegisterDetails.prototype, "amount_balance", void 0);
__decorate([
    typeorm_1.Column("boolean", { nullable: false }),
    __metadata("design:type", Boolean)
], FeeRegisterDetails.prototype, "is_paid_fully", void 0);
__decorate([
    typeorm_1.Column("int", { nullable: false }),
    __metadata("design:type", Number)
], FeeRegisterDetails.prototype, "receipt_no", void 0);
__decorate([
    typeorm_1.Column("varchar", { length: 100, nullable: false }),
    __metadata("design:type", String)
], FeeRegisterDetails.prototype, "fee_trans_id", void 0);
__decorate([
    typeorm_1.Column("varchar", { nullable: false }),
    __metadata("design:type", String)
], FeeRegisterDetails.prototype, "createdby", void 0);
__decorate([
    typeorm_1.Column("timestamp", {
        precision: 2,
        default: () => "CURRENT_TIMESTAMP(2)"
    }),
    __metadata("design:type", Date)
], FeeRegisterDetails.prototype, "createdon", void 0);
__decorate([
    typeorm_1.Column("varchar", { nullable: true }),
    __metadata("design:type", String)
], FeeRegisterDetails.prototype, "updatedby", void 0);
__decorate([
    typeorm_1.Column("timestamp", {
        precision: 2,
        nullable: true,
        onUpdate: "CURRENT_TIMESTAMP(2)"
    }),
    __metadata("design:type", Date)
], FeeRegisterDetails.prototype, "updatedon", void 0);
FeeRegisterDetails = __decorate([
    typeorm_1.Entity("fee_register_details")
], FeeRegisterDetails);
exports.FeeRegisterDetails = FeeRegisterDetails;
//# sourceMappingURL=FeeRegisterDetails.js.map