"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_1 = require("apollo-server");
exports.typeDef = apollo_server_1.gql `
  extend type Query {
    getCalendar(name: String): Calendar
	 getCalendarsByRange(start: DateTimeType,  end: DateTimeType): [Calendar]
    getCalendars: [Calendar]
	 getTodaysEvents: [Calendar]
  }
  extend type Mutation {
    addCalendar(input: CalendarInput): Calendar
    editCalendar(id: String!, input: CalendarInput): Status
    delCalendar(id: String!): Status
  }
  type Calendar {
		id: String
		title: String
		description: String
		eventstype: String
		start: DateTimeType
		end: DateTimeType
		allDay: Boolean
		createdby: String
		createdon: DateTimeType
		updatedby: String
		updatedon: DateTimeType
  }

  input CalendarInput {
	 title: String
	 description: String
	 eventstype: String
    start: DateTimeType
    end: DateTimeType
	 allDay: Boolean
  }
`;
//# sourceMappingURL=typeDef.js.map