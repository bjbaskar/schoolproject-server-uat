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
const LoginHistory_1 = require("../core/entities/Users/LoginHistory");
const ClassSections_1 = require("../core/entities/Master/ClassSections");
let DashboardService = class DashboardService {
    constructor() { }
    getLoginCount(filter) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const qb = typeorm_1.getManager()
                    .createQueryBuilder()
                    .select("hres.*")
                    .from(subQry => {
                    const subQB = subQry
                        .select(["hist.username as username",
                        "hist.os as os",
                        "hist.browser as browser",
                        "hist.cpu as cpu",
                        "hist.device as device",
                        "hist.engine as engine",
                        "DATE_FORMAT(hist.lastlogin, '%Y-%m-%d') as lastlogin"])
                        .addSelect("COUNT(hist.username)", "count")
                        .from(LoginHistory_1.LoginHistory, "hist");
                    if (filter === "TODAY") {
                        const fRange = moment_1.default(new Date()).format("YYYY-MM-DD");
                        subQB.where("DATE_FORMAT(hist.lastlogin, '%Y-%m-%d') = :lastlogin", {
                            lastlogin: fRange
                        });
                    }
                    else if (filter === "YESTERDAY") {
                        const fRange = moment_1.default(new Date()).subtract(1, "days").format("YYYY-MM-DD");
                        subQB.where("DATE_FORMAT(hist.lastlogin, '%Y-%m-%d') = :lastlogin", {
                            lastlogin: fRange
                        });
                    }
                    else {
                        const todayDate = moment_1.default(new Date()).format("YYYY-MM-DD");
                        const range7days = moment_1.default(new Date()).subtract(7, "days").format("YYYY-MM-DD");
                        subQB.andWhere("DATE_FORMAT(hist.lastlogin, '%Y-%m-%d') BETWEEN :startDate AND :toDate", {
                            startDate: range7days,
                            toDate: todayDate
                        });
                    }
                    subQB.groupBy("DATE_FORMAT(hist.lastlogin, '%Y-%m-%d')")
                        .addGroupBy("hist.username")
                        .addGroupBy("hist.os")
                        .addGroupBy("hist.browser")
                        .addGroupBy("hist.cpu")
                        .addGroupBy("hist.device")
                        .addGroupBy("hist.engine");
                    return subQB;
                }, "hres")
                    .orderBy("hres.lastlogin", "DESC");
                const result = yield qb.getRawMany();
                return result;
            }
            catch (error) {
                throw new Error(`Error: Login History. Please change the search criteria`);
            }
        });
    }
    getLoginCountChart(filter) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const qb = typeorm_1.getManager()
                    .getRepository(LoginHistory_1.LoginHistory)
                    .createQueryBuilder("his")
                    .select("COUNT(his.username)", "count");
                if (filter === "TODAY") {
                    qb.addSelect("DATE_FORMAT(his.lastlogin, '%Y-%m-%d %H') as lastlogin")
                        .groupBy("DATE_FORMAT(his.lastlogin, '%Y-%m-%d %H')");
                    const fRange = moment_1.default(new Date()).format("YYYY-MM-DD");
                    qb.where("DATE_FORMAT(his.lastlogin, '%Y-%m-%d') = :lastlogin", {
                        lastlogin: fRange
                    });
                }
                else if (filter === "YESTERDAY") {
                    qb.addSelect("DATE_FORMAT(his.lastlogin, '%Y-%m-%d %H') as lastlogin")
                        .groupBy("DATE_FORMAT(his.lastlogin, '%Y-%m-%d %H')");
                    const fRange = moment_1.default(new Date()).subtract(1, "days").format("YYYY-MM-DD");
                    qb.where("DATE_FORMAT(his.lastlogin, '%Y-%m-%d') = :lastlogin", {
                        lastlogin: fRange
                    });
                }
                else {
                    qb.addSelect("DATE_FORMAT(his.lastlogin, '%Y-%m-%d') as lastlogin")
                        .groupBy("DATE_FORMAT(his.lastlogin, '%Y-%m-%d')");
                    const todayDate = moment_1.default(new Date()).format("YYYY-MM-DD");
                    const range7days = moment_1.default(new Date()).subtract(7, "days").format("YYYY-MM-DD");
                    qb.andWhere("DATE_FORMAT(his.lastlogin, '%Y-%m-%d') BETWEEN :startDate AND :toDate", {
                        startDate: range7days,
                        toDate: todayDate
                    });
                }
                const result = yield qb.getRawMany();
                return result;
            }
            catch (error) {
                throw new Error(`Error: Login History Chart. Please change the search criteria`);
            }
        });
    }
    getStudentCount(classId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const qb = typeorm_1.getManager()
                    .createQueryBuilder()
                    .select(["CONCAT(sq.name, ' ' ,sq.section) as name"])
                    .addSelect(`SUM(CASE WHEN sq.gender = 'male' THEN sq.total ELSE 0 end) as boys`)
                    .addSelect(`SUM(CASE WHEN sq.gender = 'female' THEN sq.total ELSE 0 end) as girls`)
                    .from(subQry => {
                    const subQB = subQry
                        .select("COUNT(*)", "total")
                        .addSelect([
                        "cls.name as name",
                        "cls.section as section",
                        "stud.gender as gender"
                    ])
                        .from(ClassSections_1.ClassSections, "cls")
                        .leftJoin("cls.students", "stud");
                    if (classId) {
                        subQB.where("cls.id = :classId", { classId: classId });
                    }
                    subQB.groupBy("stud.gender")
                        .addGroupBy("cls.name")
                        .addGroupBy("cls.section");
                    return subQB;
                }, "sq")
                    .addGroupBy("sq.name")
                    .addGroupBy("sq.section")
                    .orderBy("sq.name", "ASC")
                    .addOrderBy("sq.section", "ASC");
                const result = yield qb.getRawMany();
                return result;
            }
            catch (error) {
                throw new Error(`Error: getStudentCount. Please change the search criteria`);
            }
        });
    }
};
DashboardService = __decorate([
    inversify_1.injectable(),
    __metadata("design:paramtypes", [])
], DashboardService);
exports.DashboardService = DashboardService;
//# sourceMappingURL=DashboardService.js.map