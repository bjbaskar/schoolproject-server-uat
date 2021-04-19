"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_1 = require("apollo-server");
exports.typeDef = apollo_server_1.gql `
  extend type Query {
	getFeeParticulars(id: String): FeeParticulars
	getAllFeeParticulars: [FeeParticulars]
  }

  extend type Mutation {
	addFeeParticulars(input: FeeParticularsInput): FeeParticulars
	editFeeParticulars(id: String!, input: FeeParticularsInput): FeeParticulars
	delFeeParticulars(id: String!): Status
  }

  type FeeParticulars {
	id: String
	name: String
	description: String
	acad_year: String
	school_id: String
	createdby: String
	createdon: DateTimeType
	updatedby: String
	updatedon: DateTimeType
  }

  input FeeParticularsInput   {
	name: String
	description: String
	acad_year: String
	school_id: String
  }
`;
//# sourceMappingURL=typeDef.js.map