"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Text = void 0;
const Frame_1 = __importDefault(require("./Frame"));
const Opcode_1 = __importDefault(require("../Opcode"));
class Text extends Frame_1.default {
    /**
     * Build TXT frame.
     *
     * @param data
     * @param final
     */
    constructor(data, final = false) {
        super({
            data,
            op: Opcode_1.default.TXT,
            final,
        });
    }
}
exports.Text = Text;
exports.default = Text;
