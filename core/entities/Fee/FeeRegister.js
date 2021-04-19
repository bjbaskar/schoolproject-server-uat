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
const FeeRegisterDetails_1 = require("./FeeRegisterDetails");
let FeeRegister = class FeeRegister {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn("uuid"),
    __metadata("design:type", String)
], FeeRegister.prototype, "id", void 0);
__decorate([
    typeorm_1.Column("timestamp", { nullable: false }),
    __metadata("design:type", Date)
], FeeRegister.prototype, "paydate", void 0);
__decorate([
    typeorm_1.Column("varchar", { length: 50, nullable: false }),
    __metadata("design:type", String)
], FeeRegister.prototype, "class_id", void 0);
__decorate([
    typeorm_1.Column("varchar", { length: 50, nullable: false }),
    __metadata("design:type", String)
], FeeRegister.prototype, "student_id", void 0);
__decorate([
    typeorm_1.Column("timestamp", { nullable: true }),
    __metadata("design:type", Date)
], FeeRegister.prototype, "effective_from", void 0);
__decorate([
    typeorm_1.OneToMany(type => FeeRegisterDetails_1.FeeRegisterDetails, c => c.fee_register_id),
    __metadata("design:type", Array)
], FeeRegister.prototype, "fee_reg_details", void 0);
__decorate([
    typeorm_1.Column("double", { nullable: false }),
    __metadata("design:type", Number)
], FeeRegister.prototype, "total_amount_payable", void 0);
__decorate([
    typeorm_1.Column("double", { nullable: false }),
    __metadata("design:type", Number)
], FeeRegister.prototype, "total_amount_discount", void 0);
__decorate([
    typeorm_1.Column("double", { nullable: false }),
    __metadata("design:type", Number)
], FeeRegister.prototype, "total_amount_paid", void 0);
__decorate([
    typeorm_1.Column("double", { nullable: false }),
    __metadata("design:type", Number)
], FeeRegister.prototype, "total_amount_balance", void 0);
__decorate([
    typeorm_1.Column("varchar", { length: 50, nullable: false }),
    __metadata("design:type", String)
], FeeRegister.prototype, "acad_year", void 0);
__decorate([
    typeorm_1.Column("varchar", { length: 50, nullable: false }),
    __metadata("design:type", String)
], FeeRegister.prototype, "school_id", void 0);
__decorate([
    typeorm_1.Column("varchar", { nullable: false }),
    __metadata("design:type", String)
], FeeRegister.prototype, "createdby", void 0);
__decorate([
    typeorm_1.Column("timestamp", {
        precision: 2,
        default: () => "CURRENT_TIMESTAMP(2)"
    }),
    __metadata("design:type", Date)
], FeeRegister.prototype, "createdon", void 0);
__decorate([
    typeorm_1.Column("varchar", { nullable: true }),
    __metadata("design:type", String)
], FeeRegister.prototype, "updatedby", void 0);
__decorate([
    typeorm_1.Column("timestamp", {
        precision: 2,
        nullable: true,
        onUpdate: "CURRENT_TIMESTAMP(2)"
    }),
    __metadata("design:type", Date)
], FeeRegister.prototype, "updatedon", void 0);
FeeRegister = __decorate([
    typeorm_1.Entity("fee_register")
], FeeRegister);
exports.FeeRegister = FeeRegister;
//# sourceMappingURL=FeeRegister.js.map