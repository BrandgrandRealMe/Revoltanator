"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Int = exports.growBufferSize = exports.enumerate = void 0;
function enumerate(arr) {
    return arr.map((v, i) => [i, v]);
}
exports.enumerate = enumerate;
function growBufferSize(buf, size) {
    const glow = Buffer.alloc(size);
    buf.copy(glow);
    return glow;
}
exports.growBufferSize = growBufferSize;
function Int(v) {
    return parseInt(v.toString(), 10);
}
exports.Int = Int;
//# sourceMappingURL=helper.js.map