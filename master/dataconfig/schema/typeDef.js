"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_1 = require("apollo-server");
exports.typeDef = apollo_server_1.gql `
	extend type Query {
		getDataconfig(filter: String): [DataConfig]
		getAllDataconfigs: [DataConfig]
		getCaste: [Caste]
	}
	extend type Mutation {
		addDataConfig(input: DataConfigInput): DataConfig
		editDataConfig(id: String!, input: DataConfigInput): DataConfig
		delDataConfig(id: String!): Status
	}
	type DataConfig {
		id: String
		name: String
		value: String
	}
	type Caste {
		id: String
		name: String
	}

	input DataConfigInput   {
		name: String
		value: String
	}
`;
//# sourceMappingURL=typeDef.js.map