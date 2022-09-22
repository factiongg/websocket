export enum Opcode {
    CONTINUE = 0x0,
    TXT = 0x1,
    BIN = 0x2,
    CLOSE = 0x8,
    PING = 0x9,
    PONG = 0xa,
}

export default Opcode;
