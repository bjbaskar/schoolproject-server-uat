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
const lodash_1 = __importDefault(require("lodash"));
const moment_1 = __importDefault(require("moment"));
const exceptions_1 = require("../core/exceptions");
const Attendance_1 = require("../core/entities/Attendance/Attendance");
const ClassSections_1 = require("../core/entities/Master/ClassSections");
const Student_1 = require("../core/entities/Students/Student");
let AttendanceService = class AttendanceService {
    constructor() { }
    addStudAttendance(input, currentUser) {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = typeorm_1.getConnection();
            const queryRunner = connection.createQueryRunner();
            try {
                yield queryRunner.connect();
                yield queryRunner.startTransaction();
                const oData = [];
                const studentsId = input.studentid;
                const allPresent = input.allpresent;
                if (allPresent === false && studentsId.length) {
                    for (let i = 0; i <= studentsId.length - 1; i++) {
                        const entity = new Attendance_1.Attendance();
                        entity.attdate = input.attdate;
                        entity.classid = input.classid;
                        entity.allpresent = input.allpresent;
                        entity.session = input.session;
                        entity.notes = input.notes;
                        entity.studentid = studentsId[i];
                        entity.createdby = currentUser;
                        oData.push(entity);
                    }
                }
                else {
                    const entity = new Attendance_1.Attendance();
                    entity.attdate = input.attdate;
                    entity.classid = input.classid;
                    entity.allpresent = input.allpresent;
                    entity.session = input.session;
                    entity.notes = input.notes;
                    entity.studentid = undefined;
                    entity.createdby = currentUser;
                    oData.push(entity);
                }
                const result = yield queryRunner.manager
                    .getRepository(Attendance_1.Attendance)
                    .save(oData);
                yield queryRunner.commitTransaction();
                if (result) {
                    return { Messages: "Attendance updated successfully" };
                }
                else {
                    return { Messages: "No Records updated" };
                }
            }
            catch (error) {
                yield queryRunner.rollbackTransaction();
                throw new exceptions_1.InternalServerError("addStudAttendance Unhandled Error: Unable to save", error);
            }
            finally {
                yield queryRunner.release();
            }
        });
    }
    editStudAttendance(input, currentUser) {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = typeorm_1.getConnection();
            const queryRunner = connection.createQueryRunner();
            try {
                yield queryRunner.connect();
                yield queryRunner.startTransaction();
                const oData = [];
                const studentsId = input.studentid;
                const allPresent = input.allpresent;
                const todaysDate = moment_1.default(input.attdate).format("YYYY-MM-DD");
                let result = undefined;
                if (allPresent === false && studentsId.length) {
                    for (let i = 0; i <= studentsId.length - 1; i++) {
                        const entity = new Attendance_1.Attendance();
                        entity.attdate = input.attdate;
                        entity.classid = input.classid;
                        entity.allpresent = input.allpresent;
                        entity.session = input.session;
                        entity.notes = input.notes;
                        entity.studentid = studentsId[i];
                        entity.createdby = currentUser;
                        oData.push(entity);
                    }
                }
                else {
                    const entity = new Attendance_1.Attendance();
                    entity.attdate = input.attdate;
                    entity.classid = input.classid;
                    entity.allpresent = input.allpresent;
                    entity.session = input.session;
                    entity.notes = input.notes;
                    entity.studentid = undefined;
                    entity.createdby = currentUser;
                    oData.push(entity);
                }
                const res = yield queryRunner.manager
                    .createQueryBuilder()
                    .delete()
                    .from(Attendance_1.Attendance)
                    .where("classid = :classid", { classid: input.classid })
                    .andWhere("DATE_FORMAT(attdate, '%Y-%m-%d') = :cDate", { cDate: todaysDate })
                    .execute();
                if (res.affected >= 1) {
                    result = yield queryRunner.manager
                        .getRepository(Attendance_1.Attendance)
                        .save(oData);
                }
                else {
                    return { Messages: "No Records updated" };
                }
                yield queryRunner.commitTransaction();
                if (result) {
                    return { Messages: "Attendance updated successfully" };
                }
                else {
                    return { Messages: "No Records updated" };
                }
            }
            catch (error) {
                yield queryRunner.rollbackTransaction();
                throw new exceptions_1.InternalServerError("addStudAttendance Unhandled Error: Unable to save", error);
            }
            finally {
                yield queryRunner.release();
            }
        });
    }
    getStudAttByClass(classId, currDate) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let isNew = true;
                let result = undefined;
                const todaysDate = moment_1.default(currDate).format("YYYY-MM-DD");
                const count = yield this.getStudAttCount(classId, todaysDate);
                if (count > 0) {
                    isNew = false;
                }
                if (isNew) {
                    result = yield typeorm_1.getManager()
                        .getRepository(Student_1.Students)
                        .createQueryBuilder("st")
                        .select(["st.id", "st.firstname", "st.lastname", "st.gender"])
                        .leftJoinAndSelect("st.classsec", "classsec")
                        .where("st.isactive = true")
                        .andWhere("classsec.id = :id", { id: classId })
                        .orderBy("st.gender", "DESC")
                        .addOrderBy("st.firstname", "ASC")
                        .addOrderBy("st.lastname", "ASC")
                        .getMany();
                }
                else {
                    const allPresent = yield this.getAllPresentStudent(classId, todaysDate);
                    if (allPresent.length > 0) {
                        result = allPresent;
                    }
                    else {
                        const absentees = typeorm_1.getManager()
                            .createQueryBuilder()
                            .select(["att.studId AS id",
                            "att.firstname",
                            "att.lastname",
                            "att.gender",
                            "'absent' AS selected"])
                            .from(subQry => {
                            const qb = subQry
                                .select([
                                "a.id",
                                "s.id AS studId",
                                "s.firstname AS firstname",
                                "s.lastname AS lastname",
                                "s.gender AS gender"
                            ])
                                .from(Attendance_1.Attendance, "a")
                                .leftJoin("a.studentid", "s")
                                .where("a.classid = :classid", { classid: classId })
                                .andWhere("DATE_FORMAT(a.attdate, '%Y-%m-%d') = :cDate", { cDate: todaysDate });
                            return qb;
                        }, "att");
                        const getAttSQL = yield typeorm_1.getManager()
                            .getRepository(Attendance_1.Attendance)
                            .createQueryBuilder("a")
                            .select("a.studentid")
                            .where("a.classid = :classid")
                            .andWhere("DATE_FORMAT(a.attdate, '%Y-%m-%d') = :cDate")
                            .getQuery();
                        const present = typeorm_1.getManager()
                            .getRepository(Student_1.Students)
                            .createQueryBuilder("s")
                            .select([
                            "s.id AS id",
                            "s.firstname AS firstname",
                            "s.lastname AS lastname",
                            "s.gender AS gender",
                            "'present' AS selected"
                        ])
                            .leftJoin("s.classsec", "c")
                            .where("c.id = :classId", { classId: classId })
                            .andWhere("s.id NOT IN (" + getAttSQL + ") ")
                            .setParameter("classid", classId)
                            .setParameter("cDate", todaysDate);
                        const abData = yield absentees.getRawMany();
                        const prData = yield present.getRawMany();
                        result = lodash_1.default.concat(abData, prData);
                        result = lodash_1.default.orderBy(result, [
                            "gender", "firstname", "lastname"
                        ], ["desc", "asc", "asc"]);
                    }
                }
                return {
                    students: result,
                    isnew: isNew
                };
            }
            catch (error) {
                throw new exceptions_1.NotFound(`Student not found. Please change the search criteria`);
            }
        });
    }
    getPieChartByMonth(classId, studentId, currMonth) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const clsCount = yield typeorm_1.getManager()
                    .getRepository(Attendance_1.Attendance)
                    .createQueryBuilder("a")
                    .where("a.classid = :classid", { classid: classId })
                    .andWhere("DATE_FORMAT(a.attdate, '%m') = :cDate", {
                    cDate: currMonth
                })
                    .getCount();
                const studCount = yield typeorm_1.getManager()
                    .getRepository(Attendance_1.Attendance)
                    .createQueryBuilder("a")
                    .where("a.classid = :classid", { classid: classId })
                    .andWhere("a.studentid = :studId", { studId: studentId })
                    .andWhere("DATE_FORMAT(a.attdate, '%m') = :cDate", {
                    cDate: currMonth
                })
                    .getCount();
                const noOfDaysPresent = clsCount - studCount;
                let percentage = (((noOfDaysPresent | 0) / clsCount) * 100).toFixed(1);
                if (noOfDaysPresent === 0) {
                    percentage = "0";
                }
                if (isNaN(Number(percentage))) {
                    percentage = "0";
                }
                if (clsCount === 0 && studCount === 0) {
                    throw new exceptions_1.NotFound(`No Records found for the selected month`);
                }
                const response = {
                    chartdata: [{
                            x: "Present", y: noOfDaysPresent
                        }, {
                            x: "Absent", y: studCount
                        }],
                    attrate: percentage
                };
                return response;
            }
            catch (error) {
                throw new exceptions_1.NotFound(`getPieChartByMonth Error: Please change the search criteria`);
            }
        });
    }
    getPieChartClassWiseByMonth(classId, currMonth) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const clsCount = yield this.getNoWorkingDays(classId, currMonth);
                const studAbsCount = yield typeorm_1.getManager()
                    .getRepository(Attendance_1.Attendance)
                    .createQueryBuilder("a")
                    .where("a.classid = :classid", { classid: classId })
                    .andWhere("a.studentid IS NOT NULL")
                    .andWhere("DATE_FORMAT(a.attdate, '%m') = :cDate", {
                    cDate: currMonth
                })
                    .getCount();
                const noOfDaysPresent = clsCount - studAbsCount;
                let percentage = (((noOfDaysPresent | 0) / clsCount) * 100).toFixed(1);
                if (noOfDaysPresent === 0) {
                    percentage = "0";
                }
                if (isNaN(Number(percentage))) {
                    percentage = "0";
                }
                if (clsCount === 0 && studAbsCount === 0) {
                    throw new exceptions_1.NotFound(`No Records found for the selected month`);
                }
                const response = {
                    chartdata: [{
                            x: "Present", y: noOfDaysPresent
                        }, {
                            x: "Absent", y: studAbsCount
                        }],
                    attrate: percentage
                };
                return response;
            }
            catch (error) {
                throw new exceptions_1.NotFound(`getPieChartByMonth Error: Please change the search criteria`);
            }
        });
    }
    getNoWorkingDays(classId, currMonth) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const res = yield typeorm_1.getManager()
                    .getRepository(Attendance_1.Attendance)
                    .createQueryBuilder("a")
                    .where("a.classid = :classid", { classid: classId })
                    .andWhere("DATE_FORMAT(a.attdate, '%m') = :cDate", {
                    cDate: currMonth
                })
                    .getCount();
                return res;
            }
            catch (error) {
                throw new exceptions_1.NotFound(`getNoWorkingDays Error: Please change the search criteria`);
            }
        });
    }
    getStudAttCount(classId, currDate) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield typeorm_1.getManager()
                    .getRepository(Attendance_1.Attendance)
                    .createQueryBuilder("a")
                    .where("a.classid = :classid", { classid: classId })
                    .andWhere("DATE_FORMAT(a.attdate, '%Y-%m-%d') = :cDate", { cDate: currDate })
                    .getCount();
                return result;
            }
            catch (error) {
                throw new exceptions_1.NotFound(`Error: Attendance not found. Please change the search criteria`);
            }
        });
    }
    getAllPresentStudent(classId, todaysDate) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield typeorm_1.getManager()
                    .getRepository(Attendance_1.Attendance)
                    .createQueryBuilder("a")
                    .select([
                    "s.id AS id",
                    "s.firstname AS firstname",
                    "s.lastname AS lastname",
                    "s.gender AS gender",
                    "'present' AS selected"
                ])
                    .leftJoin(ClassSections_1.ClassSections, "c", "c.id = a.classid")
                    .leftJoin("c.students", "s")
                    .where("a.classid = :classid")
                    .andWhere("DATE_FORMAT(a.attdate, '%Y-%m-%d') = :cDate")
                    .andWhere("a.allpresent = true")
                    .setParameter("classid", classId)
                    .setParameter("cDate", todaysDate)
                    .orderBy("s.gender", "DESC")
                    .addOrderBy("s.firstname", "ASC")
                    .addOrderBy("s.lastname", "ASC")
                    .getRawMany();
                return result;
            }
            catch (error) {
                throw new exceptions_1.NotFound(`Error: getAllPresentStudent Attendance not found. Please change the search criteria`);
            }
        });
    }
    getClassStrength(classId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield typeorm_1.getManager()
                    .getRepository(Student_1.Students)
                    .createQueryBuilder("st")
                    .where("st.isactive = true")
                    .andWhere("classsec.id = :id", { id: classId })
                    .getCount();
                return result;
            }
            catch (error) {
                throw new exceptions_1.NotFound(`getClassStrength Error:`);
            }
        });
    }
};
AttendanceService = __decorate([
    inversify_1.injectable(),
    __metadata("design:paramtypes", [])
], AttendanceService);
exports.AttendanceService = AttendanceService;
//# sourceMappingURL=AttendanceService.js.map