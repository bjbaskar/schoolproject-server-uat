"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Exceptions_1 = require("../Exceptions");
class ServiceUnavailable extends Exceptions_1.Exception {
    constructor(message, origin) {
        super(ServiceUnavailable.STATUS, message, origin);
        this.name = "SERVICE_UNVAILABLE";
    }
}
ServiceUnavailable.STATUS = 503;
exports.ServiceUnavailable = ServiceUnavailable;
//# sourceMappingURL=ServiceUnavailable.js.map