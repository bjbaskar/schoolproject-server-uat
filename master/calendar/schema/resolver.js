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
        getCalendar(_, args, context) {
            return __awaiter(this, void 0, void 0, function* () {
                const calendarSvc = context.CalendarService;
                return calendarSvc.findCalendarById(args.id);
            });
        },
        getCalendarsByRange(_, args, context) {
            return __awaiter(this, void 0, void 0, function* () {
                return context.CalendarService.getCalendarsByRange(args.start, args.end);
            });
        },
        getCalendars(_, args, context) {
            return __awaiter(this, void 0, void 0, function* () {
                return context.CalendarService.listCalendars();
            });
        },
        getTodaysEvents(_, args, context) {
            return __awaiter(this, void 0, void 0, function* () {
                return context.CalendarService.getTodaysEvents();
            });
        }
    },
    Mutation: {
        addCalendar(root, args, context) {
            return __awaiter(this, void 0, void 0, function* () {
                const currentUser = context.CurrentUser.UserName;
                const res = yield context.CalendarService.addCalendar(args.input, currentUser);
                return res;
            });
        },
        editCalendar(root, args, context) {
            return __awaiter(this, void 0, void 0, function* () {
                const currentUser = context.CurrentUser.UserName;
                const res = yield context.CalendarService.editCalendar(args.id, args.input, currentUser);
                return res;
            });
        },
        delCalendar(root, args, context) {
            return __awaiter(this, void 0, void 0, function* () {
                const currentUser = context.CurrentUser.UserName;
                const res = yield context.CalendarService.delCalendar(args.id, currentUser);
                return res;
            });
        }
    }
};
//# sourceMappingURL=resolver.js.map