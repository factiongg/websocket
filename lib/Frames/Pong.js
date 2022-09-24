"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pong = void 0;
const Frame_1 = __importDefault(require("./Frame"));
const Opcode_1 = __importDefault(require("../Opcode"));
class Pong extends Frame_1.default {
    /**
     * Build PONG frame.
     *
     * @param data
     */
    constructor(data) {
        super({
            final: true,
            op: Opcode_1.default.PONG,
            data,
        });
    }
}
exports.Pong = Pong;
exports.default = Pong;
