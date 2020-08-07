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
    constructor() {
        const endPoint = process.env.SPACES_END_POINT;
        const bucket = process.env.SPACES_BUCKET;
        const accessKeyId = process.env.SPACES_ACCESS_KEY_ID;
        const secretAccessKey = process.env.SPACES_ACCESS_KEY;
        this._endPoint = endPoint;
        this._bucket = bucket;
        this._accessKeyId = accessKeyId;
        this._secretAccessKey = secretAccessKey;
    }
    uploadFile(oFile, filePath, inData, currentUser) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.dbInData = inData;
                this.uploadUser = currentUser;
                this._filePath = filePath;
                let fileStatus = "ERROR";
                const spacesEndpoint = new aws.Endpoint(this._endPoint);
                const s3 = new aws.S3({
                    endpoint: spacesEndpoint,
                    accessKeyId: this._accessKeyId,
                    secretAccessKey: this._secretAccessKey
                });
                const { createReadStream, filename, mimetype } = yield oFile;
                const crStream = createReadStream();
                const ext = filename.substr(filename.lastIndexOf(".") + 1);
                const id = shortid_1.default.generate();
                const params = {
                    Body: crStream,
                    Bucket: this._bucket,
                    Key: `${filePath}/${id}.${ext}`,
                    ACL: "public-read"
                };
                const uploadRes = () => {
                    return s3.upload(params).promise();
                };
                const result = (yield uploadRes()
                    .then((res) => __awaiter(this, void 0, void 0, function* () {
                    if (res.ETag) {
                        const saveRes = yield this.saveDB(id, ext);
                        fileStatus = "Uploaded successfully";
                        return { Messages: fileStatus };
                    }
                    else {
                        fileStatus = "No Files Uploaded";
                        return { Messages: fileStatus };
                    }
                }))
                    .catch(error => {
                    console.log(error);
                    return { Messages: fileStatus };
                }));
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    deleteFile(id, docs, filePath) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let fileStatus = "ERROR";
                const spacesEndpoint = new aws.Endpoint(this._endPoint);
                const s3 = new aws.S3({
                    endpoint: spacesEndpoint,
                    accessKeyId: this._accessKeyId,
                    secretAccessKey: this._secretAccessKey
                });
                const params = {
                    Bucket: this._bucket,
                    Key: `${filePath}/${docs.docid}`,
                };
                const delRes = () => {
                    return s3.deleteObject(params).promise();
                };
                const delResult = (yield delRes()).$response;
                if (delResult.error) {
                    console.log(delResult.error);
                    fileStatus = "No Files Deleted";
                    return { Messages: fileStatus };
                }
                else {
                    if (this.delDocsDB(id)) {
                        fileStatus = "Deleted successfully";
                    }
                    else {
                        fileStatus = "No Records Deleted";
                    }
                    return { Messages: fileStatus };
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
                const photoPath = `https://${this._bucket}.${this._endPoint}/${this._filePath}/${fileName}`;
                const entity = Object.assign(new DocsPhotos_1.DocsPhotos(), dbIn);
                entity.docid = `${id}.${ext}`;
                entity.createdby = this.uploadUser;
                entity.mediaurl = photoPath;
                if (entity.doctype === "PHOTOS") {
                    this.updatePhotoURL(photoPath);
                    const getPhotosEntity = yield this.findDocsPhotos(entity);
                    if (getPhotosEntity && getPhotosEntity.id) {
                        const upRes = yield typeorm_1.getManager()
                            .getRepository(DocsPhotos_1.DocsPhotos)
                            .update(getPhotosEntity.id, entity)
                            .catch(err => {
                            throw new exceptions_1.InternalServerError("saveDB:getPhotosEntity Error");
                        });
                    }
                }
                else {
                    const saveRes = yield typeorm_1.getManager()
                        .getRepository(DocsPhotos_1.DocsPhotos)
                        .save(entity);
                }
                return true;
            }
            catch (error) {
                throw new exceptions_1.NotFound(`SaveDB Error. Please change the search criteria`);
            }
        });
    }
    updatePhotoURL(photoPath) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const dbIn = this.dbInData;
                const entity = new Staff_1.Staff();
                entity.updatedby = this.uploadUser;
                if (dbIn.modulename === "STAFF") {
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
    findDocsPhotos(entity) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const res = typeorm_1.getManager()
                    .getRepository(DocsPhotos_1.DocsPhotos)
                    .createQueryBuilder("d")
                    .where("d.name = :name")
                    .andWhere("d.modulename = :modulename")
                    .andWhere("d.doctype = :doctype");
                if (entity.modulename === "STAFF") {
                    res.andWhere("d.staff = :staff")
                        .setParameter("staff", entity.staff);
                }
                if (entity.modulename === "STUDENT") {
                    res.andWhere("d.student = :student")
                        .setParameter("student", entity.student);
                }
                const result = res.setParameter("name", entity.name)
                    .setParameter("modulename", entity.modulename)
                    .setParameter("doctype", entity.doctype)
                    .getOne();
                return yield result;
            }
            catch (error) {
                throw new exceptions_1.NotFound(`addUpdateDocsPhotos Error. Please change the search criteria`);
            }
        });
    }
    delDocsDB(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const res = yield typeorm_1.getManager()
                    .createQueryBuilder()
                    .delete()
                    .from(DocsPhotos_1.DocsPhotos)
                    .where("id = :id", { id: id })
                    .execute();
                if (res.affected >= 1) {
                    return true;
                }
                else {
                    return false;
                }
            }
            catch (error) {
                throw new exceptions_1.InternalServerError("Unhandled Error", error);
            }
        });
    }
}
exports.UploadS3Service = UploadS3Service;
//# sourceMappingURL=UploadS3Service.js.map