"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = require("inversify");
const typeorm_1 = require("typeorm");
const shortid_1 = __importDefault(require("shortid"));
const exceptions_1 = require("../core/exceptions");
const mkdirp_1 = __importDefault(require("mkdirp"));
const fs_1 = __importStar(require("fs"));
const path_1 = __importDefault(require("path"));
const DocsPhotos_1 = require("../core/entities/DocsPhotos/DocsPhotos");
let UploadService = class UploadService {
    constructor() { }
    uploadPhoto(oFile, inData, photopath, currentUser) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.dbInData = inData;
                this.uploadUser = currentUser;
                yield mkdirp_1.default.sync(photopath);
                const res = yield this.processUpload(oFile, photopath);
                if (res) {
                    return { Messages: "Uploaded successfully" };
                }
                else {
                    return { Messages: "No Files Uploaded" };
                }
            }
            catch (error) {
                console.log(error);
                return error;
            }
        });
    }
    processUpload(upload, photopath) {
        return __awaiter(this, void 0, void 0, function* () {
            const { createReadStream, filename, mimetype } = yield upload;
            const crStream = createReadStream();
            const { id, ext, path } = yield this.saveFS(crStream, filename, photopath);
            const res = yield this.saveDB(id, ext);
            return res;
        });
    }
    saveFS(crStream, filename, photopath) {
        const id = shortid_1.default.generate();
        const ext = filename.substr(filename.lastIndexOf(".") + 1);
        let savePath = `../../${photopath}/${id}.${ext}`;
        savePath = path_1.default.join(__dirname, savePath);
        return new Promise((resolve, reject) => {
            const writeStream = fs_1.createWriteStream(savePath);
            writeStream.on("finish", () => resolve({ id, ext, path: path_1.default }));
            writeStream.on("error", (error) => {
                fs_1.unlink(savePath, () => {
                    reject(error);
                });
            });
            crStream.on("error", (error) => writeStream.destroy(error));
            crStream.pipe(writeStream);
        });
    }
    saveDB(id, ext) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const dbIn = this.dbInData;
                const entity = Object.assign(new DocsPhotos_1.DocsPhotos(), dbIn);
                entity.docid = `${id}.${ext}`;
                entity.createdby = this.uploadUser;
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
    getDocuments(id, searchfor) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = typeorm_1.getManager()
                    .getRepository(DocsPhotos_1.DocsPhotos)
                    .createQueryBuilder("docs")
                    .where("docs.doctype = :value", { value: "DOCS" });
                if (searchfor === "STAFF") {
                    query.andWhere("docs.staff = :staffId", { staffId: id });
                }
                if (searchfor === "STUDENT") {
                    query.andWhere("docs.student = :studentId", { studentId: id });
                }
                const res = yield query.getMany();
                return res;
            }
            catch (error) {
                throw new exceptions_1.NotFound(`Documents not found. Please change the search criteria`);
            }
        });
    }
    delDocuments(id, docs, photopath) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let delPath = `../../${photopath}/${docs.docid}`;
                delPath = path_1.default.join(__dirname, delPath);
                const promiseObj = new Promise((resolve, reject) => {
                    fs_1.default.unlink(delPath, function (err) {
                        return __awaiter(this, void 0, void 0, function* () {
                            if (err) {
                                reject(err);
                            }
                            resolve();
                        });
                    });
                });
                promiseObj.then(res => {
                    return this.delDocsDB(id);
                }).catch(err => {
                    return new exceptions_1.NotFound(`Documents not found. ${err}`);
                });
            }
            catch (error) {
                throw new exceptions_1.NotFound(`Documents not found. Please change the search criteria`);
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
                    return { Messages: "Deleted successfully" };
                }
                else {
                    return { Messages: "No Records Deleted" };
                }
            }
            catch (error) {
                throw new exceptions_1.InternalServerError("Unhandled Error", error);
            }
        });
    }
    downloadFile(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const p = path_1.default.join(__dirname, "../../");
                const file = `${p}upload_folder/87O7yzuEZ.jpg`;
                const s = fs_1.default.createReadStream(file);
                s.on("open", function () {
                    res.set("Content-Type", "image/jpeg");
                    s.pipe(res);
                });
                s.on("error", function (err) {
                    console.log(err);
                    res.set("Content-Type", "text/plain");
                    res.status(404).end("Not found");
                });
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    downloadFile1(docs, photopath) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return new Promise((resolve, reject) => {
                    let filePath = `../../${photopath}/${docs.docid}`;
                    filePath = path_1.default.join(__dirname, filePath);
                    const res = this.base64_encode(filePath);
                    return resolve({
                        name: docs.name,
                        docid: docs.docid,
                        file: res
                    });
                });
            }
            catch (error) {
                throw new exceptions_1.InternalServerError("Download Error", error);
            }
        });
    }
    base64ToArrayBuffer(base64) {
        return __awaiter(this, void 0, void 0, function* () {
            const binaryString = window.atob(base64);
            const binaryLen = binaryString.length;
            const bytes = new Uint8Array(binaryLen);
            for (let i = 0; i < binaryLen; i++) {
                const ascii = binaryString.charCodeAt(i);
                bytes[i] = ascii;
            }
            return bytes;
        });
    }
    base64_encode(file) {
        return __awaiter(this, void 0, void 0, function* () {
            const bitmap = fs_1.default.readFileSync(file);
            return new Buffer(bitmap).toString("base64");
        });
    }
};
UploadService = __decorate([
    inversify_1.injectable(),
    __metadata("design:paramtypes", [])
], UploadService);
exports.UploadService = UploadService;
//# sourceMappingURL=UploadService.js.map