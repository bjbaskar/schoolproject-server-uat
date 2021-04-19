"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_1 = require("apollo-server");
exports.typeDef = apollo_server_1.gql `
  extend type Query {
		getSchoolProfile: SchoolProfile!
	}
  extend type Mutation {
		registerSchool(input: SchoolProfileInput): SchoolProfile
		editSchoolProfile(id: String!, input: SchoolProfileInput): SchoolProfile
		deleteSchool(id: String!): SchoolProfile
	}

  type SchoolProfile {
		id: String
		name: String
		surname: String
		logo: String
		sector: String
		provider: String
		type: String
		dateopened: DateTimeType
		recognitiondate: DateTimeType
		address: String
		postalcode: String
		district: String
		taluk: String
		phone: String
		mobile: String
		locality: String
		latitude: String
		longitude: String
		createdby: String
		createdon: DateTimeType
		updatedby: String
		updatedon: DateTimeType
		rules: [SchoolRulesRegulations]
		isactive: Boolean
	}

	type SchoolRulesRegulations {
		title: String
		data: [SchoolRulesRegulationsData]
	}

	type SchoolRulesRegulationsData {
		entext: String
		tamiltext: String
	}

  	input SchoolProfileInput {
		address: String
		postalcode: String
		district: String
		taluk: String
		phone: String
		mobile: String
		locality: String
		latitude: String
		longitude: String
	}
`;
//# sourceMappingURL=typeDef.js.map