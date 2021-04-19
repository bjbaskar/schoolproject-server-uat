"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_1 = require("apollo-server");
exports.typeDef = apollo_server_1.gql `
  extend type Query {
	getFeeInstallments(id: String): FeeInstallments
	getAllFeeInstallments: [FeeInstallments]
  }

  extend type Mutation {
	addFeeInstallments(input: FeeInstallmentsInput): FeeInstallments
	editFeeInstallments(id: String!, input: FeeInstallmentsInput): FeeInstallments
	delFeeInstallments(id: String!): Status
  }

  type FeeInstallments {
	id: String
	fee_period: String
	term_name: String
	monthly_month_name: String
	term_month_names: [String]
	no_of_months: Int
	from_date: DateTimeType
	to_date: DateTimeType
	acad_year: String
	school_id: String
	createdby: String
	createdon: DateTimeType
	updatedby: String
	updatedon: DateTimeType
  }

  input FeeInstallmentsInput   {
	fee_period: String
	term_name: String
	monthly_month_name: String
	term_month_names: [String]
	no_of_months: Int
	from_date: DateTimeType
	to_date: DateTimeType
	acad_year: String
	school_id: String
  }
`;
//# sourceMappingURL=typeDef.js.map