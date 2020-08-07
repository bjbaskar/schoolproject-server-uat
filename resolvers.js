"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_1 = require("apollo-server");
const graphql_upload_1 = require("graphql-upload");
const lodash_1 = require("lodash");
const schema_1 = require("./users/schema");
const schema_2 = require("./userroles/schema");
const schema_3 = require("./master/dataconfig/schema");
const schema_4 = require("./master/schoolprofile/schema");
const schema_5 = require("./master/academicyear/schema");
const schema_6 = require("./master/edusystems/schema");
const schema_7 = require("./master/subjects/schema");
const schema_8 = require("./master/classsec/schema");
const schema_9 = require("./master/textbooks/schema");
const schema_10 = require("./master/holidays/schema");
const schema_11 = require("./master/calendar/schema");
const schema_12 = require("./students/schema");
const schema_13 = require("./staff/schema");
const schema_14 = require("./uploads/schema");
const schema_15 = require("./dashboard/schema");
const schema_16 = require("./attendance/schema");
const schema_17 = require("./assignment/schema");
const schema_18 = require("./exams/schema");
const schema_19 = require("./feedback/schema");
const upScalartypeDefs = `
  scalar Upload
`;
const upScalarResolvers = {
    Upload: graphql_upload_1.GraphQLUpload
};
const BaseQuery = `
	scalar DateTimeType
	type Query {
	_: Boolean
	}
	type Mutation {
	_: Boolean
	}
`;
const allTypeDefs = [
    BaseQuery,
    schema_1.userTypeDef,
    schema_2.roleTypeDef,
    schema_4.schoolProfileDef,
    schema_5.aYearTypeDef,
    schema_6.eduType,
    schema_7.subjTypeDef,
    schema_8.classTypeDef,
    schema_9.textbookType,
    schema_3.dConfigTypeDef,
    schema_10.holidayTypeDef,
    schema_11.calTypeDef,
    schema_12.studentTypeDef,
    schema_13.staffTypeDef,
    upScalartypeDefs,
    schema_14.uploadTypeDef,
    schema_15.dashBoardTypeDef,
    schema_16.attendanceTypeDef,
    schema_17.assignTypeDef,
    schema_18.examTypeDef,
    schema_19.feedbackTypeDef
];
const allResolvers = lodash_1.merge({}, schema_1.userResolver, schema_2.roleResolver, schema_4.schoolProfileResolver, schema_5.aYearResolver, schema_6.eduResolver, schema_7.subjResolver, schema_8.classResolver, schema_9.textbookResolver, schema_3.dConfigResolver, schema_10.holidayResolver, schema_11.calResolver, schema_12.studentResolver, schema_13.staffResolver, upScalarResolvers, schema_14.uploadResolver, schema_15.dashBoardResolver, schema_16.attendanceResolver, schema_17.assignResolver, schema_18.examResolver, schema_19.feedbackResolver);
exports.default = apollo_server_1.makeExecutableSchema({
    typeDefs: allTypeDefs,
    resolvers: allResolvers
});
//# sourceMappingURL=resolvers.js.map