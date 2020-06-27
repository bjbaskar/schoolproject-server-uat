"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Exceptions_1 = require("../Exceptions");
class BadMapping extends Exceptions_1.Exception {
    constructor(message, origin) {
        super(BadMapping.STATUS, message, origin);
        this.name = "BAD_MAPPING";
    }
}
BadMapping.STATUS = 421;
exports.BadMapping = BadMapping;
//# sourceMappingURL=BadMapping.js.map