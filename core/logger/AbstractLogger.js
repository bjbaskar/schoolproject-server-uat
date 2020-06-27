"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = require("inversify");
let AbstractLogger = class AbstractLogger {
    error(message) {
        this.log("ERROR", message);
    }
    warn(message) {
        this.log("WARN", message);
    }
    info(message) {
        this.log("INFO", message);
    }
    debug(message) {
        this.log("DEBUG", message);
    }
    verbose(message) {
        this.log("VERBOSE", message);
    }
};
AbstractLogger = __decorate([
    inversify_1.injectable()
], AbstractLogger);
exports.AbstractLogger = AbstractLogger;
//# sourceMappingURL=AbstractLogger.js.map