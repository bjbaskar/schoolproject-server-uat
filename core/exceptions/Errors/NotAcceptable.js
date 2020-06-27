"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Exceptions_1 = require("../Exceptions");
class NotAcceptable extends Exceptions_1.Exception {
    constructor(message, origin = "You must accept content-type " + message) {
        super(NotAcceptable.STATUS, origin);
        this.name = "NOT_ACCEPTABLE";
    }
}
NotAcceptable.STATUS = 406;
exports.NotAcceptable = NotAcceptable;
//# sourceMappingURL=NotAcceptable.js.map