"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Binary = void 0;
const Frame_1 = __importDefault(require("./Frame"));
const Opcode_1 = __importDefault(require("../Opcode"));
class Binary extends Frame_1.default {
    /**
     * Build BIN frame.
     *
     * @param data
     * @param final
     */
    constructor(data, final = true) {
        super({
            final,
            op: Opcode_1.default.BIN,
            data,
        });
    }
}
exports.Binary = Binary;
exports.default = Binary;
