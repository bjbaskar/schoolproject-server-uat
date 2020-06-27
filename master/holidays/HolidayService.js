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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = require("inversify");
const typeorm_1 = require("typeorm");
const moment_1 = __importDefault(require("moment"));
const Holiday_1 = require("../../core/entities/Master/Holiday");
const exceptions_1 = require("../../core/exceptions");
let HolidayService = class HolidayService {
    constructor() { }
    addHoliday(holiday, currentUser) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const entity = Object.assign(new Holiday_1.Holiday(), holiday);
                entity.createdby = currentUser;
                const res = yield typeorm_1.getManager().getRepository(Holiday_1.Holiday).save(entity);
                return res;
            }
            catch (error) {
                throw new exceptions_1.InternalServerError("Unhandled Error", error);
            }
        });
    }
    editHoliday(id, holiday, currentUser) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const edit = Object.assign(new Holiday_1.Holiday(), holiday);
                edit.updatedby = currentUser;
                const res = yield typeorm_1.getManager()
                    .getRepository(Holiday_1.Holiday)
                    .update(id, edit);
                if (res.raw.affectedRows > 0) {
                    return { Messages: "Updated successfully" };
                }
                else {
                    return { Messages: "No Records Updated" };
                }
            }
            catch (error) {
                throw new exceptions_1.InternalServerError("Unhandled Error", error);
            }
        });
    }
    delHoliday(id, currentUser) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const res = yield typeorm_1.getManager()
                    .createQueryBuilder()
                    .delete()
                    .from(Holiday_1.Holiday)
                    .where("id = :id", { id: id })
                    .execute();
                if (res.affected >= 1) {
                    return { Messages: "Deleted successfully" };
                }
                else {
                    return { Messages: "No Records Deleted" };
                }
            }
            catch (error) {
                throw new exceptions_1.InternalServerError("Unhandled Error", error);
            }
        });
    }
    listHolidays() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const res = yield typeorm_1.getManager()
                    .getRepository(Holiday_1.Holiday)
                    .createQueryBuilder("holiday")
                    .orderBy("holiday.fromdate", "ASC")
                    .getMany();
                return res;
            }
            catch (error) {
                throw new Error(`UnHandledError: ${error}`);
            }
        });
    }
    findHolidayById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const res = yield typeorm_1.getManager()
                    .getRepository(Holiday_1.Holiday)
                    .findOne({ where: { id: id } });
                return res;
            }
            catch (error) {
                throw new Error(`UnHandledError: ${error}`);
            }
        });
    }
    getHolidaysByRange(fromdate, todate) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                try {
                    const moreThanDate = (date) => typeorm_1.MoreThanOrEqual(moment_1.default(fromdate).format("YYYY-MM-DD HH:MM:SS"));
                    const lessThanDate = (date) => typeorm_1.LessThanOrEqual(moment_1.default(todate).format("YYYY-MM-DD HH:MM:SS"));
                    const res = yield typeorm_1.getManager()
                        .getRepository(Holiday_1.Holiday)
                        .createQueryBuilder("holidays")
                        .where("holidays.fromdate = :fromDate AND holidays.todate = :toDate", {
                        fromDate: moreThanDate,
                        toDate: lessThanDate
                    })
                        .getMany();
                    return res;
                }
                catch (error) {
                    throw new Error(`UnHandledError: ${error}`);
                }
            }
            catch (error) {
                throw new exceptions_1.InternalServerError("Unhandled Error", error);
            }
        });
    }
};
HolidayService = __decorate([
    inversify_1.injectable(),
    __metadata("design:paramtypes", [])
], HolidayService);
exports.HolidayService = HolidayService;
//# sourceMappingURL=HolidayService.js.map