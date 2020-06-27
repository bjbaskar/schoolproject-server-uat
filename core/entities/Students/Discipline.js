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
const BaseModel_1 = require("../BaseModel");
let Discipline = class Discipline extends BaseModel_1.BaseModel {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Discipline.prototype, "id", void 0);
__decorate([
    typeorm_1.Column("varchar", { length: 255, nullable: false }),
    __metadata("design:type", String)
], Discipline.prototype, "discipline", void 0);
__decorate([
    typeorm_1.Column("timestamp", { nullable: false }),
    __metadata("design:type", Date)
], Discipline.prototype, "date", void 0);
__decorate([
    typeorm_1.Column("varchar", { length: 500 }),
    __metadata("design:type", String)
], Discipline.prototype, "notes", void 0);
Discipline = __decorate([
    typeorm_1.Entity("discipline")
], Discipline);
exports.Discipline = Discipline;
//# sourceMappingURL=Discipline.js.map