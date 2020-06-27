"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Exceptions_1 = require("../Exceptions");
class Unauthorized extends Exceptions_1.Exception {
    constructor(message, origin) {
        super(Unauthorized.STATUS, message, origin);
        this.name = "UNAUTHORIZED";
    }
}
Unauthorized.STATUS = 401;
exports.Unauthorized = Unauthorized;
//# sourceMappingURL=Unauthorized.js.map