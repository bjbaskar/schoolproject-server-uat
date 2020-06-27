"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_1 = require("apollo-server");
exports.typeDef = apollo_server_1.gql `
	extend type Query {
		getStaff(id: String, isactive: Boolean): Staff
		getAllStaff(isactive: Boolean): [Staff]
	}
	extend type Mutation {
		addStaffProfile(input: StaffInput): Staff
		editStaffProfile(id: String!, input: StaffInput): Status
		delStaffProfile(id: String!): Status
	}

  type Staff {
		id: String
		staffno: String
		aadhaarno: String
		firstname: String
		lastname: String
		gender: String
		designation: String
		dob: DateTimeType
		doj: DateTimeType
		nationality: String
		religion: String
		castecategory: String
		community: String
		mothertongue: String
		bloodgroup: String
		identification: String
		isactive: Boolean
		notes: String
		classes: [ClassSection]
		subjects: [Subject]
		user: User
		createdby: String
		createdon: DateTimeType
		updatedby: String
		updatedon: DateTimeType
  }

  input StaffInput {
		staffno: String
		aadhaarno: String
		firstname: String
		lastname: String
		gender: String
		designation: String
		dob: DateTimeType
		doj: DateTimeType
		nationality: String
		religion: String
		castecategory: String
		community: String
		mothertongue: String
		bloodgroup: String
		identification: String
		isactive: Boolean
		notes: String
  }
`;
//# sourceMappingURL=typeDef.js.map