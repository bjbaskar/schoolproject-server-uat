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
const Calendar_1 = require("../../core/entities/Master/Calendar");
const exceptions_1 = require("../../core/exceptions");
let CalendarService = class CalendarService {
    constructor() { }
    addCalendar(calendar, currentUser) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const entity = Object.assign(new Calendar_1.Calendar(), calendar);
                entity.createdby = currentUser;
                const startFmt = moment_1.default(calendar.start).toDate();
                const endFmt = moment_1.default(calendar.end).toDate();
                entity.start = startFmt;
                entity.end = endFmt;
                const res = yield typeorm_1.getManager().getRepository(Calendar_1.Calendar).save(entity);
                return res;
            }
            catch (error) {
                throw new exceptions_1.InternalServerError("Unhandled Error", error);
            }
        });
    }
    editCalendar(id, calendar, currentUser) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const edit = Object.assign(new Calendar_1.Calendar(), calendar);
                edit.updatedby = currentUser;
                const startFmt = moment_1.default(calendar.start).toDate();
                const endFmt = moment_1.default(calendar.end).toDate();
                edit.start = startFmt;
                edit.end = endFmt;
                const res = yield typeorm_1.getManager()
                    .getRepository(Calendar_1.Calendar)
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
    delCalendar(id, currentUser) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const res = yield typeorm_1.getManager()
                    .createQueryBuilder()
                    .delete()
                    .from(Calendar_1.Calendar)
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
    listCalendars() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const res = yield typeorm_1.getManager()
                    .getRepository(Calendar_1.Calendar)
                    .createQueryBuilder("calendar")
                    .getMany();
                return res;
            }
            catch (error) {
                throw new Error(`UnHandledError: ${error}`);
            }
        });
    }
    findCalendarById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const res = yield typeorm_1.getManager()
                    .getRepository(Calendar_1.Calendar)
                    .findOne({ where: { id: id } });
                return res;
            }
            catch (error) {
                throw new Error(`UnHandledError: ${error}`);
            }
        });
    }
    getCalendarsByRange(start, end) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                try {
                    const moreThanDate = (date) => typeorm_1.MoreThanOrEqual(moment_1.default(start).format("YYYY-MM-DD HH:MM:SS"));
                    const lessThanDate = (date) => typeorm_1.LessThanOrEqual(moment_1.default(end).format("YYYY-MM-DD HH:MM:SS"));
                    const res = yield typeorm_1.getManager()
                        .getRepository(Calendar_1.Calendar)
                        .createQueryBuilder("calendars")
                        .where("calendars.fromdate = :fromDate AND calendars.todate = :toDate", {
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
    getTodaysEvents() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const todaysDate = moment_1.default(new Date).format("YYYY-MM-DD");
                const res = yield typeorm_1.getManager()
                    .getRepository(Calendar_1.Calendar)
                    .createQueryBuilder("cal")
                    .where("DATE_FORMAT(cal.start, '%Y-%m-%d') = :fromDate", {
                    fromDate: todaysDate,
                })
                    .select("cal.title, cal.description")
                    .getRawMany();
                return res;
            }
            catch (error) {
                throw new Error(`UnHandledError: ${error}`);
            }
        });
    }
};
CalendarService = __decorate([
    inversify_1.injectable(),
    __metadata("design:paramtypes", [])
], CalendarService);
exports.CalendarService = CalendarService;
//# sourceMappingURL=CalendarService.js.map