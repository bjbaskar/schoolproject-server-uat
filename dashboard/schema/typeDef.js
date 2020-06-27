"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_1 = require("apollo-server");
exports.typeDef = apollo_server_1.gql `
  extend type Query {
    getLoginCount(filter: String): [LoginHistory]
	 getLoginCountChart(filter: String): [LoginHistoryChart]
	 getStudentCount(classId: String): [StudentCount]
  }

  type StudentCount {
	classId: String
	name: String
	boys: Int
	girls: Int
	total: Int
  }

  type LoginHistory {
	username: String
	os: String
	browser: String
	cpu: String
	device: String
	engine: String
	lastlogin: DateTimeType
	count: Int
  }

  type LoginHistoryChart {
	  lastlogin: DateTimeType
	  count: Int
  }


`;
//# sourceMappingURL=typeDef.js.map