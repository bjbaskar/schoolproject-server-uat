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
const Student_1 = require("../core/entities/Students/Student");
const exceptions_1 = require("../core/exceptions");
const Address_1 = require("../core/entities/Students/Address");
const Parents_1 = require("../core/entities/Students/Parents");
const AcadYear_1 = require("../core/entities/Master/AcadYear");
const class_validator_1 = require("class-validator");
let StudentService = class StudentService {
    constructor() {
        this.errorArr = Array();
    }
    addNewAdmission(profile, parents, address, classId, currentUser) {
        return __awaiter(this, void 0, void 0, function* () {
            this.errorArr = [];
            const validateError = this.validateAll(profile, parents, address);
            if (validateError.length) {
                this.errorArr = [];
                throw new Error(`Please enter the mandatory fields. ${validateError}`);
            }
            const connection = typeorm_1.getConnection();
            const queryRunner = connection.createQueryRunner();
            try {
                yield queryRunner.connect();
                yield queryRunner.startTransaction();
                const studNo = yield this.getNewStudentNo();
                const addressEntity = Object.assign(new Address_1.Address(), address);
                addressEntity.createdby = currentUser;
                yield queryRunner.manager.save(addressEntity)
                    .catch(error => {
                    throw new exceptions_1.NotFound("Unable to save", error);
                });
                const parentsEntity = Object.assign(new Parents_1.Parents(), parents);
                parentsEntity.address = [addressEntity];
                parentsEntity.createdby = currentUser;
                yield queryRunner.manager.save(parentsEntity)
                    .catch(error => {
                    throw new exceptions_1.NotFound("Unable to save", error);
                });
                const studentEntity = Object.assign(new Student_1.Students(), profile);
                studentEntity.studentno = studNo.studentno;
                studentEntity.prefixyear = studNo.prefixyear;
                studentEntity.parents = [parentsEntity];
                studentEntity.createdby = currentUser;
                const res = yield queryRunner.manager.save(studentEntity)
                    .then(stud => {
                    return stud;
                })
                    .catch(error => {
                    throw new exceptions_1.NotFound("Unable to save", error);
                });
                const studentId = res.id;
                const response = yield this.addStudentClass(studentId, classId, queryRunner.manager);
                yield queryRunner.commitTransaction();
                if (response) {
                    return res;
                }
                else {
                    throw new exceptions_1.InternalServerError("Unhandled Error: Unable to save");
                }
            }
            catch (error) {
                yield queryRunner.rollbackTransaction();
                throw new exceptions_1.InternalServerError("Unhandled Error: Unable to save", error);
            }
            finally {
                yield queryRunner.release();
            }
        });
    }
    addStudentClass(studentId, classId, queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (studentId.length === 0 || !classId.length) {
                    throw new exceptions_1.BadRequest("Student Id or Class Id is missing.");
                }
                const res = yield queryRunner
                    .getRepository(Student_1.Students)
                    .createQueryBuilder()
                    .relation(Student_1.Students, "classsec")
                    .of(studentId)
                    .add(classId)
                    .then(res => {
                    return { Messages: "Student has been admitted to the Class" };
                })
                    .catch(err => {
                    throw new exceptions_1.BadMapping("Student and Class Mapping not match. Please select Student and Class");
                });
                return res;
            }
            catch (error) {
                throw error;
            }
        });
    }
    editProfileParents(id, profile, parents, classId, currentUser) {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = typeorm_1.getConnection();
            const queryRunner = connection.createQueryRunner();
            try {
                yield queryRunner.connect();
                yield queryRunner.startTransaction();
                this.errorArr = [];
                const validateError = this.validateStudent(profile);
                if (validateError.length) {
                    this.errorArr = [];
                    throw new exceptions_1.BadRequest(`Please enter the mandatory fields. ${validateError}`);
                }
                const studentEntity = Object.assign(new Student_1.Students(), profile);
                studentEntity.updatedby = currentUser;
                const profileRes = yield queryRunner.manager
                    .getRepository(Student_1.Students)
                    .update(id, studentEntity);
                const parentsRes = yield this.editParents(parents, currentUser, queryRunner.manager);
                yield queryRunner.commitTransaction();
                return profileRes;
            }
            catch (error) {
                yield queryRunner.rollbackTransaction();
                throw new exceptions_1.InternalServerError("Unhandled Error", error);
            }
            finally {
                yield queryRunner.release();
            }
        });
    }
    editStudentClass(studentId, classId, queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let success = false;
                if (!classId || !studentId) {
                    throw new exceptions_1.BadRequest("Student Id or Class Id is missing");
                }
                const isExists = yield typeorm_1.getManager()
                    .getRepository(Student_1.Students)
                    .createQueryBuilder("stud")
                    .leftJoinAndSelect("stud.classsec", "classsec")
                    .select(["stud.id", "classsec.id"])
                    .where("stud.id = :studId", { studId: studentId })
                    .getMany();
                const chkArray = [""];
                isExists.map((v) => {
                    return v.classsec.map((m) => {
                        return chkArray.push(m.id);
                    });
                });
                if (isExists.length) {
                    yield queryRunner
                        .getRepository(Student_1.Students)
                        .createQueryBuilder()
                        .relation(Student_1.Students, "classsec")
                        .of(studentId)
                        .remove(chkArray)
                        .then(() => {
                        success = true;
                        return true;
                    })
                        .catch(err => {
                        success = false;
                        throw new exceptions_1.BadMapping("Remove Failed: Student and Class Mapping not match. Please select Student and Class.");
                    });
                }
                if (success) {
                    yield queryRunner
                        .getRepository(Student_1.Students)
                        .createQueryBuilder()
                        .relation(Student_1.Students, "classsec")
                        .of(studentId)
                        .add(classId)
                        .then(res => {
                        return { Messages: "Student has been assigned to the Class" };
                    })
                        .catch(err => {
                        throw new exceptions_1.BadMapping("Student and Class Mapping not match. Please select Student and Class");
                    });
                }
                return true;
            }
            catch (error) {
                throw new exceptions_1.BadMapping("Student and Class Mapping not match. Please select Student and Class.");
            }
        });
    }
    editParents(parents, currentUser, queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.errorArr = [];
                const validateError = this.validateParents(parents);
                if (validateError.length) {
                    this.errorArr = [];
                    throw new exceptions_1.BadRequest(`Please enter the mandatory fields. ${validateError}`);
                }
                const parentsEntity = Object.assign(new Parents_1.Parents(), parents);
                parentsEntity.updatedby = currentUser;
                const parentId = parents.id;
                const res = yield queryRunner
                    .getRepository(Parents_1.Parents)
                    .update(parentId, parentsEntity);
                return res;
            }
            catch (error) {
                throw new exceptions_1.InternalServerError("Unhandled Error", error);
            }
        });
    }
    editAddress(id, address, currentUser) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.errorArr = [];
                const validateError = this.validateAddress(address);
                if (validateError.length) {
                    this.errorArr = [];
                    throw new exceptions_1.BadRequest(`Please enter the mandatory fields. ${validateError}`);
                }
                const addressEntity = Object.assign(new Address_1.Address(), address);
                addressEntity.updatedby = currentUser;
                const res = yield typeorm_1.getManager()
                    .getRepository(Address_1.Address)
                    .update(id, addressEntity);
                return res;
            }
            catch (error) {
                throw new exceptions_1.InternalServerError("Unhandled Error", error);
            }
        });
    }
    studentParentsAdd(id, parents, currentUser) {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = typeorm_1.getConnection();
            const queryRunner = connection.createQueryRunner();
            try {
                yield queryRunner.connect();
                yield queryRunner.startTransaction();
                this.errorArr = [];
                const validateError = this.validateParents(parents);
                if (validateError.length) {
                    this.errorArr = [];
                    throw new exceptions_1.BadRequest(`Please enter the mandatory fields. ${validateError}`);
                }
                const parentsEntity = Object.assign(new Parents_1.Parents(), parents);
                parentsEntity.createdby = currentUser;
                yield queryRunner.manager.save(parentsEntity)
                    .catch(error => {
                    throw new exceptions_1.NotFound("Unable to save parents info", error);
                });
                yield queryRunner.manager
                    .getRepository(Student_1.Students)
                    .createQueryBuilder()
                    .relation(Student_1.Students, "parents")
                    .of(id)
                    .add(parentsEntity.id)
                    .then(res => {
                    return { Messages: "Parents has been added" };
                })
                    .catch(err => {
                    throw new exceptions_1.BadMapping("Parents not match.");
                });
                yield queryRunner.commitTransaction();
                return true;
            }
            catch (error) {
                yield queryRunner.rollbackTransaction();
                throw new exceptions_1.InternalServerError("Unhandled Error", error);
            }
            finally {
                yield queryRunner.release();
            }
        });
    }
    studentInactive(id, currentUser) {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = typeorm_1.getConnection();
            const queryRunner = connection.createQueryRunner();
            try {
                yield queryRunner.connect();
                yield queryRunner.startTransaction();
                const allIds = yield this.findOnlyIds(id);
                const studentId = allIds.id;
                const studentFName = allIds.firstname;
                yield queryRunner.manager
                    .createQueryBuilder()
                    .update(Student_1.Students)
                    .set({
                    isactive: false,
                    updatedby: currentUser
                })
                    .where("id = :id", { id: studentId })
                    .execute()
                    .catch(error => {
                    throw new exceptions_1.NotFound("Unable to save", error);
                });
                allIds.parents.map((p) => __awaiter(this, void 0, void 0, function* () {
                    return yield queryRunner.manager
                        .createQueryBuilder()
                        .update(Parents_1.Parents)
                        .set({
                        isactive: false,
                        updatedby: currentUser
                    })
                        .where("id = :id", { id: p.id })
                        .execute()
                        .catch(error => {
                        throw new exceptions_1.NotFound("Unable to save", error);
                    });
                }));
                allIds.parents.map(p => {
                    return p.address.map((addr) => __awaiter(this, void 0, void 0, function* () {
                        yield queryRunner.manager
                            .createQueryBuilder()
                            .update(Address_1.Address)
                            .set({
                            isactive: false,
                            updatedby: currentUser
                        })
                            .where("id = :id", { id: addr.id })
                            .execute()
                            .catch(error => {
                            throw new exceptions_1.NotFound("Unable to save", error);
                        });
                        return addr.id;
                    }));
                });
                yield queryRunner.commitTransaction();
                return { Messages: `${studentFName} has been deleted successfully` };
            }
            catch (error) {
                yield queryRunner.rollbackTransaction();
                throw new exceptions_1.InternalServerError("Unhandled Error: Unable to save", error);
            }
            finally {
                yield queryRunner.release();
            }
        });
    }
    getStudent(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield typeorm_1.getManager()
                    .getRepository(Student_1.Students)
                    .createQueryBuilder("stud")
                    .leftJoinAndSelect("stud.classsec", "classsec")
                    .leftJoinAndSelect("stud.parents", "parents")
                    .leftJoinAndSelect("parents.address", "address")
                    .where("stud.isactive = true")
                    .andWhere("stud.id = :id", { id: id })
                    .getOne();
                return result;
            }
            catch (error) {
                throw new exceptions_1.NotFound(`Student not found. Please change the search criteria`);
            }
        });
    }
    listStudents(pageNo, pageSize, sortCol, isAsc, filter) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const currenPageNo = pageNo - 1;
                const orderBy = sortCol ? sortCol : "stud.firstname";
                const qb = yield typeorm_1.getManager()
                    .getRepository(Student_1.Students)
                    .createQueryBuilder("stud")
                    .leftJoinAndSelect("stud.classsec", "classsec")
                    .leftJoinAndSelect("stud.parents", "parents")
                    .leftJoinAndSelect("parents.address", "address")
                    .where("stud.isactive = true");
                if (filter.classId.length > 0 && filter.classId !== "ALL") {
                    qb.andWhere("classsec.id = :clsId", { clsId: filter.classId });
                }
                if (filter.genderId.length > 0 && filter.genderId !== "ALL") {
                    qb.andWhere("stud.gender = :genderId", { genderId: filter.genderId });
                }
                if (filter.textId.trim().length > 0) {
                    qb.andWhere("stud.firstname like :textId", { textId: "%" + filter.textId + "%" });
                }
                qb.orderBy(orderBy, isAsc === "ASC" ? "ASC" : "DESC");
                qb.skip(currenPageNo * pageSize);
                qb.take(pageSize);
                const students = {
                    rows: yield qb.getMany(),
                    count: yield qb.getCount()
                };
                return students;
            }
            catch (error) {
                throw new exceptions_1.NotFound(`Students not found. Please change the search criteria`);
            }
        });
    }
    getStudentByClass(classId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const qb = typeorm_1.getManager()
                    .getRepository(Student_1.Students)
                    .createQueryBuilder("stud")
                    .leftJoinAndSelect("stud.classsec", "classsec")
                    .where("stud.isactive = true");
                if (classId !== "ALL") {
                    qb.andWhere("classsec.id = :id", { id: classId });
                }
                qb.orderBy("stud.gender", "DESC")
                    .addOrderBy("stud.firstname", "ASC")
                    .addOrderBy("stud.lastname", "ASC");
                const result = yield qb.getMany();
                return result;
            }
            catch (error) {
                throw new exceptions_1.NotFound(`Student not found. Please change the search criteria`);
            }
        });
    }
    listParents(pageNo, pageSize) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const parents = yield typeorm_1.getManager()
                    .getRepository(Parents_1.Parents)
                    .createQueryBuilder("parents")
                    .leftJoinAndSelect("parents.address", "address")
                    .skip(pageNo)
                    .take(pageSize)
                    .getMany();
                return parents;
            }
            catch (error) {
                throw new exceptions_1.NotFound(`Parents not found. Please change the search criteria`);
            }
        });
    }
    listAddress(pageNo, pageSize) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const address = yield typeorm_1.getManager()
                    .getRepository(Address_1.Address)
                    .createQueryBuilder()
                    .skip(pageNo)
                    .take(pageSize)
                    .getMany();
                return address;
            }
            catch (error) {
                throw new exceptions_1.NotFound(`Address not found. Please change the search criteria`);
            }
        });
    }
    findStudentByParent(parentId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const students = yield typeorm_1.getManager()
                    .getRepository(Parents_1.Parents)
                    .createQueryBuilder("parents")
                    .leftJoinAndSelect("parents.students", "students")
                    .leftJoinAndSelect("parents.address", "address")
                    .where("parents.id = :value", { value: parentId })
                    .getMany();
                return students;
            }
            catch (error) {
                throw new exceptions_1.NotFound(`Data not found. Please change the search criteria`);
            }
        });
    }
    findStudentByAddress(addressId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const students = yield typeorm_1.getManager()
                    .getRepository(Address_1.Address)
                    .createQueryBuilder("address")
                    .leftJoinAndSelect("address.parents", "parents")
                    .leftJoinAndSelect("parents.students", "students")
                    .where("address.id = :value", { value: addressId })
                    .getOne();
                return students;
            }
            catch (error) {
                throw new exceptions_1.NotFound(`Data not found. Please change the search criteria`);
            }
        });
    }
    findOnlyIds(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield typeorm_1.getManager()
                    .getRepository(Student_1.Students)
                    .createQueryBuilder("stud")
                    .leftJoinAndSelect("stud.parents", "parents")
                    .leftJoinAndSelect("parents.address", "address")
                    .where("stud.id = :value", { value: id })
                    .select(["stud.id", "stud.firstname", "parents.id", "address.id"])
                    .getOne();
            }
            catch (error) {
                throw new exceptions_1.InternalServerError("Error", error);
            }
        });
    }
    findStudentById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const student = yield typeorm_1.getManager()
                    .getRepository(Student_1.Students)
                    .createQueryBuilder("stud")
                    .leftJoinAndSelect("stud.parents", "parents")
                    .leftJoinAndSelect("parents.address", "address")
                    .where("stud.id = :value", { value: id })
                    .getOne();
                return student;
            }
            catch (error) {
                throw new exceptions_1.InternalServerError("Unhandled Error", error);
            }
        });
    }
    findOneStudent(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield typeorm_1.getManager()
                    .getRepository(Student_1.Students)
                    .findOne({ where: { id: id } })
                    .catch(error => {
                    throw new exceptions_1.NotFound("Student not found", error);
                });
            }
            catch (error) {
                throw new exceptions_1.InternalServerError("Unhandled Error", error);
            }
        });
    }
    findOneParents(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield typeorm_1.getManager()
                    .getRepository(Parents_1.Parents)
                    .findOne({ where: { id: id } });
            }
            catch (error) {
                throw new exceptions_1.InternalServerError("Unhandled Error", error);
            }
        });
    }
    findOneAddress(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield typeorm_1.getManager()
                    .getRepository(Address_1.Address)
                    .findOne({ where: { id: id } });
            }
            catch (error) {
                throw new exceptions_1.InternalServerError("Unhandled Error", error);
            }
        });
    }
    getNewStudentNo() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { studentno } = yield typeorm_1.getManager()
                    .getRepository(Student_1.Students)
                    .createQueryBuilder("stud")
                    .select("MAX(stud.studentno)", "studentno")
                    .getRawOne();
                if (!studentno) {
                    studentno = 0;
                }
                studentno = Number(studentno) + 1;
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
                getPrefixYear = getPrefixYear + "0";
                return { studentno: studentno, prefixyear: getPrefixYear };
            }
            catch (error) {
                throw new exceptions_1.InternalServerError("Unhandled Error", error);
            }
        });
    }
    validateAll(student, parents, address) {
        this.validateStudent(student);
        this.validateParents(parents);
        this.validateAddress(address);
        return this.errorArr;
    }
    validateStudent(student) {
        const validator = new class_validator_1.Validator();
        if (validator.isEmpty(student))
            this.errorArr.push("Student profile can not be empty");
        if (validator.isEmpty(student.firstname))
            this.errorArr.push("First name can not be empty");
        if (validator.isEmpty(student.lastname))
            this.errorArr.push("Last name can not be empty");
        if (validator.isEmpty(student.gender))
            this.errorArr.push("Gender can not be empty");
        if (validator.isDate(student.dob))
            this.errorArr.push("Date of Birth can not be empty");
        if (validator.isDate(student.doj))
            this.errorArr.push("Date of Join can not be empty");
        return this.errorArr;
    }
    validateParents(parents) {
        const validator = new class_validator_1.Validator();
        if (validator.isEmpty(parents))
            this.errorArr.push("Parents profile can not be empty");
        if (validator.isEmpty(parents.fathername))
            this.errorArr.push("Father's First name can not be empty");
        if (validator.isEmpty(parents.fathergraduation))
            this.errorArr.push("Graduation can not be empty");
        if (validator.isEmpty(parents.fatheroccupation))
            this.errorArr.push("Occupation name can not be empty");
        if (validator.isEmpty(parents.fatherincome))
            this.errorArr.push("Income can not be empty");
        return this.errorArr;
    }
    validateAddress(address) {
        const validator = new class_validator_1.Validator();
        if (validator.isEmpty(address))
            throw new exceptions_1.BadRequest("Address profile can not be ");
        if (validator.isEmpty(address.type))
            this.errorArr.push("Type of address can not be empty");
        if (validator.isEmpty(address.address1))
            this.errorArr.push("Address-1 Type can not be empty");
        if (validator.isEmpty(address.city))
            this.errorArr.push("City/Village can not be empty");
        if (validator.isEmpty(address.state))
            this.errorArr.push("State can not be empty");
        if (validator.isEmpty(address.mobile))
            this.errorArr.push("Mobile number can not be empty");
        return this.errorArr;
    }
};
StudentService = __decorate([
    inversify_1.injectable(),
    __metadata("design:paramtypes", [])
], StudentService);
exports.StudentService = StudentService;
//# sourceMappingURL=StudentService.js.map