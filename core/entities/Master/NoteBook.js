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
let NoteBooks = class NoteBooks {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], NoteBooks.prototype, "id", void 0);
__decorate([
    typeorm_1.Column("varchar", { length: 50, nullable: false }),
    __metadata("design:type", String)
], NoteBooks.prototype, "notebook", void 0);
__decorate([
    typeorm_1.Column("varchar", { length: 100, nullable: false }),
    __metadata("design:type", String)
], NoteBooks.prototype, "company", void 0);
__decorate([
    typeorm_1.Column("int", { nullable: false }),
    __metadata("design:type", String)
], NoteBooks.prototype, "price", void 0);
__decorate([
    typeorm_1.Column("varchar", { length: 250, nullable: false }),
    __metadata("design:type", String)
], NoteBooks.prototype, "notes", void 0);
__decorate([
    typeorm_1.Column("boolean", { nullable: false }),
    __metadata("design:type", Boolean)
], NoteBooks.prototype, "isactive", void 0);
NoteBooks = __decorate([
    typeorm_1.Entity("notebooks")
], NoteBooks);
exports.NoteBooks = NoteBooks;
//# sourceMappingURL=NoteBook.js.map