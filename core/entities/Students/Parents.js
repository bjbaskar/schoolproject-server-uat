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
const Student_1 = require("./Student");
const Address_1 = require("./Address");
let Parents = class Parents {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn("uuid"),
    __metadata("design:type", String)
], Parents.prototype, "id", void 0);
__decorate([
    typeorm_1.Column("varchar", { length: 50, nullable: false }),
    __metadata("design:type", String)
], Parents.prototype, "fathername", void 0);
__decorate([
    typeorm_1.Column("timestamp", { nullable: true }),
    __metadata("design:type", Date)
], Parents.prototype, "fatherdob", void 0);
__decorate([
    typeorm_1.Column("varchar", { length: 50, nullable: false }),
    __metadata("design:type", String)
], Parents.prototype, "fathergraduation", void 0);
__decorate([
    typeorm_1.Column("varchar", { length: 50, nullable: false }),
    __metadata("design:type", String)
], Parents.prototype, "fatheroccupation", void 0);
__decorate([
    typeorm_1.Column("varchar", { length: 150, nullable: true }),
    __metadata("design:type", String)
], Parents.prototype, "fathercompanyname", void 0);
__decorate([
    typeorm_1.Column("int", { nullable: false }),
    __metadata("design:type", Number)
], Parents.prototype, "fatherincome", void 0);
__decorate([
    typeorm_1.Column("varchar", { length: 50, nullable: true }),
    __metadata("design:type", String)
], Parents.prototype, "fatheraadhaarno", void 0);
__decorate([
    typeorm_1.Column("varchar", { length: 50, nullable: true }),
    __metadata("design:type", String)
], Parents.prototype, "mothername", void 0);
__decorate([
    typeorm_1.Column("timestamp", { nullable: true }),
    __metadata("design:type", Date)
], Parents.prototype, "motherdob", void 0);
__decorate([
    typeorm_1.Column("varchar", { length: 50, nullable: true }),
    __metadata("design:type", String)
], Parents.prototype, "mothergraduation", void 0);
__decorate([
    typeorm_1.Column("varchar", { length: 50, nullable: true }),
    __metadata("design:type", String)
], Parents.prototype, "motheroccupation", void 0);
__decorate([
    typeorm_1.Column("varchar", { length: 150, nullable: true }),
    __metadata("design:type", String)
], Parents.prototype, "mothercompanyname", void 0);
__decorate([
    typeorm_1.Column("int", { nullable: true }),
    __metadata("design:type", Number)
], Parents.prototype, "motherincome", void 0);
__decorate([
    typeorm_1.Column("varchar", { length: 50, nullable: true }),
    __metadata("design:type", String)
], Parents.prototype, "motheraadhaarno", void 0);
__decorate([
    typeorm_1.Column("varchar", { length: 50, nullable: true }),
    __metadata("design:type", String)
], Parents.prototype, "guardianname", void 0);
__decorate([
    typeorm_1.Column("varchar", { length: 50, nullable: true }),
    __metadata("design:type", String)
], Parents.prototype, "guardianoccupation", void 0);
__decorate([
    typeorm_1.Column("boolean", {
        nullable: false,
        default: () => true
    }),
    __metadata("design:type", Boolean)
], Parents.prototype, "isactive", void 0);
__decorate([
    typeorm_1.Column("varchar", { length: 500, nullable: true }),
    __metadata("design:type", String)
], Parents.prototype, "notes", void 0);
__decorate([
    typeorm_1.ManyToMany(type => Student_1.Students, stud => stud.parents, {
        cascade: true
    }),
    __metadata("design:type", Array)
], Parents.prototype, "students", void 0);
__decorate([
    typeorm_1.ManyToMany(type => Address_1.Address, addr => addr.parents),
    typeorm_1.JoinTable({
        name: "s_j_parent_address"
    }),
    __metadata("design:type", Array)
], Parents.prototype, "address", void 0);
__decorate([
    typeorm_1.Column("varchar", { nullable: false }),
    __metadata("design:type", String)
], Parents.prototype, "createdby", void 0);
__decorate([
    typeorm_1.Column("timestamp", {
        precision: 2,
        default: () => "CURRENT_TIMESTAMP(2)"
    }),
    __metadata("design:type", Date)
], Parents.prototype, "createdon", void 0);
__decorate([
    typeorm_1.Column("varchar", { nullable: true }),
    __metadata("design:type", String)
], Parents.prototype, "updatedby", void 0);
__decorate([
    typeorm_1.Column("timestamp", {
        precision: 2,
        nullable: true,
        onUpdate: "CURRENT_TIMESTAMP(2)"
    }),
    __metadata("design:type", Date)
], Parents.prototype, "updatedon", void 0);
Parents = __decorate([
    typeorm_1.Entity("s_parents")
], Parents);
exports.Parents = Parents;
//# sourceMappingURL=Parents.js.map