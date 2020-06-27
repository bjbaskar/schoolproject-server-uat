"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const InversifyConfig_1 = require("./core/config/InversifyConfig");
const InversifyTypes_1 = require("./core/config/InversifyTypes");
function getContext() {
    return {
        Setting: InversifyConfig_1.ContainerMain.get(InversifyTypes_1.TYPES.Setting),
        userService: InversifyConfig_1.ContainerMain.get(InversifyTypes_1.TYPES.UserService),
        UserRoleService: InversifyConfig_1.ContainerMain.get(InversifyTypes_1.TYPES.UserRoleService),
        AuthService: InversifyConfig_1.ContainerMain.get(InversifyTypes_1.TYPES.AuthService),
        CurrentUser: undefined,
        ReqUserAgent: undefined,
        SchoolProfileService: InversifyConfig_1.ContainerMain.get(InversifyTypes_1.TYPES.SchoolProfileService),
        AcadYearService: InversifyConfig_1.ContainerMain.get(InversifyTypes_1.TYPES.AcadYearService),
        EduSystemService: InversifyConfig_1.ContainerMain.get(InversifyTypes_1.TYPES.EduSystemService),
        SubjectService: InversifyConfig_1.ContainerMain.get(InversifyTypes_1.TYPES.SubjectService),
        ClassService: InversifyConfig_1.ContainerMain.get(InversifyTypes_1.TYPES.ClassService),
        TextBookService: InversifyConfig_1.ContainerMain.get(InversifyTypes_1.TYPES.TextBookService),
        DataConfigService: InversifyConfig_1.ContainerMain.get(InversifyTypes_1.TYPES.DataConfigService),
        HolidayService: InversifyConfig_1.ContainerMain.get(InversifyTypes_1.TYPES.HolidayService),
        CalendarService: InversifyConfig_1.ContainerMain.get(InversifyTypes_1.TYPES.CalendarService),
        StaffService: InversifyConfig_1.ContainerMain.get(InversifyTypes_1.TYPES.StaffService),
        UploadService: InversifyConfig_1.ContainerMain.get(InversifyTypes_1.TYPES.UploadService),
        StudentService: InversifyConfig_1.ContainerMain.get(InversifyTypes_1.TYPES.StudentService),
        DashboardService: InversifyConfig_1.ContainerMain.get(InversifyTypes_1.TYPES.DashboardService),
        AttendanceService: InversifyConfig_1.ContainerMain.get(InversifyTypes_1.TYPES.AttendanceService),
        AssignmentService: InversifyConfig_1.ContainerMain.get(InversifyTypes_1.TYPES.AssignmentService),
        FeedbackService: InversifyConfig_1.ContainerMain.get(InversifyTypes_1.TYPES.FeedbackService),
    };
}
exports.getContext = getContext;
//# sourceMappingURL=context.js.map