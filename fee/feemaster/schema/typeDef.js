"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_1 = require("apollo-server");
exports.typeDef = apollo_server_1.gql `
  extend type Query {
	getFeeMaster(class_id: String, student_id: String): [FeeMasterUnPaidDD]
	getAllFeeMaster(class_id: String): [FeeMaster]
  }

  extend type Mutation {
	addFeeMaster(input: FeeMasterInput): FeeMaster
	editFeeMaster(id: String!, input: FeeMasterInput): FeeMaster
	delFeeMaster(id: String!): Status
  }

  type FeeMaster {
	id: String
	class_id: ClassSection
	fee_particulars_id: FeeParticulars
	fee_installments_id: FeeInstallments
	due_date: DateTimeType
	amount: Int
	is_required_to_all: Boolean
	is_refundable: Boolean
	isactive: Boolean
	acad_year: String
	school_id: String
	createdby: String
	createdon: DateTimeType
	updatedby: String
	updatedon: DateTimeType
  }

  type FeeMasterUnPaidDD {
	class_id: String
	student_id: String
	fee_master_id: String
	fee_particulars_id: String
	fee_installments_id: String
	amount: Float
	amount_balance: Float
	due_date: DateTimeType
	particulars_name: String
	fee_period: String
	term_name: String
	no_of_months: String
	term_month_names: String
	from_date: DateTimeType
	to_date: DateTimeType
	is_required_to_all: Boolean
	is_refundable: Boolean
	isactive: Boolean
	paid_status: String
  }

  input FeeMasterInput   {
	class_id: String
	fee_particulars_id: String
	fee_installments_id: String
	due_date: DateTimeType
	amount: Int
	is_required_to_all: Boolean
	is_refundable: Boolean
	isactive: Boolean
	acad_year: String
	school_id: String
  }
`;
//# sourceMappingURL=typeDef.js.map