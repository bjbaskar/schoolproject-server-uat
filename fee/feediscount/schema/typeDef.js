"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_1 = require("apollo-server");
exports.typeDef = apollo_server_1.gql `
  extend type Query {
	getFeeDiscount(id: String): FeeDiscount
	getAllFeeDiscount: [FeeDiscount]
  }

  extend type Mutation {
	addFeeDiscount(input: FeeDiscountInput): FeeDiscount
	editFeeDiscount(id: String!, input: FeeDiscountInput): FeeDiscount
	delFeeDiscount(id: String!): Status
  }

  type FeeDiscount {
	id: String
	class_sec: String
	student_id: String
	fee_class: String
	discount_reason: String
	discount_perc: Int
	amount_discount: Int
	acad_year: String
	school_id: String
	createdby: String
	createdon: DateTimeType
	updatedby: String
	updatedon: DateTimeType
  }

  input FeeDiscountInput   {
	class_sec: String
	student_id: String
	fee_class: String
	discount_reason: String
	discount_perc: Int
	amount_discount: Int
	acad_year: String
	school_id: String
  }
`;
//# sourceMappingURL=typeDef.js.map