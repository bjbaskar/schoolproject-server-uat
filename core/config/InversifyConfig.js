"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const inversify_1 = require("inversify");
const InversifyTypes_1 = require("./InversifyTypes");
const server_1 = require("../../server");
const Setting_1 = require("./Setting");
const Logger_1 = require("../logger/Logger");
const UserService_1 = require("../../users/UserService");
const UserRoleService_1 = require("../../userroles/UserRoleService");
const AuthService_1 = require("../../common/AuthService");
const DataConfigService_1 = require("../../master/dataconfig/DataConfigService");
const StudentService_1 = require("../../students/StudentService");
const SchoolProfileService_1 = require("../../master/schoolprofile/SchoolProfileService");
const AcadYearService_1 = require("../../master/academicyear/AcadYearService");
const EduSystemService_1 = require("../../master/edusystems/EduSystemService");
const SubjectService_1 = require("../../master/subjects/SubjectService");
const ClassService_1 = require("../../master/classsec/ClassService");
const TextBookService_1 = require("../../master/textbooks/TextBookService");
const HolidayService_1 = require("../../master/holidays/HolidayService");
const CalendarService_1 = require("../../master/calendar/CalendarService");
const StaffService_1 = require("../../staff/StaffService");
const UploadService_1 = require("../../uploads/UploadService");
const DashboardService_1 = require("../../dashboard/DashboardService");
const AttendanceService_1 = require("../../attendance/AttendanceService");
const AssignmentService_1 = require("../../assignment/AssignmentService");
const FeedbackService_1 = require("../../feedback/FeedbackService");
const ContainerMain = new inversify_1.Container();
exports.ContainerMain = ContainerMain;
ContainerMain.bind(InversifyTypes_1.TYPES.Server).to(server_1.Server);
ContainerMain.bind(InversifyTypes_1.TYPES.Setting).to(Setting_1.Setting);
ContainerMain.bind(InversifyTypes_1.TYPES.Logger).to(Logger_1.Logger);
ContainerMain.bind(InversifyTypes_1.TYPES.AuthService).to(AuthService_1.AuthService);
ContainerMain.bind(InversifyTypes_1.TYPES.UserService).to(UserService_1.UserService);
ContainerMain.bind(InversifyTypes_1.TYPES.UserRoleService).to(UserRoleService_1.UserRoleService);
ContainerMain.bind(InversifyTypes_1.TYPES.SchoolProfileService).to(SchoolProfileService_1.SchoolProfileService);
ContainerMain.bind(InversifyTypes_1.TYPES.AcadYearService).to(AcadYearService_1.AcadYearService);
ContainerMain.bind(InversifyTypes_1.TYPES.EduSystemService).to(EduSystemService_1.EduSystemService);
ContainerMain.bind(InversifyTypes_1.TYPES.SubjectService).to(SubjectService_1.SubjectService);
ContainerMain.bind(InversifyTypes_1.TYPES.ClassService).to(ClassService_1.ClassService);
ContainerMain.bind(InversifyTypes_1.TYPES.TextBookService).to(TextBookService_1.TextBookService);
ContainerMain.bind(InversifyTypes_1.TYPES.DataConfigService).to(DataConfigService_1.DataConfigService);
ContainerMain.bind(InversifyTypes_1.TYPES.HolidayService).to(HolidayService_1.HolidayService);
ContainerMain.bind(InversifyTypes_1.TYPES.CalendarService).to(CalendarService_1.CalendarService);
ContainerMain.bind(InversifyTypes_1.TYPES.StudentService).to(StudentService_1.StudentService);
ContainerMain.bind(InversifyTypes_1.TYPES.StaffService).to(StaffService_1.StaffService);
ContainerMain.bind(InversifyTypes_1.TYPES.UploadService).to(UploadService_1.UploadService);
ContainerMain.bind(InversifyTypes_1.TYPES.DashboardService).to(DashboardService_1.DashboardService);
ContainerMain.bind(InversifyTypes_1.TYPES.AttendanceService).to(AttendanceService_1.AttendanceService);
ContainerMain.bind(InversifyTypes_1.TYPES.AssignmentService).to(AssignmentService_1.AssignmentService);
ContainerMain.bind(InversifyTypes_1.TYPES.FeedbackService).to(FeedbackService_1.FeedbackService);
//# sourceMappingURL=InversifyConfig.js.map