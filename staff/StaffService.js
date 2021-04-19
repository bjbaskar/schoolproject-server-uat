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
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = require("inversify");
const typeorm_1 = require("typeorm");
const Staff_1 = require("../core/entities/Staff/Staff");
const exceptions_1 = require("../core/exceptions");
const AcadYear_1 = require("../core/entities/Master/AcadYear");
const class_validator_1 = require("class-validator");
let StaffService = class StaffService {
    constructor() {
        this.errorArr = Array();
    }
    addStaffProfile(staff, currentUser) {
        return __awaiter(this, void 0, void 0, function* () {
            this.errorArr = [];
            const validateError = this.validateAll(staff);
            if (validateError.length) {
                this.errorArr = [];
                throw new exceptions_1.BadRequest(`Please enter the mandatory fields. ${validateError}`);
            }
            try {
                const staffNo = yield this.getNewStaffNo();
                const staffEntity = Object.assign(new Staff_1.Staff(), staff);
                staffEntity.staffno = staffNo.staffno;
                staffEntity.prefixyear = staffNo.prefixyear;
                staffEntity.createdby = currentUser;
                const res = yield typeorm_1.getManager()
                    .getRepository(Staff_1.Staff)
                    .save(staffEntity)
                    .catch(error => {
                    throw new exceptions_1.BadRequest(`Staff data not saved ${error}`);
                });
                return res;
            }
            catch (error) {
                throw new exceptions_1.InternalServerError("Unhandled Error: Unable to save", error);
            }
        });
    }
    editStaffProfile(id, staff, currentUser) {
        return __awaiter(this, void 0, void 0, function* () {
            this.errorArr = [];
            const validateError = this.validateAll(staff);
            if (validateError.length) {
                this.errorArr = [];
                throw new exceptions_1.BadRequest(`Please enter the mandatory fields. ${validateError}`);
            }
            try {
                const staffEntity = Object.assign(new Staff_1.Staff(), staff);
                staffEntity.updatedby = currentUser;
                const res = yield typeorm_1.getManager()
                    .getRepository(Staff_1.Staff)
                    .update(id, staffEntity)
                    .catch(error => {
                    throw new exceptions_1.BadRequest(`Staff data not saved ${error}`);
                });
                if (res.raw.affectedRows > 0) {
                    return { Messages: "Updated successfully" };
                }
                else {
                    return { Messages: "No Records Updated" };
                }
            }
            catch (error) {
                throw new exceptions_1.InternalServerError("Unhandled Error: Unable to save", error);
            }
        });
    }
    delStaffProfile(id, currentUser) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const staffEntity = new Staff_1.Staff();
                staffEntity.updatedby = currentUser;
                staffEntity.isactive = false;
                const res = yield typeorm_1.getManager()
                    .getRepository(Staff_1.Staff)
                    .update(id, staffEntity)
                    .catch(error => {
                    throw new exceptions_1.BadRequest(`Staff data not deleted ${error}`);
                });
                if (res.raw.affected >= 1) {
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
    getStaff(id, isactive) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.findStaffById(id, isactive);
        });
    }
    getAllStaff(pageNo, pageSize, sortCol, isAsc, isactive) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const currenPageNo = pageNo - 1;
                const orderBy = sortCol ? sortCol : "staff.firstname";
                const qb = typeorm_1.getManager()
                    .getRepository(Staff_1.Staff)
                    .createQueryBuilder("staff")
                    .where("staff.isactive = :value", { value: isactive })
                    .orderBy(orderBy, isAsc === "ASC" ? "ASC" : "DESC")
                    .skip(currenPageNo * pageSize)
                    .take(pageSize);
                const staff = {
                    rows: qb.getMany(),
                    count: qb.getCount()
                };
                return staff;
            }
            catch (error) {
                throw new exceptions_1.NotFound(`Staff not found. Please change the search criteria`);
            }
        });
    }
    getAllStaffDD(isactive) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const qb = typeorm_1.getManager()
                    .getRepository(Staff_1.Staff)
                    .createQueryBuilder("staff")
                    .where("staff.isactive = :value", { value: true })
                    .orderBy("staff.firstname", "ASC");
                const res = qb.getMany();
                return res;
            }
            catch (error) {
                throw new exceptions_1.NotFound(`Staff not found. Please change the search criteria`);
            }
        });
    }
    findStaffById(id, isactive) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const staff = yield typeorm_1.getManager()
                    .getRepository(Staff_1.Staff)
                    .createQueryBuilder("staff")
                    .where("staff.id = :value", { value: id })
                    .andWhere("staff.isactive = :isactive", { isactive: isactive })
                    .getOne();
                return staff;
            }
            catch (error) {
                throw new exceptions_1.InternalServerError("Unhandled Error", error);
            }
        });
    }
    getNewStaffNo() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { staffno } = yield typeorm_1.getManager()
                    .getRepository(Staff_1.Staff)
                    .createQueryBuilder("staff")
                    .select("MAX(staff.staffno)", "staffno")
                    .getRawOne();
                if (!staffno) {
                    staffno = 0;
                }
                staffno = Number(staffno) + 1;
                let getPrefixYear = yield typeorm_1.getManager()
                    .getRepository(AcadYear_1.AcadYear)
                    .createQueryBuilder("acadyear")
                    .select("acadyear.prefixyear", "prefixyear")
                    .where("acadyear.isactive = :active", { active: true })
                    .getRawOne();
                if (!getPrefixYear) {
                    getPrefixYear = new Date().getFullYear().toString().substr(-2);
                }
                else {
                    getPrefixYear = getPrefixYear.prefixyear;
                }
                return { staffno: staffno, prefixyear: getPrefixYear };
            }
            catch (error) {
                throw new exceptions_1.InternalServerError("Unhandled Error", error);
            }
        });
    }
    validateAll(staff) {
        this.validateStaff(staff);
        return this.errorArr;
    }
    validateStaff(staff) {
        const validator = new class_validator_1.Validator();
        if (validator.isEmpty(staff))
            this.errorArr.push("Student profile can not be empty");
        if (validator.isEmpty(staff.firstname))
            this.errorArr.push("First name can not be empty");
        if (validator.isEmpty(staff.lastname))
            this.errorArr.push("Last name can not be empty");
        if (validator.isEmpty(staff.gender))
            this.errorArr.push("Gender can not be empty");
        if (validator.isEmpty(staff.designation))
            this.errorArr.push("Designation can not be empty");
        if (validator.isDate(staff.dob))
            this.errorArr.push("Date of Birth can not be empty");
        if (validator.isDate(staff.doj))
            this.errorArr.push("Date of Join can not be empty");
        return this.errorArr;
    }
};
StaffService = __decorate([
    inversify_1.injectable(),
    __metadata("design:paramtypes", [])
], StaffService);
exports.StaffService = StaffService;
//# sourceMappingURL=StaffService.js.map