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
const exceptions_1 = require("../core/exceptions");
const Feedback_1 = require("../core/entities/Feedback/Feedback");
let FeedbackService = class FeedbackService {
    constructor() { }
    getFeedback() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const qb = typeorm_1.getManager()
                    .getRepository(Feedback_1.Feedback)
                    .createQueryBuilder("fb");
                const result = yield qb.getRawMany();
                return result;
            }
            catch (error) {
                throw new exceptions_1.NotFound(`getFeedback Error: Please change the search criteria`);
            }
        });
    }
    addFeedback(input, currentUser) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const entity = new Feedback_1.Feedback();
                entity.createdby = currentUser;
                const res = yield typeorm_1.getManager()
                    .getRepository(Feedback_1.Feedback).save(entity);
                return res;
            }
            catch (error) {
                throw new exceptions_1.InternalServerError("addFeedback", error);
            }
        });
    }
    editFeedback(id, input, currentUser) {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = typeorm_1.getConnection();
            const queryRunner = connection.createQueryRunner();
            try {
                yield queryRunner.connect();
                yield queryRunner.startTransaction();
                const entity = new Feedback_1.Feedback();
                entity.id = id;
                yield queryRunner.commitTransaction();
                return entity;
            }
            catch (error) {
                yield queryRunner.rollbackTransaction();
                throw new exceptions_1.InternalServerError("editFeedback", error);
            }
            finally {
                yield queryRunner.release();
            }
        });
    }
    delFeedback(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield typeorm_1.getManager()
                    .createQueryBuilder()
                    .delete()
                    .from(Feedback_1.Feedback)
                    .where("id = :id", { id: id })
                    .execute();
            }
            catch (error) {
                throw new exceptions_1.InternalServerError("Feedback Delete Error:", error);
            }
        });
    }
};
FeedbackService = __decorate([
    inversify_1.injectable(),
    __metadata("design:paramtypes", [])
], FeedbackService);
exports.FeedbackService = FeedbackService;
//# sourceMappingURL=FeedbackService.js.map