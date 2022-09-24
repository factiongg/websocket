"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Opcode = void 0;
var Opcode;
(function (Opcode) {
    Opcode[Opcode["CONTINUE"] = 0] = "CONTINUE";
    Opcode[Opcode["TXT"] = 1] = "TXT";
    Opcode[Opcode["BIN"] = 2] = "BIN";
    Opcode[Opcode["CLOSE"] = 8] = "CLOSE";
    Opcode[Opcode["PING"] = 9] = "PING";
    Opcode[Opcode["PONG"] = 10] = "PONG";
})(Opcode = exports.Opcode || (exports.Opcode = {}));
exports.default = Opcode;
