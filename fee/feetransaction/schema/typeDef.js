"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_1 = require("apollo-server");
exports.typeDef = apollo_server_1.gql `
  extend type Query {
	getPriorBalance(class_id: String, student_id: String): FeePriorBalanceResult

	getFeeReceipt(
			class_id: String,
			student_id: String,
			paydate: DateTimeType,
			receipt_no: Int ): FeeReceiptResult

	getTransWidgetRpt(from_date: DateTimeType, to_date: DateTimeType): FeeTransWidgetRpt

	getClasswiseFeeRpt(
		class_id: String,
		from_date: DateTimeType,
		to_date: DateTimeType
		rpt_type: String,
		particulars_id: String,
		installments_id: String): [FeeClasswiseRpt]

	getFeeSummaryReport: [FeeSummaryRpt]

	getStudentInvoice(
		class_id: String,
		student_id: String,
		from_date: DateTimeType,
		to_date: DateTimeType
	): FeeInvoiceRpt

	getTransactionReport(
		class_id: String,
		from_date: DateTimeType,
		to_date: DateTimeType
	): FeeInvoiceRpt

  }

  extend type Mutation {
	addFeeTransaction(input: FeeTransactionInput): FeeTransAddResult
	editFeeTransaction(id: String!, input: FeeTransactionInput): FeeTransAddResult
	delFeeTransaction(id: String!): Status
  }

  type FeeTransAddResult {
	  receipt_no: Int
  }

  input FeeTransactionInput {
	paydate: DateTimeType
	class_id: String
	student_id: String
	fee_details: [FeeDetailsInput]
	pay_mode: String
	total_amount_payable: Float
	total_amount_discount: Float
	total_amount_paid: Float
	total_amount_balance: Float
	acad_year: String
	school_id: String
  }

  input FeeDetailsInput {
	id: String
	paydate: DateTimeType
	fee_master_id: String
	pay_mode: String
	amount_payable: Float
	amount_discount: Float
	amount_paid: Float
	amount_balance: Float
	is_paid_fully: Boolean
	paid_status: String
	receipt_no: Int
  }

  type FeePriorBalance {
	paid_status: String
	class_id: String
	class_name: String
	student_id: String
	student_name: String
	fee_master_id: String
	due_date: DateTimeType
	payable_amount: Float
	amount_payable: Float
	amount_discount: Float
	amount_paid: Float
	amount_balance: Float
	is_paid_fully: Boolean
	particulars_name: String
	install_id: String
	fee_period: String
	term_name: String
	no_of_months: Int
	from_date: DateTimeType
	to_date: DateTimeType
}

type FeePriorTotals {
	total_amount_payable: Float,
	total_amount_discount: Float,
	total_amount_paid: Float,
	total_amount_balance: Float,
}

type FeePriorBalanceResult {
	fee_data: [FeePriorBalance],
	totals: FeePriorTotals
}

type FeeReceiptResult {
	id: String,
	fee_register: FeeReceiptHeader,
	fee_details: [FeeDetails],
	acad_year: String,
	school_id: String
}

type FeeReceiptHeader {
	regId: String,
	paydate: DateTimeType,
	class_id: String,
	class_name: String,
	student_id: String,
	student_name: String,
	studentno: String,
	fathersname: String,
	address1: String,
	address2: String,
	city: String,
	district: String,
	postalcode: String,
	mobile: String,
	pay_mode: String,
	receipt_no: Int,
	total_amount_paid: Float,
	total_amount_balance: Float,
	acad_year: String,
	school_id: String,
	createdby: String,
	createdon: DateTimeType,
	updatedby: String,
	updatedon: DateTimeType,
}

type FeeDetails {
	regDtId: String,
	paid_status: String,
	particulars_name: String,
	fee_period: String,
	term_name: String,
	no_of_months: String,
	amount_discount: Float,
	amount_paid: Float,
	is_paid_fully: Boolean,
	due_date: DateTimeType,
}


type FeeTransWidgetRpt {
	daily_trans: AmountCount,
	overdue: AmountCount,
	partially_paid: AmountCount,
	fully_paid: AmountCount
}

type AmountCount {
	amount: Float,
	no_of_student: Int
}

type FeeClasswiseRpt {
	class_id: String
	class_name: String
	student_id: String
	student_name: String
	studentno: String

	particulars_name: String
	fee_period: String
	term_name: String
	no_of_months: Int

	fee_master_id: String
	due_date: DateTimeType
	payable_amount: Float

	amount_paid: Float
	amount_discount: Float
	amount_balance: Float
	paydate: DateTimeType

	paid_status: String
}

type FeeSummaryRpt {
	class_name: String
	no_of_st: String
	per_st_amount: Float
	payable_amount: Float
	total_amount_paid: Float
	overdue_amount: Float
}

type FeeInvoiceRpt {
	rows: [FeeClasswiseRpt]
	total: InvoiceTotal
}

type InvoiceTotal {
	total_amount_paid: Float
	total_amount_discount: Float
	total_amount_balance: Float
}

`;
//# sourceMappingURL=typeDef.js.map