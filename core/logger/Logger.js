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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
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
const fs = __importStar(require("fs"));
const inversify_1 = require("inversify");
const winston = __importStar(require("winston"));
const winston_daily_rotate_file_1 = __importDefault(require("winston-daily-rotate-file"));
const AbstractSetting_1 = require("../config/AbstractSetting");
const AbstractLogger_1 = require("./AbstractLogger");
const InversifyTypes_1 = require("../config/InversifyTypes");
const format = winston.format;
let Logger = class Logger extends AbstractLogger_1.AbstractLogger {
    constructor(settings) {
        super();
        this.settings = settings;
        this.checkForLogFileDir();
        this.initializeLogger();
    }
    log(level, message) {
        this.logger.log(level.toLowerCase(), message);
    }
    checkForLogFileDir() {
        const dir = this.settings.config.log.filedir;
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
        }
    }
    initializeLogger() {
        this.logger = winston.createLogger({
            format: format.combine(format.colorize(), format.timestamp({
                format: "DD-MMM-YYYY HH:mm:ss"
            }), format.printf(info => `${info.timestamp} : ${info.level} : ${info.message}`)),
            transports: [
                new winston.transports.Console({}),
                new winston_daily_rotate_file_1.default({
                    filename: this.settings.config.log.filename,
                    dirname: this.settings.config.log.filedir,
                    maxSize: 20971520,
                    maxFiles: 25,
                    datePattern: "DD-MMM-YYYY",
                    zippedArchive: true
                })
            ]
        });
    }
};
Logger = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(InversifyTypes_1.TYPES.Setting)),
    __metadata("design:paramtypes", [AbstractSetting_1.AbstractSetting])
], Logger);
exports.Logger = Logger;
//# sourceMappingURL=Logger.js.map