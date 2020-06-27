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
const Parents_1 = require("./Parents");
let Address = class Address {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn("uuid"),
    __metadata("design:type", String)
], Address.prototype, "id", void 0);
__decorate([
    typeorm_1.Column("varchar", { length: 50, nullable: false }),
    __metadata("design:type", String)
], Address.prototype, "type", void 0);
__decorate([
    typeorm_1.Column("varchar", { length: 255, nullable: false }),
    __metadata("design:type", String)
], Address.prototype, "address1", void 0);
__decorate([
    typeorm_1.Column("varchar", { length: 255, nullable: true }),
    __metadata("design:type", String)
], Address.prototype, "address2", void 0);
__decorate([
    typeorm_1.Column("varchar", { length: 25, nullable: false }),
    __metadata("design:type", String)
], Address.prototype, "city", void 0);
__decorate([
    typeorm_1.Column("varchar", { length: 25, nullable: true }),
    __metadata("design:type", String)
], Address.prototype, "district", void 0);
__decorate([
    typeorm_1.Column("varchar", {
        length: 20
    }),
    __metadata("design:type", String)
], Address.prototype, "state", void 0);
__decorate([
    typeorm_1.Column("varchar", {
        length: 50
    }),
    __metadata("design:type", String)
], Address.prototype, "country", void 0);
__decorate([
    typeorm_1.Column("int", { nullable: true }),
    __metadata("design:type", Number)
], Address.prototype, "postalcode", void 0);
__decorate([
    typeorm_1.Column("varchar", { length: 20, nullable: false }),
    __metadata("design:type", String)
], Address.prototype, "mobile", void 0);
__decorate([
    typeorm_1.Column("varchar", { length: 20, nullable: true }),
    __metadata("design:type", String)
], Address.prototype, "homephone", void 0);
__decorate([
    typeorm_1.Column("varchar", { length: 100, nullable: true }),
    __metadata("design:type", String)
], Address.prototype, "email", void 0);
__decorate([
    typeorm_1.Column("boolean", {
        nullable: false,
        default: () => true
    }),
    __metadata("design:type", Boolean)
], Address.prototype, "isactive", void 0);
__decorate([
    typeorm_1.Column("varchar", { length: 500, nullable: true }),
    __metadata("design:type", String)
], Address.prototype, "notes", void 0);
__decorate([
    typeorm_1.ManyToMany(type => Parents_1.Parents, stud => stud.address, {
        cascade: true
    }),
    __metadata("design:type", Array)
], Address.prototype, "parents", void 0);
__decorate([
    typeorm_1.Column("varchar", { nullable: false }),
    __metadata("design:type", String)
], Address.prototype, "createdby", void 0);
__decorate([
    typeorm_1.Column("timestamp", {
        precision: 2,
        default: () => "CURRENT_TIMESTAMP(2)"
    }),
    __metadata("design:type", Date)
], Address.prototype, "createdon", void 0);
__decorate([
    typeorm_1.Column("varchar", { nullable: true }),
    __metadata("design:type", String)
], Address.prototype, "updatedby", void 0);
__decorate([
    typeorm_1.Column("timestamp", {
        precision: 2,
        nullable: true,
        onUpdate: "CURRENT_TIMESTAMP(2)"
    }),
    __metadata("design:type", Date)
], Address.prototype, "updatedon", void 0);
Address = __decorate([
    typeorm_1.Entity("s_address")
], Address);
exports.Address = Address;
//# sourceMappingURL=Address.js.map