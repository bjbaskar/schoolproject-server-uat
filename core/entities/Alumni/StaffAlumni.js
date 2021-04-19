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
let StaffAlumni = class StaffAlumni {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn("uuid"),
    __metadata("design:type", String)
], StaffAlumni.prototype, "id", void 0);
__decorate([
    typeorm_1.Column("int", { nullable: false }),
    __metadata("design:type", String)
], StaffAlumni.prototype, "staffno", void 0);
__decorate([
    typeorm_1.Column("int", { nullable: false }),
    __metadata("design:type", Number)
], StaffAlumni.prototype, "prefixyear", void 0);
__decorate([
    typeorm_1.Column("varchar", { length: 50 }),
    __metadata("design:type", String)
], StaffAlumni.prototype, "aadhaarno", void 0);
__decorate([
    typeorm_1.Column("varchar", { length: 50, nullable: false }),
    __metadata("design:type", String)
], StaffAlumni.prototype, "firstname", void 0);
__decorate([
    typeorm_1.Column("varchar", { length: 50, nullable: false }),
    __metadata("design:type", String)
], StaffAlumni.prototype, "lastname", void 0);
__decorate([
    typeorm_1.Column("varchar", { length: 6, nullable: false }),
    __metadata("design:type", String)
], StaffAlumni.prototype, "gender", void 0);
__decorate([
    typeorm_1.Column("varchar", { length: 25, nullable: false }),
    __metadata("design:type", String)
], StaffAlumni.prototype, "designation", void 0);
__decorate([
    typeorm_1.Column("timestamp", { nullable: false }),
    __metadata("design:type", Date)
], StaffAlumni.prototype, "dob", void 0);
__decorate([
    typeorm_1.Column("timestamp", {
        nullable: false,
        precision: 2,
        default: () => "CURRENT_TIMESTAMP(2)"
    }),
    __metadata("design:type", Date)
], StaffAlumni.prototype, "doj", void 0);
__decorate([
    typeorm_1.Column("varchar", {
        length: 20,
        default: "Indian"
    }),
    __metadata("design:type", String)
], StaffAlumni.prototype, "nationality", void 0);
__decorate([
    typeorm_1.Column("varchar", {
        length: 30,
        default: "Hindu"
    }),
    __metadata("design:type", String)
], StaffAlumni.prototype, "religion", void 0);
__decorate([
    typeorm_1.Column("varchar", { length: 50 }),
    __metadata("design:type", String)
], StaffAlumni.prototype, "castecategory", void 0);
__decorate([
    typeorm_1.Column("varchar", { length: 50 }),
    __metadata("design:type", String)
], StaffAlumni.prototype, "community", void 0);
__decorate([
    typeorm_1.Column("varchar", { length: 20 }),
    __metadata("design:type", String)
], StaffAlumni.prototype, "mothertongue", void 0);
__decorate([
    typeorm_1.Column("varchar", { length: 15 }),
    __metadata("design:type", String)
], StaffAlumni.prototype, "bloodgroup", void 0);
__decorate([
    typeorm_1.Column("varchar", { length: 500 }),
    __metadata("design:type", String)
], StaffAlumni.prototype, "identification", void 0);
__decorate([
    typeorm_1.Column("boolean", {
        nullable: false,
        default: () => true
    }),
    __metadata("design:type", Boolean)
], StaffAlumni.prototype, "isactive", void 0);
__decorate([
    typeorm_1.Column("varchar", { length: 500 }),
    __metadata("design:type", String)
], StaffAlumni.prototype, "notes", void 0);
__decorate([
    typeorm_1.Column("varchar", { length: 1024, nullable: true }),
    __metadata("design:type", String)
], StaffAlumni.prototype, "photo", void 0);
__decorate([
    typeorm_1.Column("varchar", { length: 500 }),
    __metadata("design:type", String)
], StaffAlumni.prototype, "user", void 0);
__decorate([
    typeorm_1.Column("varchar", { length: 500 }),
    __metadata("design:type", String)
], StaffAlumni.prototype, "documents", void 0);
__decorate([
    typeorm_1.Column("varchar", { length: 500 }),
    __metadata("design:type", String)
], StaffAlumni.prototype, "classteacher", void 0);
__decorate([
    typeorm_1.Column("varchar", { length: 500 }),
    __metadata("design:type", String)
], StaffAlumni.prototype, "classtr", void 0);
__decorate([
    typeorm_1.Column("varchar", { length: 500 }),
    __metadata("design:type", String)
], StaffAlumni.prototype, "asstclasstr", void 0);
__decorate([
    typeorm_1.Column("varchar", { nullable: false }),
    __metadata("design:type", String)
], StaffAlumni.prototype, "createdby", void 0);
__decorate([
    typeorm_1.Column("timestamp", {
        precision: 2,
        default: () => "CURRENT_TIMESTAMP(2)"
    }),
    __metadata("design:type", Date)
], StaffAlumni.prototype, "createdon", void 0);
__decorate([
    typeorm_1.Column("varchar", { nullable: true }),
    __metadata("design:type", String)
], StaffAlumni.prototype, "updatedby", void 0);
__decorate([
    typeorm_1.Column("timestamp", {
        precision: 2,
        default: () => "CURRENT_TIMESTAMP(2)",
        onUpdate: "CURRENT_TIMESTAMP(2)"
    }),
    __metadata("design:type", Date)
], StaffAlumni.prototype, "updatedon", void 0);
StaffAlumni = __decorate([
    typeorm_1.Entity("alumni_staff")
], StaffAlumni);
exports.StaffAlumni = StaffAlumni;
//# sourceMappingURL=StaffAlumni.js.map