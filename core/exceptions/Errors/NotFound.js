"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Exceptions_1 = require("../Exceptions");
class NotFound extends Exceptions_1.Exception {
    constructor(message, origin) {
        super(NotFound.STATUS, message, origin);
        this.name = "NOT_FOUND";
    }
}
NotFound.STATUS = 404;
exports.NotFound = NotFound;
//# sourceMappingURL=NotFound.js.map