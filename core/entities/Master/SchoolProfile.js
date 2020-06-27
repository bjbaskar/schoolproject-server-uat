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
const DocsPhotos_1 = require("../DocsPhotos/DocsPhotos");
let SchoolProfile = class SchoolProfile {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn("uuid"),
    __metadata("design:type", String)
], SchoolProfile.prototype, "id", void 0);
__decorate([
    typeorm_1.Column("varchar", { length: 50, nullable: false }),
    __metadata("design:type", String)
], SchoolProfile.prototype, "name", void 0);
__decorate([
    typeorm_1.Column("varchar", { length: 50, nullable: false }),
    __metadata("design:type", String)
], SchoolProfile.prototype, "surname", void 0);
__decorate([
    typeorm_1.Column("varchar", { length: 50, nullable: true }),
    __metadata("design:type", String)
], SchoolProfile.prototype, "logo", void 0);
__decorate([
    typeorm_1.Column("varchar", { length: 30, nullable: false }),
    __metadata("design:type", String)
], SchoolProfile.prototype, "sector", void 0);
__decorate([
    typeorm_1.Column("varchar", { length: 50, nullable: false }),
    __metadata("design:type", String)
], SchoolProfile.prototype, "provider", void 0);
__decorate([
    typeorm_1.Column("varchar", { length: 50, nullable: false }),
    __metadata("design:type", String)
], SchoolProfile.prototype, "type", void 0);
__decorate([
    typeorm_1.Column("timestamp", { precision: 2, nullable: true }),
    __metadata("design:type", Date)
], SchoolProfile.prototype, "dateopened", void 0);
__decorate([
    typeorm_1.Column("timestamp", { precision: 2, nullable: true }),
    __metadata("design:type", Date)
], SchoolProfile.prototype, "recognitiondate", void 0);
__decorate([
    typeorm_1.Column("varchar", { length: 250, nullable: false }),
    __metadata("design:type", String)
], SchoolProfile.prototype, "address", void 0);
__decorate([
    typeorm_1.Column("varchar", { length: 10, nullable: false }),
    __metadata("design:type", String)
], SchoolProfile.prototype, "postalcode", void 0);
__decorate([
    typeorm_1.Column("varchar", { length: 30, nullable: false }),
    __metadata("design:type", String)
], SchoolProfile.prototype, "district", void 0);
__decorate([
    typeorm_1.Column("varchar", { length: 30, nullable: true }),
    __metadata("design:type", String)
], SchoolProfile.prototype, "taluk", void 0);
__decorate([
    typeorm_1.Column("varchar", { length: 25, nullable: true }),
    __metadata("design:type", String)
], SchoolProfile.prototype, "phone", void 0);
__decorate([
    typeorm_1.Column("varchar", { length: 25, nullable: true }),
    __metadata("design:type", String)
], SchoolProfile.prototype, "mobile", void 0);
__decorate([
    typeorm_1.Column("varchar", { length: 100, nullable: false }),
    __metadata("design:type", String)
], SchoolProfile.prototype, "locality", void 0);
__decorate([
    typeorm_1.Column("varchar", { length: 150, nullable: false }),
    __metadata("design:type", String)
], SchoolProfile.prototype, "latitude", void 0);
__decorate([
    typeorm_1.Column("varchar", { length: 150, nullable: false }),
    __metadata("design:type", String)
], SchoolProfile.prototype, "longitude", void 0);
__decorate([
    typeorm_1.OneToMany(type => DocsPhotos_1.DocsPhotos, docs => docs.school),
    __metadata("design:type", Array)
], SchoolProfile.prototype, "documents", void 0);
__decorate([
    typeorm_1.Column("varchar", { nullable: false }),
    __metadata("design:type", String)
], SchoolProfile.prototype, "createdby", void 0);
__decorate([
    typeorm_1.Column("timestamp", {
        precision: 2,
        default: () => "CURRENT_TIMESTAMP(2)"
    }),
    __metadata("design:type", Date)
], SchoolProfile.prototype, "createdon", void 0);
__decorate([
    typeorm_1.Column("varchar", { nullable: true }),
    __metadata("design:type", String)
], SchoolProfile.prototype, "updatedby", void 0);
__decorate([
    typeorm_1.Column("timestamp", {
        precision: 2,
        nullable: true,
        onUpdate: "CURRENT_TIMESTAMP(2)"
    }),
    __metadata("design:type", Date)
], SchoolProfile.prototype, "updatedon", void 0);
SchoolProfile = __decorate([
    typeorm_1.Entity("m_schoolprofile")
], SchoolProfile);
exports.SchoolProfile = SchoolProfile;
//# sourceMappingURL=SchoolProfile.js.map