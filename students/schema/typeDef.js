"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_1 = require("apollo-server");
exports.typeDef = apollo_server_1.gql `
extend type Query {
	getStudent(id: String): Student
	studentList(pageNo: Int, pageSize: Int, sortCol: String, isAsc: String, filter: StudentFilter): StudentPagination!
	# parentsList(pageNo: Int, pageSize: Int): [Parents]!
	# addressList(pageNo: Int, pageSize: Int): [Address]!
	# studentByParent(parentId: String): [ParentStudent]
	# studentByAddress(addressId: String): AddressParentStudent
	getStudentByClass(classId: String): [Student]
}
extend type Mutation {
	addNewAdmission(profile: StudentInput, parents: ParentsInput, address: AddressInput, class_section: String): Student
	editProfileParents(id: String!, profile: StudentInput, parents: ParentsInput, classId: String): Status
	# studentProfileEdit(id: String!, student: StudentInput, classId: String): Student
	# studentParentsEdit(id: String!, parents: ParentsInput): Parents
	# studentParentsAdd(id: String!, parents: ParentsInput): Parents
	editAddress(id: String!, address: AddressInput): Status
	studentInactive(id: String!): Status
}

type Student {
	id: String
	studentno: String
	aadhaarno: String
	emisno: String
	udiseno: String
	firstname: String
	lastname: String
	gender: String
	dob: DateTimeType
	doj: DateTimeType
	nationality: String
	religion: String
	castecategory: String
	community: String
	mothertongue: String
	bloodgroup: String
	identification: String
	isactive: Boolean
	disability: String
	notes: String
	createdby: String
	createdon: DateTimeType
	updatedby: String
	updatedon: DateTimeType
	parents: [Parents]
	classsec: [ClassSection]
}

input StudentInput   {
	studentno: String
	aadhaarno: String
	emisno: String
	udiseno: String
	firstname: String
	lastname: String
	gender: String
	dob: DateTimeType
	doj: DateTimeType
	nationality: String
	religion: String
	castecategory: String
	community: String
	mothertongue: String
	bloodgroup: String
	identification: String
	isactive: Boolean
	disability: String
	notes: String
}

input ParentsInput {
	id: String
	fathername: String
	fatherdob: DateTimeType
	fathergraduation: String
	fatheroccupation: String
	fathercompanyname: String
	fatherincome: Int
	fatheraadhaarno: String
	mothername: String
	motherdob: DateTimeType
	mothergraduation: String
	motheroccupation: String
	mothercompanyname: String
	motherincome: Int
	motheraadhaarno: String
	guardianname: String
	guardianoccupation: String
	notes: String
}

input AddressInput {
	type: String
	address1: String
	address2: String
	city: String
	district: String
	state: String
	country: String
	postalcode: Int
	mobile: String
	homephone: String
	email: String
	notes: String
}

type Parents {
	id: String
	fathername: String
	fatherdob: DateTimeType
	fathergraduation: String
	fatheroccupation: String
	fathercompanyname: String
	fatherincome: Int
	fatheraadhaarno: String
	mothername: String
	motherdob: DateTimeType
	mothergraduation: String
	motheroccupation: String
	mothercompanyname: String
	motherincome: Int
	motheraadhaarno: String
	guardianname: String
	guardianoccupation: String
	notes: String
	address: [Address]
}

type Address {
	id: String
	type: String
	address1: String
	address2: String
	city: String
	district: String
	state: String
	country: String
	postalcode: Int
	mobile: String
	homephone: String
	email: String
	notes: String
}

type ParentStudent {
	id: String
	relation: String
	firstname: String
	lastname: String
	dob: DateTimeType
	graduation: String
	occupation: String
	companyname: String
	income: Int
	aadhaarno: String
	notes: String
	students: [Student]
	address: [Address]
}

type AddressParentStudent {
	id: String
	type: String
	address1: String
	address2: String
	city: String
	state: String
	country: String
	postalcode: Int
	mobile: String
	homephone: String
	email: String
	notes: String
	parents: [ParentStudent]
}

type StudentPagination {
	rows: [Student]
	count: Int
 }

 input StudentFilter {
	classId: String
	genderId: String
	textId: String
 }
`;
//# sourceMappingURL=typeDef.js.map