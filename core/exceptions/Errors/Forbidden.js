"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Exceptions_1 = require("../Exceptions");
class Forbidden extends Exceptions_1.Exception {
    constructor(message, origin) {
        super(Forbidden.STATUS, message, origin);
        this.name = "FORBIDDEN";
    }
}
Forbidden.STATUS = 403;
exports.Forbidden = Forbidden;
//# sourceMappingURL=Forbidden.js.map