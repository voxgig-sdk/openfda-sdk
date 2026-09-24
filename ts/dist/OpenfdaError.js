"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OpenfdaError = void 0;
class OpenfdaError extends Error {
    isOpenfdaError = true;
    sdk = 'Openfda';
    code;
    ctx;
    status = -1;
    // `err.notFound` rather than a magic number at every call site.
    get notFound() { return 404 === this.status; }
    constructor(code, msg, ctx) {
        super(msg);
        this.code = code;
        this.ctx = ctx;
    }
}
exports.OpenfdaError = OpenfdaError;
//# sourceMappingURL=OpenfdaError.js.map