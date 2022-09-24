"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Continue = void 0;
const Frame_1 = __importDefault(require("./Frame"));
const Opcode_1 = __importDefault(require("../Opcode"));
class Continue extends Frame_1.default {
    /**
     * Build CONTINUE frame
     *
     * @param data
     * @param final
     */
    constructor(data, final = false) {
        super({
            final,
            op: Opcode_1.default.CONTINUE,
            data,
        });
    }
}
exports.Continue = Continue;
exports.default = Continue;
