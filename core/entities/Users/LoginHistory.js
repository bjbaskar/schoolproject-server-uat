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
let LoginHistory = class LoginHistory {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn("uuid"),
    __metadata("design:type", String)
], LoginHistory.prototype, "id", void 0);
__decorate([
    typeorm_1.Column("varchar", { length: 20, nullable: false }),
    __metadata("design:type", String)
], LoginHistory.prototype, "username", void 0);
__decorate([
    typeorm_1.Column("varchar", { length: 100, nullable: true }),
    __metadata("design:type", String)
], LoginHistory.prototype, "browser", void 0);
__decorate([
    typeorm_1.Column("varchar", { length: 100, nullable: true }),
    __metadata("design:type", String)
], LoginHistory.prototype, "cpu", void 0);
__decorate([
    typeorm_1.Column("varchar", { length: 100, nullable: true }),
    __metadata("design:type", String)
], LoginHistory.prototype, "device", void 0);
__decorate([
    typeorm_1.Column("varchar", { length: 100, nullable: true }),
    __metadata("design:type", String)
], LoginHistory.prototype, "engine", void 0);
__decorate([
    typeorm_1.Column("varchar", { length: 100, nullable: true }),
    __metadata("design:type", String)
], LoginHistory.prototype, "os", void 0);
__decorate([
    typeorm_1.Column("varchar", { length: 50, nullable: true }),
    __metadata("design:type", String)
], LoginHistory.prototype, "sessionid", void 0);
__decorate([
    typeorm_1.Column("timestamp", {
        nullable: true,
        precision: 2,
        default: () => "CURRENT_TIMESTAMP(2)"
    }),
    __metadata("design:type", Date)
], LoginHistory.prototype, "lastlogin", void 0);
__decorate([
    typeorm_1.Column("timestamp", {
        nullable: true,
        precision: 2,
    }),
    __metadata("design:type", Date)
], LoginHistory.prototype, "lastlogout", void 0);
LoginHistory = __decorate([
    typeorm_1.Entity("m_loginhistory")
], LoginHistory);
exports.LoginHistory = LoginHistory;
//# sourceMappingURL=LoginHistory.js.map