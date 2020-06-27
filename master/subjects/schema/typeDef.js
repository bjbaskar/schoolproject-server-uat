"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_1 = require("apollo-server");
exports.typeDef = apollo_server_1.gql `
  extend type Query {
	getSubject(id: String): Subject
	getSubjects: [Subject]
  }
  extend type Mutation {
	addSubject(input: SubjectInput): Subject
	editSubject(id: String!, input: SubjectInput): Subject
	delSubject(id: String!): Status
  }
  type Subject {
	id: String
	name: String
	subcode: String
	color: String
	createdby: String
	createdon: DateTimeType
	updatedby: String
	updatedon: DateTimeType
  }

  input SubjectInput   {
	name: String
	subcode: String
	color: String
  }
`;
//# sourceMappingURL=typeDef.js.map