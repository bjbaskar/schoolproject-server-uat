"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_1 = require("apollo-server");
exports.typeDef = apollo_server_1.gql `
  extend type Query {
    user(username: String): [User]!
    getUsers(classId: String, userType: String, pageNo: Int, pageSize: Int): UserPagination
  }
  extend type Mutation {
	registerUser(username: String!, password: String!, usertype: String!, staff: String, students: String): User
	login(username: String!, password: String!): LoggedInUser
	loginWithToken: LoggedInUser
	changePassword(newPassword: String!): Status
	resetPassword(userId: String!, password: String!): Status
	forgotPassword(username: String!, password: String!): User
	updateInactive(userId: String!): Status
	updateUser(username: String!): User
  }
  type User   {
	id: String
	username: String
	email: String
	password: String
	isactive: Boolean
	isadmin: Boolean
	roles: [Role]
	usertype: String
	staff: Staff
	students: Student
  }
  type LoggedInUser {
	token: String
	user: User
  }
  type Status {
      Messages: String
  }
  type UserPagination {
    data: [User]
    count: Int
  }
  input UserInput {
    username: String
    email: String
    password: String
    isactive: Boolean
    isadmin: Boolean
  }

`;
//# sourceMappingURL=typeDef.js.map