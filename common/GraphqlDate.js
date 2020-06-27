"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const language_1 = require("graphql/language");
const DateTimeType = {
    Date: new graphql_1.GraphQLScalarType({
        name: "Date",
        description: "Date custom scalar type",
        parseValue(value) {
            return new Date(value);
        },
        serialize(value) {
            return value.getTime();
        },
        parseLiteral(ast) {
            if (ast.kind === language_1.Kind.INT) {
                return new Date(ast.value);
            }
            return undefined;
        }
    })
};
exports.default = DateTimeType;
//# sourceMappingURL=GraphqlDate.js.map