"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Frame = void 0;
// Make frame immutable.
class Frame {
    final;
    rsv1;
    rsv2;
    rsv3;
    masked;
    op;
    mask;
    data;
    constructor({ final = true, rsv1 = false, rsv2 = false, rsv3 = false, masked = false, op, mask, data, }) {
        this.final = final;
        this.rsv1 = rsv1;
        this.rsv2 = rsv2;
        this.rsv3 = rsv3;
        this.masked = masked;
        this.op = op;
        this.mask = mask ?? null;
        this.data = data ?? null;
    }
    /**
     * Frame is final.
     */
    isFinal() {
        return this.final;
    }
    /**
     * Frame is masked.
     */
    isMasked() {
        return this.masked;
    }
    /**
     * Get frame opcode.
     */
    getOp() {
        return this.op;
    }
    /**
     * Get frame mask.
     */
    getMask() {
        return this.mask;
    }
    /**
     * Get frame data.
     */
    getData() {
        return this.data;
    }
}
exports.Frame = Frame;
exports.default = Frame;
