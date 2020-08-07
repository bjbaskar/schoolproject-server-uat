"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_1 = require("apollo-server");
exports.typeDef = apollo_server_1.gql `
	extend type Query {
		getOneExamMaster(id: String): ExamMaster
		getAllExamMaster(examName: String, classId: String): [ExamMaster]

		getMarkRegister(studentId: String): MarkRegister
		getAllMarkRegister(classId: String, acdYear: String): [MarkRegister]

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

		addMarkReg(input: MarkRegisterInput): MarkRegister
		editMarkReg(id: String!, input: MarkRegisterInput): MarkRegister
		delMarkReg(id: String!): Status

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
	}

	type ExamMaster {
		id: String
		examName: String
		minMarks: Int
		maxMarks: Int
		orderby: Int
		notes: String
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

	input MarkRegisterInput {
		exam_class_id: String
		students: String
		marks_obtained: Int
		grade: String
		acdYear: String
		notes: String
	}

	type MarkRegister {
		id: String
		exam_name: String
		class_name: String
		subjects: Subject
		students: Student
		marks_obtained: Int
		grade: ExamGrades
		acdYear: String
		notes: String
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
		acd_year_id: String
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