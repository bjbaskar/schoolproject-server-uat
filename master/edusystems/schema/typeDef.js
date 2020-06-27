"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_1 = require("apollo-server");
exports.typeDef = apollo_server_1.gql `
    extend type Query {
		getEduSystem(id: String): EduSystem
		getEduSystems: [EduSystem]
    }
    extend type Mutation {
		addEduSystem(input: EduSystemInput): EduSystem
		editEduSystem(id: String!, input: EduSystemInput): EduSystem
		delEduSystem(id: String!): Status
    }
    type EduSystem   {
		id: String
		name: String
		levels: String
    }

    input EduSystemInput   {
		name: String
		levels: String
    }
`;
//# sourceMappingURL=typeDef.js.map