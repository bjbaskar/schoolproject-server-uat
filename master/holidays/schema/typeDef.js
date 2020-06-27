"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_1 = require("apollo-server");
exports.typeDef = apollo_server_1.gql `
  extend type Query {
    getHoliday(name: String): Holiday
	 getHolidaysByRange(fromdate: DateTimeType,  todate: DateTimeType): [Holiday]
    getHolidays: [Holiday]
  }
  extend type Mutation {
    addHoliday(input: HolidayInput): Holiday
    editHoliday(id: String!, input: HolidayInput): Status
    delHoliday(id: String!): Status
  }
  type Holiday {
		id: String
		occasion: String
		description: String
		holidaytype: String
		fromdate: DateTimeType
		fdayofweek: String
		todate: DateTimeType
		tdayofweek: String
		comments: String
		status: Boolean
		createdby: String
		createdon: DateTimeType
		updatedby: String
		updatedon: DateTimeType
  }

  input HolidayInput {
		occasion: String
		description: String
		holidaytype: String
		fromdate: DateTimeType
		fdayofweek: String
		todate: DateTimeType
		tdayofweek: String
		comments: String
		status: Boolean
  }
`;
//# sourceMappingURL=typeDef.js.map