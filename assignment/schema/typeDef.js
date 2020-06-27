"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_1 = require("apollo-server");
exports.typeDef = apollo_server_1.gql `
	extend type Query {
		getAssignment(classId: String, duedate: DateTimeType, mode: String): [AssignmentGroup]
		getSubjectsByClass(classId: String): [Subject]
	}
	extend type Mutation {
		addAssignment(input: AssignmentInput): Assignment
		editAssignment(id: String!, input: AssignmentInput): Assignment
		delAssignment(id: String!): Status
	}

	input AssignmentInput {
		taskname: String
		duedate: DateTimeType
		classsec: String
		subject: String
		priority: String
		tag: String
		notes: String
	}

	type AssignmentGroup {
		duedate: DateTimeType
		data: [Assignment]
	}

	type Assignment {
		id: String
		taskname: String
		duedate: DateTimeType
		classsec: [ClassSection]
		subject: [Subject]
		documents: [DocsPhotos]
		priority: String
		tag: String
		notes: String
	}
`;
//# sourceMappingURL=typeDef.js.map