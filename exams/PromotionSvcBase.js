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
const typeorm_1 = require("typeorm");
const MarkRegister_1 = require("../core/entities/Exams/MarkRegister");
const MarkRegisterSum_1 = require("../core/entities/Exams/MarkRegisterSum");
const Student_1 = require("../core/entities/Students/Student");
const ClassSections_1 = require("../core/entities/Master/ClassSections");
const PromotionStatus_1 = require("../core/entities/Exams/PromotionStatus");
const StudentAlumni_1 = require("../core/entities/Alumni/StudentAlumni");
const MarkRegisterArchieve_1 = require("../core/entities/Archieve/MarkRegisterArchieve");
const PromotionHistory_1 = require("../core/entities/Exams/PromotionHistory");
const exceptions_1 = require("../core/exceptions");
const ExamMarkRegisterSvc_1 = require("./ExamMarkRegisterSvc");
const AcadYear_1 = require("../core/entities/Master/AcadYear");
const Attendance_1 = require("../core/entities/Attendance/Attendance");
const AttendanceArchieve_1 = require("../core/entities/Archieve/AttendanceArchieve");
const Exam_1 = require("../core/entities/Exams/Exam");
class PromotionServiceBase {
    constructor(params) {
        this.PR_LOG = {
            getexamname: "",
            ispromotetonewclass: false,
            noofstudentspromoted: "",
            updateacdyear: false,
            noofupdateacdyear: "",
            detainedstudents: "",
            noofdetained: "",
            addmarkstoarchieved: false,
            noofaddmarksarchieved: "",
            hasdeletedmarkregister: false,
            noofdelmarkregister: "",
            hasdeletedmarkregistersum: false,
            noofdelmarkregistersum: "",
            hasattendancearchieved: false,
            noofattendancearchieved: "",
            hasdeletedattendance: false,
            noofattendancedeleted: "",
            hasupdatepromotionstatus: false,
            hasupdatedtoalumni: false,
            noofalumni: ""
        };
        this.PARAMS = params;
    }
    addToNewClass(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let blnResult = false;
                yield queryRunner
                    .getRepository(Student_1.Students)
                    .createQueryBuilder()
                    .relation(Student_1.Students, "classsec")
                    .of(this.PARAMS.studentId)
                    .addAndRemove(this.PARAMS.classIdTo, this.PARAMS.classIdFrom)
                    .then((r) => {
                    blnResult = true;
                    this.PR_LOG.ispromotetonewclass = true;
                    this.PR_LOG.noofstudentspromoted = this.PARAMS.studentId.length + "";
                });
                return blnResult;
            }
            catch (error) {
                throw new exceptions_1.InternalServerError("addToNewClass: ", error);
            }
        });
    }
    updateAcadYear(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let blnResult = false;
                yield queryRunner
                    .createQueryBuilder()
                    .update(Student_1.Students)
                    .set({
                    acad_year: this.PARAMS.acadYearTo,
                    updatedby: this.PARAMS.currentUser
                })
                    .where("id IN (:id)", {
                    id: this.PARAMS.studentId
                })
                    .execute()
                    .then((r) => {
                    blnResult = true;
                    this.PR_LOG.updateacdyear = true;
                    this.PR_LOG.noofupdateacdyear = r.raw.affectedRows;
                });
                return blnResult;
            }
            catch (error) {
                throw new exceptions_1.InternalServerError("addToNewClass: ", error);
            }
        });
    }
    updateDetainedStudents(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let blnResult = false;
                if (this.PARAMS.detainedStudentIds.length) {
                    yield queryRunner
                        .createQueryBuilder()
                        .update(Student_1.Students)
                        .set({
                        acad_year: this.PARAMS.acadYearTo,
                        updatedby: this.PARAMS.currentUser
                    })
                        .where("id IN (:ids)", {
                        ids: this.PARAMS.detainedStudentIds
                    })
                        .execute()
                        .then((r) => {
                        this.PR_LOG.detainedstudents = this.PARAMS.detainedStudentIds.length ? "Yes" : "No";
                        this.PR_LOG.noofdetained = r.raw.affectedRows;
                    });
                }
                else {
                    blnResult = true;
                    this.PR_LOG.detainedstudents = "No";
                    this.PR_LOG.noofdetained = "0";
                }
                return blnResult;
            }
            catch (error) {
                throw new exceptions_1.InternalServerError("addToNewClass: ", error);
            }
        });
    }
    addMarksToArchieve(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let blnResult = false;
                let EXAM_NAME = "";
                const exam = yield queryRunner
                    .getRepository(Exam_1.Exams)
                    .createQueryBuilder("exam")
                    .where("is_final_exam = true")
                    .getOne();
                EXAM_NAME = exam.name;
                this.PR_LOG.getexamname = EXAM_NAME;
                const reg_svc = new ExamMarkRegisterSvc_1.MarkRegisterService();
                yield reg_svc.getClassMarkRegister(EXAM_NAME, this.PARAMS.classIdFrom, this.PARAMS.acadYearFrom)
                    .then((r) => __awaiter(this, void 0, void 0, function* () {
                    const entity = r;
                    const reformedData = entity.map(d => {
                        return {
                            acad_year: this.PARAMS.acadYearFrom,
                            student_id: d.studentId,
                            profile: JSON.parse(JSON.stringify(d.profile)),
                            marks: JSON.parse(JSON.stringify(d.marks)),
                            createdby: this.PARAMS.currentUser
                        };
                    });
                    if (reformedData && reformedData.length > 0) {
                        const res = yield queryRunner
                            .createQueryBuilder()
                            .insert()
                            .into(MarkRegisterArchieve_1.MarkRegisterArchieve)
                            .values(reformedData).execute()
                            .then((r) => {
                            blnResult = true;
                            this.PR_LOG.addmarkstoarchieved = true;
                            this.PR_LOG.noofaddmarksarchieved = r.raw.affectedRows;
                        })
                            .catch((error) => {
                            blnResult = false;
                            throw new exceptions_1.NotFound("Unable to save", error);
                        });
                    }
                }));
                return blnResult;
            }
            catch (error) {
                throw new exceptions_1.InternalServerError("addMarksToArchieve: ", error);
            }
        });
    }
    deleteMarkRegister(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let blnResult = false;
                yield queryRunner
                    .getRepository(MarkRegister_1.MarkRegister)
                    .createQueryBuilder("marks")
                    .leftJoin("marks.exam_class_sub", "exams")
                    .leftJoin("exams.class", "class")
                    .where("class.id = :classId", { classId: this.PARAMS.classIdFrom })
                    .getMany()
                    .then((d) => __awaiter(this, void 0, void 0, function* () {
                    const ids = d.map(d => d.id);
                    yield queryRunner
                        .createQueryBuilder()
                        .delete()
                        .from(MarkRegister_1.MarkRegister)
                        .where("id IN (:id)", { id: ids })
                        .execute()
                        .then((r) => {
                        blnResult = true;
                        this.PR_LOG.hasdeletedmarkregister = true;
                        this.PR_LOG.noofdelmarkregister = r.raw.affectedRows;
                    })
                        .catch(() => {
                        blnResult = false;
                    });
                }))
                    .catch((e) => {
                    blnResult = false;
                });
                return blnResult;
            }
            catch (error) {
                throw new exceptions_1.InternalServerError("deleteMarkRegister Error: ", error);
            }
        });
    }
    deleteMarkRegisterSummary(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let blnResult = false;
                yield queryRunner
                    .getRepository(MarkRegisterSum_1.MarkRegisterSummary)
                    .createQueryBuilder("marks")
                    .leftJoin(ClassSections_1.ClassSections, "cls", "marks.class_id = cls.id")
                    .where("marks.class_id = :classId", {
                    classId: this.PARAMS.classIdFrom
                })
                    .getMany()
                    .then((d) => __awaiter(this, void 0, void 0, function* () {
                    const ids = d.map(d => d.id);
                    yield queryRunner
                        .createQueryBuilder()
                        .delete()
                        .from(MarkRegisterSum_1.MarkRegisterSummary)
                        .where("id IN (:id)", { id: ids })
                        .execute()
                        .then((r) => {
                        blnResult = true;
                        this.PR_LOG.hasdeletedmarkregistersum = true;
                        this.PR_LOG.noofdelmarkregistersum = r.raw.affectedRows;
                    })
                        .catch(() => {
                        blnResult = false;
                    });
                }))
                    .catch((e) => {
                    blnResult = false;
                });
                return blnResult;
            }
            catch (error) {
                throw new exceptions_1.InternalServerError("deleteMarkRegisterSummary Error: ", error);
            }
        });
    }
    addAttendanceToArchieve(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let blnResult = false;
                const getTotalDaysInYear = yield queryRunner
                    .getRepository(Attendance_1.Attendance)
                    .createQueryBuilder("a")
                    .select("COUNT(DISTINCT a.attdate) as count")
                    .where("a.classid = :classid", {
                    classid: this.PARAMS.classIdFrom
                })
                    .getRawOne();
                const totalDaysInYear = Number(getTotalDaysInYear.count);
                const calcualteAtt = yield queryRunner
                    .getRepository(Attendance_1.Attendance)
                    .createQueryBuilder("a")
                    .select([
                    "st.id AS student_id",
                    `"${this.PARAMS.classIdFrom}" AS class_id`,
                    `"${totalDaysInYear}" AS total_working_days`,
                    "COUNT(*) AS days_absent",
                    "(" + totalDaysInYear + " - COUNT(*)) AS days_present",
                    "((" + totalDaysInYear + " - COUNT(*))/" + totalDaysInYear + ") * 100 AS perc"
                ])
                    .leftJoin("a.studentid", "st")
                    .where("a.classid = :classid", {
                    classid: this.PARAMS.classIdFrom
                })
                    .andWhere("allpresent = false")
                    .groupBy("st.id")
                    .getRawMany()
                    .then((d) => __awaiter(this, void 0, void 0, function* () {
                    const inValue = d.map(r => {
                        return Object.assign({}, r, { createdby: this.PARAMS.currentUser });
                    });
                    if (inValue && inValue.length > 0) {
                        const res = yield queryRunner
                            .createQueryBuilder()
                            .insert()
                            .into(AttendanceArchieve_1.AttendanceArchieve)
                            .values(inValue).execute()
                            .then((r) => {
                            blnResult = true;
                            this.PR_LOG.hasattendancearchieved = true;
                            this.PR_LOG.noofattendancearchieved = r.raw.affectedRows;
                        })
                            .catch((error) => {
                            blnResult = false;
                            throw new exceptions_1.NotFound("Unable to save", error);
                        });
                    }
                }));
                blnResult = true;
                return blnResult;
            }
            catch (error) {
                throw new exceptions_1.InternalServerError("addMarksToArchieve: ", error);
            }
        });
    }
    deleteAttendance(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let blnResult = false;
                yield queryRunner
                    .createQueryBuilder()
                    .delete()
                    .from(Attendance_1.Attendance)
                    .where("classid = :classId", { classId: this.PARAMS.classIdFrom })
                    .execute()
                    .then((r) => {
                    blnResult = true;
                    this.PR_LOG.hasdeletedattendance = true;
                    this.PR_LOG.noofattendancedeleted = r.raw.affectedRows;
                })
                    .catch((error) => {
                    blnResult = false;
                });
                return blnResult;
            }
            catch (error) {
                throw new exceptions_1.InternalServerError("addMarksToArchieve: ", error);
            }
        });
    }
    updatePromotionStatus(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let blnResult = false;
                const pStatus = {
                    status: "COMPLETED",
                    class_id: this.PARAMS.classIdFrom,
                    acad_year: this.PARAMS.acadYearFrom,
                    school_id: "",
                    createdby: this.PARAMS.currentUser
                };
                const entity = Object.assign(new PromotionStatus_1.PromotionStatus(), pStatus);
                entity.updatedby = this.PARAMS.currentUser;
                const res = yield queryRunner
                    .getRepository(PromotionStatus_1.PromotionStatus)
                    .save(entity)
                    .then((r) => {
                    blnResult = true;
                    this.PR_LOG.hasupdatepromotionstatus = true;
                })
                    .catch((e) => {
                    blnResult = false;
                });
                return blnResult;
            }
            catch (error) {
                throw new exceptions_1.InternalServerError("updatePromotionStatus Error: ", error);
            }
        });
    }
    updatePromotionHistory() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let blnResult = false;
                const pStatus = {
                    class_id_from: this.PARAMS.classIdFrom,
                    class_id_to: this.PARAMS.classIdTo,
                    acad_year_from: this.PARAMS.acadYearFrom,
                    acad_year_to: this.PARAMS.acadYearTo,
                    school_id: "",
                    createdby: this.PARAMS.currentUser
                };
                const logHistory = Object.assign({}, this.PR_LOG, pStatus);
                const entity = Object.assign(new PromotionHistory_1.PromotionHistory(), logHistory);
                const res = yield typeorm_1.getManager()
                    .getRepository(PromotionHistory_1.PromotionHistory)
                    .save(entity)
                    .then((r) => {
                    blnResult = true;
                })
                    .catch((e) => {
                    blnResult = false;
                });
                return blnResult;
            }
            catch (error) {
                throw new exceptions_1.InternalServerError("updatePromotionHistory Error: ", error);
            }
        });
    }
    addToAlumni(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let blnResult = false;
                const oArchieves = [];
                const oStudents = yield queryRunner
                    .getRepository(Student_1.Students)
                    .createQueryBuilder("stud")
                    .leftJoinAndSelect("stud.parents", "parents")
                    .leftJoinAndSelect("parents.address", "address")
                    .leftJoinAndSelect("stud.classsec", "classsec")
                    .where("stud.id IN (:value)", { value: this.PARAMS.studentId })
                    .getMany();
                oStudents.map((d) => {
                    const oSA = {};
                    oSA.student_id = d.id;
                    oSA.promoted_to = this.PARAMS.classIdTo;
                    oSA.promote_reason = this.PARAMS.promoteReason;
                    oSA.acadyear = d.acad_year;
                    const profileD = {
                        id: d.id,
                        studentno: d.studentno,
                        prefixyear: d.prefixyear,
                        aadhaarno: d.aadhaarno,
                        emisno: d.emisno,
                        udiseno: d.udiseno,
                        firstname: d.firstname,
                        lastname: d.lastname,
                        gender: d.gender,
                        dob: d.dob,
                        doj: d.doj,
                        nationality: d.nationality,
                        religion: d.religion,
                        castecategory: d.castecategory,
                        community: d.community,
                        mothertongue: d.mothertongue,
                        bloodgroup: d.bloodgroup,
                        identification: d.identification,
                        isactive: d.isactive,
                        disability: d.disability,
                        notes: d.notes,
                        parents: undefined
                    };
                    oSA.profile = profileD;
                    d.parents.map((p) => {
                        oSA.parents = p;
                    });
                    d.classsec.map((c) => {
                        oSA.classsec = `${c.name} - ${c.section}`;
                    });
                    oSA.govtrte = undefined;
                    oSA.school_id = undefined;
                    oSA.user = undefined;
                    oSA.createdby = this.PARAMS.currentUser;
                    oArchieves.push(oSA);
                });
                const reformedData = JSON.parse(JSON.stringify(oArchieves));
                if (reformedData) {
                    yield queryRunner
                        .createQueryBuilder()
                        .insert()
                        .into(StudentAlumni_1.StudentsAlumni)
                        .values(reformedData).execute()
                        .then((r) => {
                        blnResult = true;
                        this.PR_LOG.hasupdatedtoalumni = true;
                        this.PR_LOG.noofalumni = r.raw.affectedRows;
                    })
                        .catch((error) => {
                        blnResult = false;
                        throw new exceptions_1.InternalServerError("Unable to save", error);
                    });
                }
                return blnResult;
            }
            catch (error) {
                throw new exceptions_1.InternalServerError("addToAlumni Error: ", error);
            }
        });
    }
    addToTC(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let blnResult = false;
                blnResult = true;
                return blnResult;
            }
            catch (error) {
                throw new exceptions_1.InternalServerError("deleteAllMedia Error: ", error);
            }
        });
    }
    deleteAllMedia(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let blnResult = false;
                blnResult = true;
                return blnResult;
            }
            catch (error) {
                throw new exceptions_1.InternalServerError("deleteAllMedia Error: ", error);
            }
        });
    }
    getPromotionHistory(classId, acadyear) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const qb = typeorm_1.getManager()
                    .getRepository(PromotionHistory_1.PromotionHistory)
                    .createQueryBuilder("h")
                    .select([
                    "h.*",
                    "clsF.name AS classFrom",
                    "clsT.name AS classTo",
                    "aF.displayname AS acadFrom",
                    "aT.displayname AS acadTo",
                ])
                    .leftJoin(ClassSections_1.ClassSections, "clsF", "h.class_id_from = clsF.id")
                    .leftJoin(ClassSections_1.ClassSections, "clsT", "h.class_id_To = clsT.id")
                    .leftJoin(AcadYear_1.AcadYear, "aF", "h.acad_year_from = aF.id")
                    .leftJoin(AcadYear_1.AcadYear, "aT", "h.acad_year_to = aT.id");
                if (classId) {
                    qb.where("h.class_id_from = :classId", { classId: classId });
                }
                if (acadyear) {
                    qb.andWhere("h.acad_year_from = :acad_year", { acad_year: acadyear });
                }
                const res = yield qb.getRawMany();
                return res;
            }
            catch (error) {
                throw new exceptions_1.InternalServerError("getPromotionHistory Error: ", error);
            }
        });
    }
}
exports.PromotionServiceBase = PromotionServiceBase;
//# sourceMappingURL=PromotionSvcBase.js.map