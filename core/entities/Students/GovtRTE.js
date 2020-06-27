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
const Student_1 = require("./Student");
let GovtRTE = class GovtRTE extends BaseModel_1.BaseModel {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], GovtRTE.prototype, "id", void 0);
__decorate([
    typeorm_1.Column("varchar", { length: 255, nullable: false }),
    __metadata("design:type", Array)
], GovtRTE.prototype, "CWSN", void 0);
__decorate([
    typeorm_1.Column("int", { nullable: false }),
    __metadata("design:type", Number)
], GovtRTE.prototype, "amountreceived", void 0);
__decorate([
    typeorm_1.Column("timestamp", { nullable: false }),
    __metadata("design:type", Date)
], GovtRTE.prototype, "amountdate", void 0);
__decorate([
    typeorm_1.Column("varchar", { length: 150, nullable: false }),
    __metadata("design:type", Array)
], GovtRTE.prototype, "facilitiesprovided", void 0);
__decorate([
    typeorm_1.Column("varchar", { length: 150, nullable: false }),
    __metadata("design:type", String)
], GovtRTE.prototype, "uniformsets", void 0);
__decorate([
    typeorm_1.Column("varchar", { length: 150, nullable: false }),
    __metadata("design:type", String)
], GovtRTE.prototype, "freetextbook", void 0);
__decorate([
    typeorm_1.Column("varchar", { length: 150, nullable: false }),
    __metadata("design:type", String)
], GovtRTE.prototype, "freetransport", void 0);
__decorate([
    typeorm_1.Column("varchar", { length: 500 }),
    __metadata("design:type", String)
], GovtRTE.prototype, "notes", void 0);
__decorate([
    typeorm_1.ManyToOne(type => Student_1.Students, student => student.govtrte),
    __metadata("design:type", Student_1.Students)
], GovtRTE.prototype, "student", void 0);
GovtRTE = __decorate([
    typeorm_1.Entity("s_govtrte")
], GovtRTE);
exports.GovtRTE = GovtRTE;
//# sourceMappingURL=GovtRTE.js.map