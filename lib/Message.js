"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Message = void 0;
class Message {
    /**
     *
     */
    frames = null;
    constructor(data) {
        // ...
    }
    /**
     * Get message fragments.
     *
     * @returns
     */
    getFrames() {
        if (!this.frames) {
            this.frames = [];
        }
        return this.frames;
    }
    static make(data) { }
}
exports.Message = Message;
exports.default = Message;
