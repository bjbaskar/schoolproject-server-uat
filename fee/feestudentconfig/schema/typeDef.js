"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_1 = require("apollo-server");
exports.typeDef = apollo_server_1.gql `
  extend type Query {
	getFeeStudent(id: String): FeeStudent
	getAllFeeStudent: [FeeStudent]
  }

  extend type Mutation {
	addFeeStudent(input: FeeStudentInput): FeeStudent
	editFeeStudent(id: String!, input: FeeStudentInput): FeeStudent
	delFeeStudent(id: String!): Status
  }

  type FeeStudent {
	id: String
	class_sec: ClassSection
	student: Student
	isactive: Boolean
	acad_year: String
	school_name: String
	createdby: String
	createdon: DateTimeType
	updatedby: String
	updatedon: DateTimeType
  }

  input FeeStudentInput   {
	class_sec: String
	student_id: String
	fee_class: Boolean
	isactive: Boolean
	acad_year: String
	school_id: String
  }
`;
//# sourceMappingURL=typeDef.js.map