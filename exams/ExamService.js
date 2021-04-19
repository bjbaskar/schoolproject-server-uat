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
const exceptions_1 = require("../core/exceptions");
const ExamMasterSvc_1 = require("./ExamMasterSvc");
const ExamMarkEntrySvc_1 = require("./ExamMarkEntrySvc");
const ExamGradeSvc_1 = require("./ExamGradeSvc");
const ExamMarkRegisterSvc_1 = require("./ExamMarkRegisterSvc");
const PromotionSvc_1 = require("./PromotionSvc");
let ExamService = class ExamService {
    constructor() { }
    addExamMaster(input, currentUser) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const obj = new ExamMasterSvc_1.ExamMasterService();
                const res = obj.addExamMaster(input, currentUser);
                return res;
            }
            catch (error) {
                throw new exceptions_1.InternalServerError("addExamMaster Unhandled Error: Unable to delete", error);
            }
        });
    }
    editExamMaster(id, input, currentUser) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const obj = new ExamMasterSvc_1.ExamMasterService();
                const res = obj.editExamMaster(id, input, currentUser);
                return res;
            }
            catch (error) {
                throw new exceptions_1.InternalServerError("editExamMaster Unhandled Error: Unable to save", error);
            }
        });
    }
    delExamMaster(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const obj = new ExamMasterSvc_1.ExamMasterService();
                const res = obj.delExamMaster(id);
                return res;
            }
            catch (error) {
                throw new exceptions_1.InternalServerError("delExamMaster Unhandled Error: Unable to delete", error);
            }
        });
    }
    getAllExamMaster(pageNo, pageSize, examName, classId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const obj = new ExamMasterSvc_1.ExamMasterService();
                const res = obj.getAll(pageNo, pageSize, examName, classId);
                return res;
            }
            catch (error) {
                throw new exceptions_1.InternalServerError("Unhandled Error", error);
            }
        });
    }
    getOneExamMaster(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const obj = new ExamMasterSvc_1.ExamMasterService();
                const res = obj.getOne(id);
                return res;
            }
            catch (error) {
                throw new exceptions_1.InternalServerError("Unhandled Error", error);
            }
        });
    }
    verifyMarkRegister(input) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const obj = new ExamMarkEntrySvc_1.MarkEntryService();
                const res = obj.verifyMarkReg(input);
                return res;
            }
            catch (error) {
                throw new exceptions_1.InternalServerError("addMarkReg Unhandled Error: Unable to delete", error);
            }
        });
    }
    createMarkRegister(input, acadyear, currentUser) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const obj = new ExamMarkEntrySvc_1.MarkEntryService();
                const res = obj.createMarkRegister(input, acadyear, currentUser);
                return res;
            }
            catch (error) {
                throw new exceptions_1.InternalServerError("createMarkReg Unhandled Error: Unable to delete", error);
            }
        });
    }
    addStudentToRegister(studentId, input, acadyear, currentUser) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const obj = new ExamMarkEntrySvc_1.MarkEntryService();
                const res = obj.addStudentToRegister(studentId, input, acadyear, currentUser);
                return res;
            }
            catch (error) {
                throw new exceptions_1.InternalServerError("createMarkReg Unhandled Error: Unable to delete", error);
            }
        });
    }
    editMarkRegister(id, marksObtained, maxMarks, examName, classId, studentId, currentUser) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const obj = new ExamMarkEntrySvc_1.MarkEntryService();
                const res = obj.editMarkRegister(id, marksObtained, maxMarks, examName, classId, studentId, currentUser);
                return res;
            }
            catch (error) {
                throw new exceptions_1.InternalServerError("editMarkReg Unhandled Error: Unable to delete", error);
            }
        });
    }
    getMarkEntry(input, acadyear) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const examName = input.examName;
                const classId = input.classId;
                const subjectId = input.subjectId;
                const obj = new ExamMarkEntrySvc_1.MarkEntryService();
                const res = obj.getMarkEntry(examName, classId, subjectId, acadyear);
                return res;
            }
            catch (error) {
                throw new exceptions_1.InternalServerError("editMarkReg Unhandled Error: Unable to delete", error);
            }
        });
    }
    getClassMarkRegister(examName, classId, acadyear) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const obj = new ExamMarkRegisterSvc_1.MarkRegisterService();
                const res = obj.getClassMarkRegister(examName, classId, acadyear);
                return res;
            }
            catch (error) {
                throw new exceptions_1.InternalServerError("editMarkReg Unhandled Error: Unable to delete", error);
            }
        });
    }
    getStudentMarks(examName, classId, studentId, acadyear) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const obj = new ExamMarkRegisterSvc_1.MarkRegisterService();
                const res = obj.getStudentMarks(examName, classId, studentId, acadyear);
                return res;
            }
            catch (error) {
                throw new exceptions_1.InternalServerError("editMarkReg Unhandled Error: Unable to delete", error);
            }
        });
    }
    getStudentsForPromotion(examName, classId, acadyear) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const inputParams = undefined;
                const obj = new PromotionSvc_1.PromotionService(inputParams);
                const res = obj.getStudentsForPromotion(examName, classId, acadyear);
                return res;
            }
            catch (error) {
                throw new exceptions_1.InternalServerError("editMarkReg Unhandled Error: Unable to delete", error);
            }
        });
    }
    doPromotion(input, currentUser) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                input.currentUser = currentUser;
                const obj = new PromotionSvc_1.PromotionService(input);
                const res = obj.doPromotion();
                return res;
            }
            catch (error) {
                throw new exceptions_1.InternalServerError("editMarkReg Unhandled Error: Unable to delete", error);
            }
        });
    }
    getPromotionHistory(classId, acadyear) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const inputParams = undefined;
                const obj = new PromotionSvc_1.PromotionService(inputParams);
                const res = obj.getPromotionHistory(classId, acadyear);
                return res;
            }
            catch (error) {
                throw new exceptions_1.InternalServerError("editMarkReg Unhandled Error: Unable to delete", error);
            }
        });
    }
    addMarkGrade(input, currentUser) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const obj = new ExamGradeSvc_1.ExamGradeService();
                const res = obj.addGrade(input, currentUser);
                return res;
            }
            catch (error) {
                throw new exceptions_1.InternalServerError("addMarkGrade Unhandled Error: Unable to delete", error);
            }
        });
    }
    editMarkGrade(id, input, currentUser) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const obj = new ExamGradeSvc_1.ExamGradeService();
                const res = obj.editGrade(id, input, currentUser);
                return res;
            }
            catch (error) {
                throw new exceptions_1.InternalServerError("editMarkGrade Unhandled Error: Unable to delete", error);
            }
        });
    }
    delMarkGrade(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const obj = new ExamGradeSvc_1.ExamGradeService();
                const res = obj.delGrade(id);
                return res;
            }
            catch (error) {
                throw new exceptions_1.InternalServerError("delMarkGrade Unhandled Error: Unable to delete", error);
            }
        });
    }
    getExamGrade(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const obj = new ExamGradeSvc_1.ExamGradeService();
                const res = obj.getGrade(id);
                return res;
            }
            catch (error) {
                throw new exceptions_1.InternalServerError("getExamGrade: Unhandled Error", error);
            }
        });
    }
    getAllExamGrade() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const obj = new ExamGradeSvc_1.ExamGradeService();
                const res = obj.getAllGrade();
                return res;
            }
            catch (error) {
                throw new exceptions_1.InternalServerError("getAllMarkRegister: Unhandled Error", error);
            }
        });
    }
};
ExamService = __decorate([
    inversify_1.injectable(),
    __metadata("design:paramtypes", [])
], ExamService);
exports.ExamService = ExamService;
//# sourceMappingURL=ExamService.js.map