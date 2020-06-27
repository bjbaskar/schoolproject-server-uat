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
const TextBooks_1 = require("./TextBooks");
const ClassTeacher_1 = require("./ClassTeacher");
let Subject = class Subject {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn("uuid"),
    __metadata("design:type", String)
], Subject.prototype, "id", void 0);
__decorate([
    typeorm_1.Column("varchar", { length: 50, nullable: false }),
    __metadata("design:type", String)
], Subject.prototype, "name", void 0);
__decorate([
    typeorm_1.Column("varchar", { length: 20, nullable: false }),
    __metadata("design:type", String)
], Subject.prototype, "subcode", void 0);
__decorate([
    typeorm_1.Column("varchar", { length: 10 }),
    __metadata("design:type", String)
], Subject.prototype, "color", void 0);
__decorate([
    typeorm_1.Column("varchar", { nullable: false }),
    __metadata("design:type", String)
], Subject.prototype, "createdby", void 0);
__decorate([
    typeorm_1.Column("timestamp", {
        precision: 2,
        default: () => "CURRENT_TIMESTAMP(2)"
    }),
    __metadata("design:type", Date)
], Subject.prototype, "createdon", void 0);
__decorate([
    typeorm_1.Column("varchar", { nullable: true }),
    __metadata("design:type", String)
], Subject.prototype, "updatedby", void 0);
__decorate([
    typeorm_1.Column("timestamp", {
        precision: 2,
        nullable: true,
        onUpdate: "CURRENT_TIMESTAMP(2)"
    }),
    __metadata("design:type", Date)
], Subject.prototype, "updatedon", void 0);
__decorate([
    typeorm_1.ManyToOne(type => TextBooks_1.TextBooks, book => book.subject),
    __metadata("design:type", String)
], Subject.prototype, "textbook", void 0);
__decorate([
    typeorm_1.OneToMany(type => ClassTeacher_1.ClassTeacher, st => st.subject),
    __metadata("design:type", Array)
], Subject.prototype, "classteacher", void 0);
Subject = __decorate([
    typeorm_1.Entity("m_subjects"),
    typeorm_1.Unique(["subcode"])
], Subject);
exports.Subject = Subject;
//# sourceMappingURL=Subject.js.map