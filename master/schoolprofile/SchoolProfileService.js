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
const SchoolProfile_1 = require("../../core/entities/Master/SchoolProfile");
const RulesRegulations_1 = require("../../core/entities/Master/RulesRegulations");
const exceptions_1 = require("../../core/exceptions");
let SchoolProfileService = class SchoolProfileService {
    constructor() { }
    getSchoolProfile() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const profile = yield typeorm_1.getManager()
                    .getRepository(SchoolProfile_1.SchoolProfile)
                    .createQueryBuilder("schoolprofile")
                    .getOne();
                const rules = yield this.getSchoolRules();
                const res = Object.assign(Object.assign({}, profile), { rules: rules });
                return res;
            }
            catch (error) {
                throw new exceptions_1.InternalServerError("Unhandled Error", error);
            }
        });
    }
    editSchoolProfile(id, schoolProf, currentUser) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const prof = Object.assign(new SchoolProfile_1.SchoolProfile(), schoolProf);
                prof.updatedby = currentUser;
                const res = yield typeorm_1.getManager()
                    .getRepository(SchoolProfile_1.SchoolProfile)
                    .update(id, prof);
                const oSchoolProf = yield this.getSchoolProfile();
                return oSchoolProf;
            }
            catch (error) {
                throw new exceptions_1.InternalServerError("Unhandled Error", error);
            }
        });
    }
    getSchoolRules() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const rules = yield typeorm_1.getManager()
                    .getRepository(RulesRegulations_1.RulesRegulations)
                    .createQueryBuilder("rules")
                    .getMany();
                const response = lodash_1.default(rules)
                    .groupBy(grp => grp.title)
                    .map((value, key) => ({
                    title: key,
                    data: value
                }))
                    .orderBy(ord => ord.data.map(d => d.orderby), ["asc"])
                    .value();
                return response;
            }
            catch (error) {
                throw new exceptions_1.InternalServerError("Unhandled Error", error);
            }
        });
    }
};
SchoolProfileService = __decorate([
    inversify_1.injectable(),
    __metadata("design:paramtypes", [])
], SchoolProfileService);
exports.SchoolProfileService = SchoolProfileService;
//# sourceMappingURL=SchoolProfileService.js.map