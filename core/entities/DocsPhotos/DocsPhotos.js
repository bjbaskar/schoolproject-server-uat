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
const Staff_1 = require("../Staff/Staff");
const Student_1 = require("../Students/Student");
const SchoolProfile_1 = require("../Master/SchoolProfile");
const Assignments_1 = require("../Assignments/Assignments");
let DocsPhotos = class DocsPhotos {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn("uuid"),
    __metadata("design:type", String)
], DocsPhotos.prototype, "id", void 0);
__decorate([
    typeorm_1.Column("varchar", { length: 50, nullable: false }),
    __metadata("design:type", String)
], DocsPhotos.prototype, "name", void 0);
__decorate([
    typeorm_1.Column("varchar", { length: 20, nullable: false }),
    __metadata("design:type", String)
], DocsPhotos.prototype, "modulename", void 0);
__decorate([
    typeorm_1.Column("varchar", { length: 20, nullable: false }),
    __metadata("design:type", String)
], DocsPhotos.prototype, "doctype", void 0);
__decorate([
    typeorm_1.Column("varchar", { length: 50, nullable: false }),
    __metadata("design:type", String)
], DocsPhotos.prototype, "docid", void 0);
__decorate([
    typeorm_1.Column("varchar", { length: 50, nullable: true }),
    __metadata("design:type", String)
], DocsPhotos.prototype, "filesize", void 0);
__decorate([
    typeorm_1.Column("varchar", { length: 150, nullable: true }),
    __metadata("design:type", String)
], DocsPhotos.prototype, "filetype", void 0);
__decorate([
    typeorm_1.ManyToOne(type => Staff_1.Staff, staff => staff.documents, { nullable: true }),
    __metadata("design:type", String)
], DocsPhotos.prototype, "staff", void 0);
__decorate([
    typeorm_1.ManyToOne(type => Student_1.Students, student => student.documents, { nullable: true }),
    __metadata("design:type", String)
], DocsPhotos.prototype, "student", void 0);
__decorate([
    typeorm_1.ManyToOne(type => SchoolProfile_1.SchoolProfile, school => school.documents, { nullable: true }),
    __metadata("design:type", String)
], DocsPhotos.prototype, "school", void 0);
__decorate([
    typeorm_1.ManyToOne(type => Assignments_1.Assignment, asgn => asgn.documents, { nullable: true }),
    __metadata("design:type", String)
], DocsPhotos.prototype, "assignment", void 0);
__decorate([
    typeorm_1.Column("varchar", { nullable: false }),
    __metadata("design:type", String)
], DocsPhotos.prototype, "createdby", void 0);
__decorate([
    typeorm_1.Column("timestamp", {
        precision: 2,
        default: () => "CURRENT_TIMESTAMP(2)"
    }),
    __metadata("design:type", Date)
], DocsPhotos.prototype, "createdon", void 0);
DocsPhotos = __decorate([
    typeorm_1.Entity("c_docsphotos")
], DocsPhotos);
exports.DocsPhotos = DocsPhotos;
//# sourceMappingURL=DocsPhotos.js.map