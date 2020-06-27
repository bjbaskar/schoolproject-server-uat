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
const Holiday_1 = require("../Master/Holiday");
let HolidayNotifications = class HolidayNotifications {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn("uuid"),
    __metadata("design:type", String)
], HolidayNotifications.prototype, "id", void 0);
__decorate([
    typeorm_1.Column("varchar", { length: 250, nullable: false }),
    __metadata("design:type", String)
], HolidayNotifications.prototype, "notifytext", void 0);
__decorate([
    typeorm_1.Column("int", { nullable: true }),
    __metadata("design:type", Number)
], HolidayNotifications.prototype, "notifysend", void 0);
__decorate([
    typeorm_1.Column("varchar", { length: 250, nullable: false }),
    __metadata("design:type", String)
], HolidayNotifications.prototype, "notifyby", void 0);
__decorate([
    typeorm_1.Column("timestamp", {
        precision: 2,
        default: () => "CURRENT_TIMESTAMP(2)"
    }),
    __metadata("design:type", Date)
], HolidayNotifications.prototype, "notifyon", void 0);
__decorate([
    typeorm_1.ManyToOne(type => Holiday_1.Holiday, edu => edu.notification),
    __metadata("design:type", String)
], HolidayNotifications.prototype, "holiday", void 0);
HolidayNotifications = __decorate([
    typeorm_1.Entity("m_hnotifications")
], HolidayNotifications);
exports.HolidayNotifications = HolidayNotifications;
//# sourceMappingURL=Notification.js.map