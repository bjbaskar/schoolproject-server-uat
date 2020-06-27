"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Exceptions_1 = require("../Exceptions");
class UpgradeRequired extends Exceptions_1.Exception {
    constructor(message, origin) {
        super(UpgradeRequired.STATUS, message, origin);
        this.name = "UPGRADE_REQUIRED";
    }
}
UpgradeRequired.STATUS = 426;
exports.UpgradeRequired = UpgradeRequired;
//# sourceMappingURL=UpgradeRequired.js.map