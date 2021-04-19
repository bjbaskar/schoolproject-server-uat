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
const AcadYear_1 = require("./AcadYear");
const EduSystems_1 = require("./EduSystems");
const Staff_1 = require("../Staff/Staff");
const Student_1 = require("../Students/Student");
const TextBooks_1 = require("./TextBooks");
const ClassTeacher_1 = require("./ClassTeacher");
let ClassSections = class ClassSections {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn("uuid"),
    __metadata("design:type", String)
], ClassSections.prototype, "id", void 0);
__decorate([
    typeorm_1.Column("varchar", { length: 30, nullable: false }),
    __metadata("design:type", String)
], ClassSections.prototype, "name", void 0);
__decorate([
    typeorm_1.Column("varchar", { length: 10, nullable: false }),
    __metadata("design:type", String)
], ClassSections.prototype, "section", void 0);
__decorate([
    typeorm_1.Column("int", { nullable: true }),
    __metadata("design:type", Number)
], ClassSections.prototype, "orderby", void 0);
__decorate([
    typeorm_1.Column("boolean", { default: true }),
    __metadata("design:type", Boolean)
], ClassSections.prototype, "isactive", void 0);
__decorate([
    typeorm_1.Column("varchar", { nullable: false }),
    __metadata("design:type", String)
], ClassSections.prototype, "createdby", void 0);
__decorate([
    typeorm_1.Column("timestamp", {
        precision: 2,
        default: () => "CURRENT_TIMESTAMP(2)"
    }),
    __metadata("design:type", Date)
], ClassSections.prototype, "createdon", void 0);
__decorate([
    typeorm_1.Column("varchar", { nullable: true }),
    __metadata("design:type", String)
], ClassSections.prototype, "updatedby", void 0);
__decorate([
    typeorm_1.Column("timestamp", {
        precision: 2,
        nullable: true,
        onUpdate: "CURRENT_TIMESTAMP(2)"
    }),
    __metadata("design:type", Date)
], ClassSections.prototype, "updatedon", void 0);
__decorate([
    typeorm_1.ManyToOne(type => AcadYear_1.AcadYear, ayr => ayr.classsec),
    __metadata("design:type", String)
], ClassSections.prototype, "academicyear", void 0);
__decorate([
    typeorm_1.ManyToOne(type => EduSystems_1.EduSystems, edu => edu.classsec),
    __metadata("design:type", String)
], ClassSections.prototype, "edusystem", void 0);
__decorate([
    typeorm_1.OneToOne(type => Staff_1.Staff, st => st.classtr),
    typeorm_1.JoinColumn(),
    __metadata("design:type", String)
], ClassSections.prototype, "classteacher", void 0);
__decorate([
    typeorm_1.ManyToOne(type => Staff_1.Staff, st => st.asstclasstr),
    typeorm_1.JoinColumn(),
    __metadata("design:type", String)
], ClassSections.prototype, "asstclassteacher", void 0);
__decorate([
    typeorm_1.ManyToOne(type => TextBooks_1.TextBooks, book => book.class_section),
    __metadata("design:type", String)
], ClassSections.prototype, "textbook", void 0);
__decorate([
    typeorm_1.OneToMany(type => ClassTeacher_1.ClassTeacher, tr => tr.classes),
    typeorm_1.JoinTable({
        name: "m_classteacher"
    }),
    __metadata("design:type", Array)
], ClassSections.prototype, "classteachersub", void 0);
__decorate([
    typeorm_1.ManyToMany(type => Student_1.Students, stud => stud.classsec),
    __metadata("design:type", Array)
], ClassSections.prototype, "students", void 0);
__decorate([
    typeorm_1.Column("boolean", { nullable: false }),
    __metadata("design:type", Boolean)
], ClassSections.prototype, "is_final_year", void 0);
ClassSections = __decorate([
    typeorm_1.Entity("m_classsection")
], ClassSections);
exports.ClassSections = ClassSections;
//# sourceMappingURL=ClassSections.js.map