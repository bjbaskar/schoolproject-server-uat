"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_1 = require("apollo-server");
exports.typeDef = apollo_server_1.gql `
  extend type Query {
	roleFind(id: String): Role
	roleList: [Role]!
	permFind(id: String): Permissions
	permList: [Permissions]!
	rolePermList(roleId: String): Role
	userRolesList(userId: String): User
  }
  extend type Mutation {
	roleAdd(role: RoleInput): Role
	roleEdit(id: String!, role: RoleInput): Role
	roleDelete(id: String!): Status
	permAddToRole(roleId: String!, permIds: [String]!): Status
	rolesAddToUser(userId: String!, roleIds: [String]!): Status
  }
  type Role {
	id: String
	rolename: String
	permissions: [Permissions]
	user: [User]
  }
  input RoleInput {
	rolename: String
  }

  type Permissions {
	id: String
	module: String
	title: String
	key: String
  }
`;
//# sourceMappingURL=typeDef.js.map