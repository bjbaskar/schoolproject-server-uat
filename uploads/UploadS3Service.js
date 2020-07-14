"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const aws = __importStar(require("aws-sdk"));
const shortid_1 = __importDefault(require("shortid"));
const typeorm_1 = require("typeorm");
const DocsPhotos_1 = require("../core/entities/DocsPhotos/DocsPhotos");
const Staff_1 = require("../core/entities/Staff/Staff");
const exceptions_1 = require("../core/exceptions");
const Student_1 = require("../core/entities/Students/Student");
class UploadS3Service {
    constructor() { }
    uploadFile(oFile, filePath, inData, currentUser) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.dbInData = inData;
                this.uploadUser = currentUser;
                this._filePath = filePath;
                const endPoint = process.env.SPACES_END_POINT;
                const accessKeyId = process.env.SPACES_ACCESS_KEY_ID;
                const secretAccessKey = process.env.SPACES_ACCESS_KEY;
                const bucket = process.env.SPACES_BUCKET;
                this._endPoint = endPoint;
                this._bucket = bucket;
                let fileStatus = "ERROR";
                const spacesEndpoint = new aws.Endpoint(endPoint);
                const s3 = new aws.S3({
                    endpoint: spacesEndpoint,
                    accessKeyId: accessKeyId,
                    secretAccessKey: secretAccessKey
                });
                const { createReadStream, filename, mimetype } = yield oFile;
                const crStream = createReadStream();
                const ext = filename.substr(filename.lastIndexOf(".") + 1);
                const id = shortid_1.default.generate();
                const params = {
                    Body: crStream,
                    Bucket: bucket,
                    Key: `${filePath}/${id}.${ext}`,
                    ACL: "public-read"
                };
                const res = () => __awaiter(this, void 0, void 0, function* () {
                    return s3.putObject(params).promise();
                });
                const result = (yield res()).$response;
                if (result.error) {
                    fileStatus = "No Files Uploaded";
                    console.log(result.error, result.error.stack);
                    return { Messages: fileStatus };
                }
                if (result.data) {
                    const res = yield this.saveDB(id, ext);
                    if (res) {
                        fileStatus = "Uploaded successfully";
                        return { Messages: fileStatus };
                    }
                    else {
                        fileStatus = "No Files Uploaded";
                        return { Messages: fileStatus };
                    }
                }
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    saveDB(id, ext) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const dbIn = this.dbInData;
                const fileName = `${id}.${ext}`;
                const photoPath = `//${this._bucket}.${this._endPoint}/${this._filePath}/${fileName}`;
                const entity = Object.assign(new DocsPhotos_1.DocsPhotos(), dbIn);
                entity.docid = `${id}.${ext}`;
                entity.createdby = this.uploadUser;
                entity.mediaurl = photoPath;
                if (entity.doctype === "PHOTOS") {
                    this.updatePhotoURL(id, ext);
                }
                const res = yield typeorm_1.getManager()
                    .getRepository(DocsPhotos_1.DocsPhotos)
                    .save(entity);
                return res;
            }
            catch (error) {
                throw new exceptions_1.NotFound(`SaveDB Error. Please change the search criteria`);
            }
        });
    }
    updatePhotoURL(id, ext) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const dbIn = this.dbInData;
                const entity = new Staff_1.Staff();
                entity.updatedby = this.uploadUser;
                if (dbIn.modulename === "STAFF") {
                    const fileName = `${id}.${ext}`;
                    const photoPath = `//${this._bucket}.${this._endPoint}/${this._filePath}/${fileName}`;
                    const staffEntity = {
                        id: dbIn.staff,
                        photo: photoPath
                    };
                    const profileUpd = yield typeorm_1.getManager()
                        .getRepository(Staff_1.Staff)
                        .update(dbIn.staff, staffEntity)
                        .catch(error => {
                        throw new exceptions_1.NotFound(`Staff data not saved ${error}`);
                    });
                }
                else if (dbIn.modulename === "STUDENT") {
                    const fileName = `${id}.${ext}`;
                    const photoPath = `//${this._bucket}.${this._endPoint}/${this._filePath}/${fileName}`;
                    const studentEntity = {
                        id: dbIn.student,
                        photo: photoPath
                    };
                    const profileUpd = yield typeorm_1.getManager()
                        .getRepository(Student_1.Students)
                        .update(dbIn.student, studentEntity)
                        .catch(error => {
                        throw new exceptions_1.NotFound(`Student data not saved ${error}`);
                    });
                }
                return true;
            }
            catch (error) {
                throw new exceptions_1.NotFound(`SaveDB Error. Please change the search criteria`);
            }
        });
    }
}
exports.UploadS3Service = UploadS3Service;
//# sourceMappingURL=UploadS3Service.js.map