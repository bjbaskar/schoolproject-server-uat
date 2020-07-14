"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_1 = require("apollo-server");
exports.typeDef = apollo_server_1.gql `
	extend type Mutation {
		uploadSingleFile(input: UploadInput): Status
		delDocuments(id: String, input: UploadDInput): Status
	}
	extend type Query {
		getDocuments(id: String!, searchfor: String!): [DocsPhotos]
		downloadFile(input: UploadDInput): DownloadFile
	}
	type DocsPhotos {
		id: String
		name: String
		modulename: String
		doctype: String
		docid: String
		filesize: String
		filetype: String
		mediaurl: String
		createdby: String
		createdon: DateTimeType
	}
	type DownloadFile {
		name: String
		docid: String
		file: String
	}

	input UploadInput {
		file: Upload!
		name: String
		modulename: String
		doctype: String
		filesize: String
		filetype: String
		staff: String
		student: String
		school: String
		assignment: String
	}

	input UploadDInput {
		name: String
		modulename: String
		doctype: String
		docid: String
		staff: String
		student: String
		school: String
		assignment: String
	}
 `;
//# sourceMappingURL=typeDef.js.map