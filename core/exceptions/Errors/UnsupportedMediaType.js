"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Exceptions_1 = require("../Exceptions");
class UnsupportedMediaType extends Exceptions_1.Exception {
    constructor(message, origin) {
        super(UnsupportedMediaType.STATUS, message, origin);
        this.name = "UNSUPPORTED_MEDIA_TYPE";
    }
}
UnsupportedMediaType.STATUS = 415;
exports.UnsupportedMediaType = UnsupportedMediaType;
//# sourceMappingURL=UnsupportedMediaType.js.map