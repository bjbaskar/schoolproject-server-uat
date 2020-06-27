"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_1 = require("apollo-server");
exports.typeDef = apollo_server_1.gql `
	extend type Query {
		getAttendance(classId: String, start: DateTimeType, end: DateTimeType): [Attendance]
		getStudAttByClass(classId: String, currDate: DateTimeType): AttendanceEntry
		getPieChartByMonth(classId: String, studentId: String, currDate: String): AttPieChart
		getPieChartClassWiseByMonth(classId: String, currDate: String): AttPieChart
	}
	extend type Mutation {
		addStudAttendance(input: AttendanceInput): Status
		editStudAttendance(input: AttendanceInput): Status
		delStudAttendance(id: String): Status
	}

	input AttendanceInput {
		attdate: DateTimeType
		classid: String
		studentid: [String]
		session: String
		allpresent: Boolean
		notes: String
	}

	type Attendance {
		id: String
		attdate: DateTimeType
		classid: String
		studentid: String
		session: String
		allpresent: Boolean
		notes: String
	}

	type AttendanceEntry {
		students: [AttStud],
		isnew: Boolean
	}

	type AttStud {
		id: String
		firstname: String
		lastname: String
		gender: String
		selected: String
	}

	type AttPieChart {
		chartdata: [AttChartData]
		attrate: Float
	}
	type AttChartData {
		x: String
		y: Int
	}
`;
//# sourceMappingURL=typeDef.js.map