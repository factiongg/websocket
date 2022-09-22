import Frame from "./Frame";
import Opcode from "../Opcode";

export class Pong extends Frame {
    /**
     * Build PONG frame.
     *
     * @param data
     */
    constructor(data: Uint8Array) {
        super({
            final: true,
            op: Opcode.PONG,
            data,
        });
    }
}

export default Pong;
