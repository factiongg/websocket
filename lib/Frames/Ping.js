"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ping = void 0;
const Frame_1 = __importDefault(require("./Frame"));
const Opcode_1 = __importDefault(require("../Opcode"));
class Ping extends Frame_1.default {
    /**
     * Build PING frame.
     *
     * @param data
     */
    constructor(data) {
        super({
            final: true,
            op: Opcode_1.default.PING,
            data,
        });
    }
}
exports.Ping = Ping;
exports.default = Ping;
