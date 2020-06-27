"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = {
    Query: {
        getHoliday(_, args, context) {
            return __awaiter(this, void 0, void 0, function* () {
                const holidaySvc = context.HolidayService;
                return holidaySvc.findHolidayById(args.id);
            });
        },
        getHolidaysByRange(_, args, context) {
            return __awaiter(this, void 0, void 0, function* () {
                return context.HolidayService.getHolidaysByRange(args.fromdate, args.todate);
            });
        },
        getHolidays(_, args, context) {
            return __awaiter(this, void 0, void 0, function* () {
                return context.HolidayService.listHolidays();
            });
        }
    },
    Mutation: {
        addHoliday(root, args, context) {
            return __awaiter(this, void 0, void 0, function* () {
                const currentUser = context.CurrentUser.UserName;
                const res = yield context.HolidayService.addHoliday(args.input, currentUser);
                return res;
            });
        },
        editHoliday(root, args, context) {
            return __awaiter(this, void 0, void 0, function* () {
                const currentUser = context.CurrentUser.UserName;
                const res = yield context.HolidayService.editHoliday(args.id, args.input, currentUser);
                return res;
            });
        },
        delHoliday(root, args, context) {
            return __awaiter(this, void 0, void 0, function* () {
                const currentUser = context.CurrentUser.UserName;
                const res = yield context.HolidayService.delHoliday(args.id, currentUser);
                return res;
            });
        }
    }
};
//# sourceMappingURL=resolver.js.map