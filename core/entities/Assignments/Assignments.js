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
const ClassSections_1 = require("../Master/ClassSections");
const Subject_1 = require("../Master/Subject");
const DocsPhotos_1 = require("../DocsPhotos/DocsPhotos");
let Assignment = class Assignment {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn("uuid"),
    __metadata("design:type", String)
], Assignment.prototype, "id", void 0);
__decorate([
    typeorm_1.Column("varchar", { length: 50, nullable: false }),
    __metadata("design:type", String)
], Assignment.prototype, "taskname", void 0);
__decorate([
    typeorm_1.Column("timestamp", {
        nullable: false,
        precision: 2,
        default: () => "CURRENT_TIMESTAMP(2)"
    }),
    __metadata("design:type", Date)
], Assignment.prototype, "duedate", void 0);
__decorate([
    typeorm_1.ManyToMany(type => ClassSections_1.ClassSections),
    typeorm_1.JoinTable({ name: "t_j_asgn_class" }),
    __metadata("design:type", Array)
], Assignment.prototype, "classsec", void 0);
__decorate([
    typeorm_1.ManyToMany(type => Subject_1.Subject),
    typeorm_1.JoinTable({ name: "t_j_asgn_subject" }),
    __metadata("design:type", Array)
], Assignment.prototype, "subject", void 0);
__decorate([
    typeorm_1.Column("varchar", { length: 12, nullable: false }),
    __metadata("design:type", String)
], Assignment.prototype, "priority", void 0);
__decorate([
    typeorm_1.Column("varchar", { length: 25, nullable: true }),
    __metadata("design:type", String)
], Assignment.prototype, "tag", void 0);
__decorate([
    typeorm_1.Column("varchar", { length: 2500, nullable: true }),
    __metadata("design:type", String)
], Assignment.prototype, "notes", void 0);
__decorate([
    typeorm_1.OneToMany(type => DocsPhotos_1.DocsPhotos, docs => docs.assignment),
    __metadata("design:type", Array)
], Assignment.prototype, "documents", void 0);
__decorate([
    typeorm_1.Column("varchar", { nullable: false }),
    __metadata("design:type", String)
], Assignment.prototype, "createdby", void 0);
__decorate([
    typeorm_1.Column("timestamp", {
        precision: 2,
        default: () => "CURRENT_TIMESTAMP(2)"
    }),
    __metadata("design:type", Date)
], Assignment.prototype, "createdon", void 0);
__decorate([
    typeorm_1.Column("varchar", { nullable: true }),
    __metadata("design:type", String)
], Assignment.prototype, "updatedby", void 0);
__decorate([
    typeorm_1.Column("timestamp", {
        precision: 2,
        nullable: true,
        onUpdate: "CURRENT_TIMESTAMP(2)"
    }),
    __metadata("design:type", Date)
], Assignment.prototype, "updatedon", void 0);
Assignment = __decorate([
    typeorm_1.Entity("t_assignment")
], Assignment);
exports.Assignment = Assignment;
//# sourceMappingURL=Assignments.js.map