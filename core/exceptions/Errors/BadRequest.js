"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Exceptions_1 = require("../Exceptions");
class BadRequest extends Exceptions_1.Exception {
    constructor(message, origin) {
        super(BadRequest.STATUS, message, origin);
        this.name = "BAD_REQUEST";
    }
}
BadRequest.STATUS = 400;
exports.BadRequest = BadRequest;
//# sourceMappingURL=BadRequest.js.map