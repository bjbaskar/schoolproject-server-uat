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
const ClassSections_1 = require("./ClassSections");
const Subject_1 = require("./Subject");
let TextBooks = class TextBooks {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn("uuid"),
    __metadata("design:type", String)
], TextBooks.prototype, "id", void 0);
__decorate([
    typeorm_1.Column("varchar", { length: 100, nullable: false }),
    __metadata("design:type", String)
], TextBooks.prototype, "academicyear", void 0);
__decorate([
    typeorm_1.Column("varchar", { length: 100, nullable: false }),
    __metadata("design:type", String)
], TextBooks.prototype, "edusystem", void 0);
__decorate([
    typeorm_1.ManyToOne(type => ClassSections_1.ClassSections, cls => cls.textbook),
    __metadata("design:type", String)
], TextBooks.prototype, "class_section", void 0);
__decorate([
    typeorm_1.ManyToOne(type => Subject_1.Subject, subj => subj.textbook),
    __metadata("design:type", String)
], TextBooks.prototype, "subject", void 0);
__decorate([
    typeorm_1.Column("varchar", { length: 50, nullable: false }),
    __metadata("design:type", String)
], TextBooks.prototype, "bookname", void 0);
__decorate([
    typeorm_1.Column("varchar", { length: 100, nullable: false }),
    __metadata("design:type", String)
], TextBooks.prototype, "publisher", void 0);
__decorate([
    typeorm_1.Column("varchar", { length: 100, nullable: false }),
    __metadata("design:type", String)
], TextBooks.prototype, "author", void 0);
__decorate([
    typeorm_1.Column("int", { nullable: false }),
    __metadata("design:type", Number)
], TextBooks.prototype, "price", void 0);
__decorate([
    typeorm_1.Column("boolean", { nullable: false }),
    __metadata("design:type", Boolean)
], TextBooks.prototype, "isactive", void 0);
__decorate([
    typeorm_1.Column("varchar", { length: 50, nullable: false }),
    __metadata("design:type", String)
], TextBooks.prototype, "booktype", void 0);
__decorate([
    typeorm_1.Column("varchar", { nullable: false }),
    __metadata("design:type", String)
], TextBooks.prototype, "createdby", void 0);
__decorate([
    typeorm_1.Column("timestamp", {
        precision: 2,
        default: () => "CURRENT_TIMESTAMP(2)"
    }),
    __metadata("design:type", Date)
], TextBooks.prototype, "createdon", void 0);
__decorate([
    typeorm_1.Column("varchar", { nullable: true }),
    __metadata("design:type", String)
], TextBooks.prototype, "updatedby", void 0);
__decorate([
    typeorm_1.Column("timestamp", {
        precision: 2,
        nullable: true,
        onUpdate: "CURRENT_TIMESTAMP(2)"
    }),
    __metadata("design:type", Date)
], TextBooks.prototype, "updatedon", void 0);
TextBooks = __decorate([
    typeorm_1.Entity("m_textbooks")
], TextBooks);
exports.TextBooks = TextBooks;
//# sourceMappingURL=TextBooks.js.map