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
const Notification_1 = require("../Notifications/Notification");
let Holiday = class Holiday {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn("uuid"),
    __metadata("design:type", String)
], Holiday.prototype, "id", void 0);
__decorate([
    typeorm_1.Column("varchar", { length: 50, nullable: false }),
    __metadata("design:type", String)
], Holiday.prototype, "occasion", void 0);
__decorate([
    typeorm_1.Column("varchar", { length: 250, nullable: false }),
    __metadata("design:type", String)
], Holiday.prototype, "description", void 0);
__decorate([
    typeorm_1.Column("varchar", { length: 25, nullable: false }),
    __metadata("design:type", String)
], Holiday.prototype, "holidaytype", void 0);
__decorate([
    typeorm_1.Column("timestamp", { nullable: false }),
    __metadata("design:type", Date)
], Holiday.prototype, "fromdate", void 0);
__decorate([
    typeorm_1.Column("varchar", { length: 10, nullable: false }),
    __metadata("design:type", String)
], Holiday.prototype, "fdayofweek", void 0);
__decorate([
    typeorm_1.Column("timestamp", { nullable: false }),
    __metadata("design:type", Date)
], Holiday.prototype, "todate", void 0);
__decorate([
    typeorm_1.Column("varchar", { length: 10, nullable: false }),
    __metadata("design:type", String)
], Holiday.prototype, "tdayofweek", void 0);
__decorate([
    typeorm_1.Column("varchar", { length: 250, nullable: true }),
    __metadata("design:type", String)
], Holiday.prototype, "comments", void 0);
__decorate([
    typeorm_1.Column("boolean", { nullable: false }),
    __metadata("design:type", Boolean)
], Holiday.prototype, "status", void 0);
__decorate([
    typeorm_1.Column("varchar", { nullable: false }),
    __metadata("design:type", String)
], Holiday.prototype, "createdby", void 0);
__decorate([
    typeorm_1.Column("timestamp", {
        precision: 2,
        default: () => "CURRENT_TIMESTAMP(2)"
    }),
    __metadata("design:type", Date)
], Holiday.prototype, "createdon", void 0);
__decorate([
    typeorm_1.Column("varchar", { nullable: true }),
    __metadata("design:type", String)
], Holiday.prototype, "updatedby", void 0);
__decorate([
    typeorm_1.Column("timestamp", {
        precision: 2,
        nullable: true,
        onUpdate: "CURRENT_TIMESTAMP(2)"
    }),
    __metadata("design:type", Date)
], Holiday.prototype, "updatedon", void 0);
__decorate([
    typeorm_1.OneToMany(type => Notification_1.HolidayNotifications, holi => holi.holiday),
    __metadata("design:type", String)
], Holiday.prototype, "notification", void 0);
Holiday = __decorate([
    typeorm_1.Entity("m_holidays")
], Holiday);
exports.Holiday = Holiday;
//# sourceMappingURL=Holiday.js.map