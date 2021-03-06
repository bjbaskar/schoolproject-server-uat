"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Exceptions_1 = require("../Exceptions");
class InternalServerError extends Exceptions_1.Exception {
    constructor(message, origin) {
        super(InternalServerError.STATUS, message, origin);
        this.name = "INTERNAL_SERVER_ERROR";
    }
}
InternalServerError.STATUS = 500;
exports.InternalServerError = InternalServerError;
//# sourceMappingURL=InternalServerError.js.map