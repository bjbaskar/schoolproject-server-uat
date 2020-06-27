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
let Feedback = class Feedback {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn("uuid"),
    __metadata("design:type", String)
], Feedback.prototype, "id", void 0);
__decorate([
    typeorm_1.Column("int", { nullable: true }),
    __metadata("design:type", Number)
], Feedback.prototype, "rating", void 0);
__decorate([
    typeorm_1.Column("text", { nullable: false }),
    __metadata("design:type", String)
], Feedback.prototype, "desc", void 0);
__decorate([
    typeorm_1.Column("text", { nullable: true }),
    __metadata("design:type", String)
], Feedback.prototype, "qa", void 0);
__decorate([
    typeorm_1.Column("varchar", { length: 50, nullable: true }),
    __metadata("design:type", String)
], Feedback.prototype, "staff", void 0);
__decorate([
    typeorm_1.Column("varchar", { length: 50, nullable: true }),
    __metadata("design:type", String)
], Feedback.prototype, "student", void 0);
__decorate([
    typeorm_1.Column("varchar", { nullable: false }),
    __metadata("design:type", String)
], Feedback.prototype, "createdby", void 0);
__decorate([
    typeorm_1.Column("timestamp", {
        precision: 2,
        default: () => "CURRENT_TIMESTAMP(2)"
    }),
    __metadata("design:type", Date)
], Feedback.prototype, "createdon", void 0);
Feedback = __decorate([
    typeorm_1.Entity("c_feedback")
], Feedback);
exports.Feedback = Feedback;
//# sourceMappingURL=Feedback.js.map