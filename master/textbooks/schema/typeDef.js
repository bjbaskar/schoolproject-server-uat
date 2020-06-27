"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_1 = require("apollo-server");
exports.typeDef = apollo_server_1.gql `
  extend type Query {
	getTextBook(id: String): TextBooks
	getTextBooks: [TextBooks]
  }
  extend type Mutation {
	addTextBook(input: TextBooksInput): TextBooks
	editTextBook(id: String!, input: TextBooksInput): TextBooks
	delTextBook(id: String!): Status
  }
  type TextBooks {
	id: String
	academicyear: String
	edusystem: String
	class_section: ClassSection
	subject: Subject
	bookname: String
	publisher: String
	author: String
	price: Int
	isactive: Boolean
	booktype: String
	createdby: String
	createdon: DateTimeType
	updatedby: String
	updatedon: DateTimeType
  }

  input TextBooksInput   {
	academicyear: String
	edusystem: String
	class_section: String
	subject: String
	bookname: String
	publisher: String
	author: String
	price: Int
	isactive: Boolean
	booktype: String
  }
`;
//# sourceMappingURL=typeDef.js.map