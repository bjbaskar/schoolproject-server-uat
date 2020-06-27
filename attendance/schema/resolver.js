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
        getStudAttByClass(_, args, context) {
            return __awaiter(this, void 0, void 0, function* () {
                const svr = context.AttendanceService;
                const res = yield svr.getStudAttByClass(args.classId, args.currDate);
                return res;
            });
        },
        getPieChartByMonth(_, args, context) {
            return __awaiter(this, void 0, void 0, function* () {
                const svr = context.AttendanceService;
                const res = yield svr.getPieChartByMonth(args.classId, args.studentId, args.currDate);
                return res;
            });
        },
        getPieChartClassWiseByMonth(_, args, context) {
            return __awaiter(this, void 0, void 0, function* () {
                const svr = context.AttendanceService;
                const res = yield svr.getPieChartClassWiseByMonth(args.classId, args.currDate);
                return res;
            });
        }
    },
    Mutation: {
        addStudAttendance(root, args, context) {
            return __awaiter(this, void 0, void 0, function* () {
                const currentUser = context.CurrentUser.UserName;
                const res = yield context.AttendanceService.addStudAttendance(args.input, currentUser);
                return res;
            });
        },
        editStudAttendance(root, args, context) {
            return __awaiter(this, void 0, void 0, function* () {
                const currentUser = context.CurrentUser.UserName;
                const res = yield context.AttendanceService.editStudAttendance(args.input, currentUser);
                return res;
            });
        },
    }
};
//# sourceMappingURL=resolver.js.map