"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_1 = require("apollo-server");
exports.typeDef = apollo_server_1.gql `
    extend type Query {
		getAcadYear(id: String): AcadYear
		getAcadYears: [AcadYear]
		getNextAcadYear: [AcadYear]
		getAcadYearByCurrent: AcadYear
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
		is_current: Boolean
		is_next: Boolean
		createdby: String
		createdon: DateTimeType
		updatedby: String
		updatedon: DateTimeType
    }

    input AcadYearInput   {
		fromdate: DateTimeType
		todate: DateTimeType
		displayname: String
		prefixyear: Int
		is_current: Boolean
		is_next: Boolean
    }
`;
//# sourceMappingURL=typeDef.js.map