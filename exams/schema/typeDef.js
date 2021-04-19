"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_1 = require("apollo-server");
exports.typeDef = apollo_server_1.gql `
	extend type Query {
		getOneExamMaster(id: String): ExamMaster
		getAllExamMaster(pageNo: Int, pageSize: Int, examName: String, classId: String): ExamMasterPagination!

		verifyMarkRegister(input: VerifyRegisterInput): VerifyRegister
		getMarkEntry(input: VerifyRegisterInput, acadyear: String): [MarkEntryRegister]
		getClassMarkRegister(examName: String, classId: String, acadyear: String): [MarkRegisterData]
		getStudentMarks(examName: String, classId: String, studentId: String, acadyear: String): [StudentMarksData]
		getStudentsForPromotion(examName: [String], classId: String, acadyear: String): PromotionDataResult
		getPromotionHistory(classId: String, acadyear: String): [PromotionResult]

		getExamGrade(id: String): [ExamGrades]
		getAllExamGrade: [ExamGrades]

		getExamTimeTable(classId: String): [ExamTimeTable]
		getAllClassExamTimeTable: [ExamTimeTable]

		getExamPromotion(classId: String): [ExamPromotion]
		getStudentPromotion(studentId: String): ExamPromotion
	}
	extend type Mutation {
		addExamMaster(input: ExamMasterInput): ExamMaster
		editExamMaster(id: String!, input: ExamMasterInput): ExamMaster
		delExamMaster(id: String!): Status

		createMarkRegister(input: VerifyRegisterInput,
								acadyear: String): [MarkEntryRegister]
		editMarkRegister(
			id: String,
			marksObtained: Int,
			maxMarks:Int,
			examName: String,
			classId: String,
			studentId: String
			): Status
		addStudentToRegister(studentId: String, input: VerifyRegisterInput,
								acadyear: String): [MarkEntryRegister]

		doPromotion(input: PromotionInput): PromotionResult

		addMarkGrade(input: ExamGradesInput): ExamGrades
		editMarkGrade(id: String!, input: ExamGradesInput): ExamGrades
		delMarkGrade(id: String!): Status

		addExamTimeTable(input: ExamTimeTableInput): ExamTimeTable
		editExamTimeTable(id: String!, input: ExamTimeTableInput): ExamTimeTable
		delExamTimeTable(id: String!): Status

		addExamPromotion(input: ExamPromotionInput): ExamPromotion
		editExamPromotion(id: String!, input: ExamPromotionInput): ExamPromotion
		delExamPromotion(id: String!): Status
	}

	input ExamMasterInput {
		name: String
		class: String
		subjects: String
		min_marks: Int
		max_marks: Int
		orderby: Int
		notes: String
		is_final_exam: Boolean
	}

	type ExamMaster {
		id: String
		examName: String
		minMarks: Int
		maxMarks: Int
		orderby: Int
		notes: String
		is_final_exam: Boolean
		classId: String
		className: String
		classSection: String
		subjectId: String
		subjectName: String
		subjectSubcode: String
		subjectColor: String
		createdby: String
		createdon: DateTimeType
		updatedby: String
		updatedon: DateTimeType
	}

	type ExamMasterPagination {
		rows: [ExamMaster]
		count: Int
	}

	type VerifyRegister {
		isFound: Boolean
		count: Int
	}

	input VerifyRegisterInput {
		examName: String
		classId: String
		subjectId: String
	}

	input MarkRegisterInput {
		exam_class_id: String
		students: String
		marks_obtained: Int
		grade: String
		acdYear: String
		notes: String
	}

	type MarkEntryRegister {
		id: String
		examName: String
		classId: String
		className: String
		classSection: String
		subjectId: String
		subjectName: String
		studentId: String
		firstName: String
		lastName: String
		marksObtained: Int
		maxMarks: Int
		acad_year: String
		notes: String
		createdby: String
		createdon: DateTimeType
		updatedby: String
		updatedon: DateTimeType
	}

	type MarkRegisterData {
		studentId: String
		profile: MarkRegisterProfile
		marks: [SubjectMarks]
	}

	type MarkRegisterProfile {
		firstName: String
		lastName: String
		gender: String
		examName: String
		className: String
		classSection: String
		maxMarks: Int
		totalMarksObtained: Int
		totalMaxMarks: Int
		totalGrade: String
		totalGradeColor: String
		totalPercentage: Int
		notes: String
	}

	type PromotionDataResult {
		promotionData: [PromotionData]
		status: String
	}
	type PromotionData {
		studentId: String
		studentName: String
		gender: String
		classNameSection: String
		totalPercentage: Float
		totalGrade: String
		totalGradeColor: String
		acadYear: String
	}

	input PromotionInput {
		classIdFrom: String
		classIdTo: String
		acadYearFrom: String
		acadYearTo: String
		studentId: [String]
		detainedStudentIds: [String]
		isFinalYear: Boolean
		promoteReason: String
	}

	type PromotionResult {
		classFrom: String
		classTo: String
		acadFrom: String
		acadTo: String
		getexamname: String
		ispromotetonewclass: Boolean
		noofstudentspromoted: String

		updateacdyear: Boolean
		noofupdateacdyear: String

		detainedstudents: String
		noofdetained: String

		addmarkstoarchieved: Boolean
		noofaddmarksarchieved: String

		hasdeletedmarkregister: Boolean
		noofdelmarkregister: String

		hasdeletedmarkregistersum: Boolean
		noofdelmarkregistersum: String

		hasattendancearchieved: Boolean
		noofattendancearchieved: String

		hasdeletedattendance: Boolean
		noofattendancedeleted: String

		hasupdatepromotionstatus: Boolean
	}

	type SubjectMarks {
		subjectName: String
		subjectColor: String
		marksObtained: Int
		maxMarks: Int
		perc: Int
		gradeName: String
		gradePoint: String
		gradeColor: String
	}

	# type StudentMarksData {
	# 	data: [StudentMarksDataRes],
	# 	header: [Subject]
	# }

	type StudentMarksData {
		examName: String
		profile: StudentMarksProfile
		marks: [SubjectMarks]
	}

	type StudentMarksProfile {
		studentId: String
		firstName: String
		lastName: String
		gender: String
		examName: String
		className: String
		classSection: String
		maxMarks: Int
		totalMarksObtained: Int
		totalMaxMarks: Int
		totalGrade: String
		totalGradeColor: String
		totalPercentage: Int
		notes: String
	}

	type MarkRegister1 {
		id: String
		examName: String
		className: String
		classSection: String
		subjectName: String
		subjectColor: String
		firstName: String
		lastName: String
		gender: String
		marksObtained: Int
		maxMarks: Int
		notes: String
		perc: Int
		gradeName: String
		gradePoint: String
		gradeColor: String
		totalMarksObtained: Int
		totalMaxMarks: Int
		totalGrade: String
		totalGradeColor: String
		totalPercentage: Int
		acad_year: String
		createdby: String
		createdon: DateTimeType
		updatedby: String
		updatedon: DateTimeType
	}

	input ExamGradesInput {
		name: String
		description: String
		color: String
		grade_point: Int
		min: Int
		max: Int
		orderby: Int
		acd_year_id: String
		notes: String
	}

	type ExamGrades {
		id: String
		name: String
		description: String
		color: String
		grade_point: Int
		min: Int
		max: Int
		orderby: Int
		notes: String
		createdby: String
		createdon: DateTimeType
		updatedby: String
		updatedon: DateTimeType
	}

	input ExamTimeTableInput {
		exam_class_id: String
		examdate: DateTimeType
		start_time: DateTimeType
		end_time: DateTimeType
		noofhours: Int
		notes: String
	}

	type ExamTimeTable {
		id: String
		exam_name: String
		class_name: String
		subjects: Subject
		examdate: DateTimeType
		start_time: DateTimeType
		end_time: DateTimeType
		noofhours: Int
		notes: String
		createdby: String
		createdon: DateTimeType
		updatedby: String
		updatedon: DateTimeType
	}

	input ExamPromotionInput {
		student: String
		class_from: String
		class_to: String
		promotion_date: DateTimeType
		graduated: String
		acd_year_from: String
		acd_year_to: String
	}

	type ExamPromotion {
		id: String
		student: String
		class_from: String
		class_to: String
		promotion_date: DateTimeType
		graduated: String
		acd_year_from: String
		acd_year_to: String
		createdby: String
		createdon: DateTimeType
		updatedby: String
		updatedon: DateTimeType
	}
`;
//# sourceMappingURL=typeDef.js.map