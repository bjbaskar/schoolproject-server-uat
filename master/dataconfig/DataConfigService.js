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
const DataConfig_1 = require("../../core/entities/Master/DataConfig");
const Caste_1 = require("../../core/entities/Master/Caste");
const exceptions_1 = require("../../core/exceptions");
let DataConfigService = class DataConfigService {
    constructor() { }
    addDataConfig(dataConfig, currentUser) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const dataConfigEntity = Object.assign(new DataConfig_1.DataConfig(), dataConfig);
                const res = yield typeorm_1.getManager()
                    .getRepository(DataConfig_1.DataConfig)
                    .save(dataConfigEntity);
                return res;
            }
            catch (error) {
                throw new exceptions_1.InternalServerError("Unhandled Error", error);
            }
        });
    }
    editDataConfig(id, dataConfig, currentUser) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const dataConfigEntity = Object.assign(new DataConfig_1.DataConfig(), dataConfig);
                const res = yield typeorm_1.getManager()
                    .getRepository(DataConfig_1.DataConfig)
                    .update(id, dataConfigEntity);
                return res;
            }
            catch (error) {
                throw new exceptions_1.InternalServerError("Unhandled Error", error);
            }
        });
    }
    delDataConfig(id, currentUser) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const res = yield typeorm_1.getManager()
                    .createQueryBuilder()
                    .delete()
                    .from(DataConfig_1.DataConfig)
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
    listDataConfig() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const res = yield typeorm_1.getManager()
                    .getRepository(DataConfig_1.DataConfig)
                    .createQueryBuilder("dconfig")
                    .orderBy("dconfig.name", "ASC")
                    .addOrderBy("dconfig.value", "ASC")
                    .getMany();
                return res;
            }
            catch (error) {
                throw new exceptions_1.InternalServerError("Unhandled Error", error);
            }
        });
    }
    getCaste() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const res = yield typeorm_1.getManager()
                    .getRepository(Caste_1.Caste)
                    .createQueryBuilder("caste")
                    .orderBy("caste.name", "ASC")
                    .getMany();
                return res;
            }
            catch (error) {
                throw new exceptions_1.InternalServerError("Unhandled Error", error);
            }
        });
    }
    findDataConfigById(filter) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const res = yield typeorm_1.getManager()
                    .getRepository(DataConfig_1.DataConfig)
                    .createQueryBuilder("d")
                    .orderBy("d.value", "ASC")
                    .where("name = :filter", { filter: filter })
                    .getMany();
                return res;
            }
            catch (error) {
                throw new exceptions_1.InternalServerError("Unhandled Error", error);
            }
        });
    }
};
DataConfigService = __decorate([
    inversify_1.injectable(),
    __metadata("design:paramtypes", [])
], DataConfigService);
exports.DataConfigService = DataConfigService;
//# sourceMappingURL=DataConfigService.js.map