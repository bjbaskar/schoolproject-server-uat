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
const ExamMarkRegSvc_1 = require("./ExamMarkRegSvc");
const ExamGradeSvc_1 = require("./ExamGradeSvc");
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
    getAllExamMaster(examName, classId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const obj = new ExamMasterSvc_1.ExamMasterService();
                const res = obj.getAll(examName, classId);
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
    addMarkReg(input, currentUser) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const obj = new ExamMarkRegSvc_1.MarkRegisterService();
                const res = obj.addMarkReg(input, currentUser);
                return res;
            }
            catch (error) {
                throw new exceptions_1.InternalServerError("addMarkReg Unhandled Error: Unable to delete", error);
            }
        });
    }
    editMarkReg(id, input, currentUser) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const obj = new ExamMarkRegSvc_1.MarkRegisterService();
                const res = obj.editMarkReg(id, input, currentUser);
                return res;
            }
            catch (error) {
                throw new exceptions_1.InternalServerError("editMarkReg Unhandled Error: Unable to delete", error);
            }
        });
    }
    delMarkReg(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const obj = new ExamMarkRegSvc_1.MarkRegisterService();
                const res = obj.delMarkReg(id);
                return res;
            }
            catch (error) {
                throw new exceptions_1.InternalServerError("delMarkReg Unhandled Error: Unable to delete", error);
            }
        });
    }
    getMarkRegister(studentId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const obj = new ExamMarkRegSvc_1.MarkRegisterService();
                const res = obj.getMarkRegister(studentId);
                return res;
            }
            catch (error) {
                throw new exceptions_1.InternalServerError("getMarkRegister: Unhandled Error", error);
            }
        });
    }
    getAllMarkRegister(classId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const obj = new ExamMarkRegSvc_1.MarkRegisterService();
                const res = obj.getAllMarkRegister(classId);
                return res;
            }
            catch (error) {
                throw new exceptions_1.InternalServerError("getAllMarkRegister: Unhandled Error", error);
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