"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = {
    Query: {
        getDocuments: (_, args, context) => __awaiter(this, void 0, void 0, function* () {
            return yield context.UploadService.getDocuments(args.id, args.searchfor);
        }),
        downloadFile: (_, args, context) => __awaiter(this, void 0, void 0, function* () {
            const moduleName = args.input.modulename;
            const docType = args.input.doctype;
            let photopath = context.Setting.config.upload.schooldocspath;
            if (moduleName === "SCHOOL" && docType === "DOCS") {
                photopath = context.Setting.config.upload.schooldocspath;
            }
            if (moduleName === "SCHOOL" && docType === "PHOTO") {
                photopath = context.Setting.config.upload.schoolphotopath;
            }
            if (moduleName === "STAFF" && docType === "DOCS") {
                photopath = context.Setting.config.upload.staffdocspath;
            }
            if (moduleName === "STAFF" && docType === "PHOTO") {
                photopath = context.Setting.config.upload.staffphotopath;
            }
            if (moduleName === "STUDENT" && docType === "DOCS") {
                photopath = context.Setting.config.upload.studentdocspath;
            }
            if (moduleName === "STUDENT" && docType === "PHOTO") {
                photopath = context.Setting.config.upload.schoolphotopath;
            }
            const res = yield context.UploadService.downloadFile(args.input, photopath);
            return res;
        })
    },
    Mutation: {
        uploadSingleFile: (root, args, context) => __awaiter(this, void 0, void 0, function* () {
            const currentUser = context.CurrentUser.UserName;
            const oFile = yield args.input.file;
            const inData = args.input;
            const moduleName = inData.modulename;
            const docType = inData.doctype;
            inData.file = undefined;
            let photopath = context.Setting.config.upload.schooldocspath;
            if (moduleName === "SCHOOL" && docType === "DOCS") {
                photopath = context.Setting.config.upload.schooldocspath;
            }
            if (moduleName === "SCHOOL" && docType === "PHOTO") {
                photopath = context.Setting.config.upload.schoolphotopath;
            }
            if (moduleName === "STAFF" && docType === "DOCS") {
                photopath = context.Setting.config.upload.staffdocspath;
            }
            if (moduleName === "STAFF" && docType === "PHOTO") {
                photopath = context.Setting.config.upload.staffphotopath;
            }
            if (moduleName === "STUDENT" && docType === "DOCS") {
                photopath = context.Setting.config.upload.studentdocspath;
            }
            if (moduleName === "STUDENT" && docType === "PHOTO") {
                photopath = context.Setting.config.upload.studentphotopath;
            }
            if (moduleName === "ASGN" && docType === "DOCS") {
                photopath = context.Setting.config.upload.asgndocspath;
            }
            if (moduleName === "ASGN" && docType === "PHOTO") {
                photopath = context.Setting.config.upload.asgnphotopath;
            }
            const res = yield context.UploadService.uploadPhoto(oFile, inData, photopath, currentUser);
            return res;
        }),
        delDocuments(root, args, context) {
            return __awaiter(this, void 0, void 0, function* () {
                const moduleName = args.input.modulename;
                const docType = args.input.doctype;
                let photopath = context.Setting.config.upload.schooldocspath;
                if (moduleName === "SCHOOL" && docType === "DOCS") {
                    photopath = context.Setting.config.upload.schooldocspath;
                }
                if (moduleName === "SCHOOL" && docType === "PHOTO") {
                    photopath = context.Setting.config.upload.schoolphotopath;
                }
                if (moduleName === "STAFF" && docType === "DOCS") {
                    photopath = context.Setting.config.upload.staffdocspath;
                }
                if (moduleName === "STAFF" && docType === "PHOTO") {
                    photopath = context.Setting.config.upload.staffphotopath;
                }
                if (moduleName === "STUDENT" && docType === "DOCS") {
                    photopath = context.Setting.config.upload.studentdocspath;
                }
                if (moduleName === "STUDENT" && docType === "PHOTO") {
                    photopath = context.Setting.config.upload.schoolphotopath;
                }
                if (moduleName === "ASGN" && docType === "DOCS") {
                    photopath = context.Setting.config.upload.asgndocspath;
                }
                if (moduleName === "ASGN" && docType === "PHOTO") {
                    photopath = context.Setting.config.upload.asgnphotopath;
                }
                const res = yield context.UploadService.delDocuments(args.id, args.input, photopath);
                return res;
            });
        }
    }
};
//# sourceMappingURL=resolver.js.map