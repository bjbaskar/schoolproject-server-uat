"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_1 = require("apollo-server");
exports.typeDef = apollo_server_1.gql `
	extend type Query {
		getFeedback: [Feedback]
	}
	extend type Mutation {
		addFeedback(input: FeedbackInput): Feedback
		editFeedback(id: String!, input: FeedbackInput): Feedback
		delFeedback(id: String!): Status
	}

	input FeedbackInput {
		rating: Int
		desc: String
		qa: String
		staff: String
		student: String
	}

	type Feedback {
		id: String
		rating: Int
		desc: String
		qa: String
		staff: String
		student: String
		createdby: String
		createdon: DateTimeType
	}
`;
//# sourceMappingURL=typeDef.js.map