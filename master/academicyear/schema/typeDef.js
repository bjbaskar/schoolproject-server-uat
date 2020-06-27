"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_1 = require("apollo-server");
exports.typeDef = apollo_server_1.gql `
    extend type Query {
		getAcadYear(id: String): AcadYear
		getAcadYears: [AcadYear]
    }
    extend type Mutation {
		addAcadYear(input: AcadYearInput): AcadYear
		editAcadYear(id: String!, input: AcadYearInput): AcadYear
		delAcadYear(id: String!): Status
    }
    type AcadYear   {
		id: String
		fromdate: DateTimeType
		todate: DateTimeType
		displayname: String
		prefixyear: Int
		isactive: Boolean
    }

    input AcadYearInput   {
		fromdate: DateTimeType
		todate: DateTimeType
		displayname: String
		prefixyear: Int
		isactive: Boolean
    }
`;
//# sourceMappingURL=typeDef.js.map