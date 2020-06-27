"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Exception extends Error {
    constructor(status = 500, message = "", origin) {
        super(message);
        this.name = "HTTP_EXCEPTION";
        this.type = "HTTP_EXCEPTION";
        this.status = status;
        this.message = message;
        this.setOrigin(origin);
    }
    setOrigin(origin) {
        if (origin) {
            if (origin instanceof Error) {
                this.origin = origin;
                this.message = `${this.message}, innerException: ${this.origin.message}`.trim();
            }
            else if (typeof origin === "string") {
                this.origin = new Error(origin);
                this.message = `${this.message}, innerException: ${this.origin.message}`.trim();
            }
            else {
                this.body = origin;
            }
        }
    }
    toString() {
        return (this.name + "(" + this.status + "): " + this.message + " ").trim();
    }
}
exports.Exception = Exception;
class HTTPException extends Exception {
}
exports.HTTPException = HTTPException;
//# sourceMappingURL=Exceptions.js.map