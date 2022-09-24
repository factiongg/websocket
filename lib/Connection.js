"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Connection = void 0;
const DecodeFrames_1 = __importDefault(require("./Stream/DecodeFrames"));
class Connection {
    sock;
    /**
     * Build connection instance.
     *
     * @param sock
     */
    constructor(sock) {
        this.sock = sock;
        this.makeDecodePipeline();
    }
    /**
     * Make decode pipeline.
     *
     * @returns
     */
    makeDecodePipeline() {
        this.sock
            .pipe(new DecodeFrames_1.default())
            .on("data", (frame) => console.log("Frame: ", frame));
    }
}
exports.Connection = Connection;
exports.default = Connection;
