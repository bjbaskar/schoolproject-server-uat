"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_1 = require("apollo-server");
exports.typeDef = apollo_server_1.gql `
  extend type Query {
    getClass(id: String): ClassSection
    getAllClass: [ClassSection]!
  }
  extend type Mutation {
    addClassSection(input: ClassSectionInput, subjectIds: [String]): Status
    editClassSection(id: String!, input: ClassSectionInput, subjectIds: [String]): Status
    delClassSection(id: String!): Status
	 addStaffToClass(id: String!, input: ClassStaffInput): Status
  }
  type ClassSection {
	id: String
	name: String
	section: String
	orderby: Int
	isactive: Boolean
	academicyear: AcadYear
	edusystem: EduSystem
	classteachersub: [ClassTeacher]
	classteacher: Staff
	asstclassteacher: Staff
	students: [Student]
	createdby: String
	createdon: DateTimeType
	updatedby: String
	updatedon: DateTimeType
	is_final_year: Boolean
  }

	type ClassTeacher {
		subject: Subject
		staff: Staff
	}

  input ClassSectionInput   {
    name: String
    section: String
    orderby: Int
	 isactive: Boolean
	 academicyear: String
	 edusystem: String
	 is_final_year: Boolean
  }

  input ClassStaffInput {
	classteacher: String!
	asstclassteacher: String
	subj_staff: [SubjectStaffInput]
  }
  input SubjectStaffInput {
	subjectId: String!
	staffId: String!
  }
`;
//# sourceMappingURL=typeDef.js.map