import Frame from "./Frame";
import Opcode from "../Opcode";

export class Binary extends Frame {
    /**
     * Build BIN frame.
     *
     * @param data
     * @param final
     */
    constructor(data: Uint8Array, final: boolean = true) {
        super({
            final,
            op: Opcode.BIN,
            data,
        });
    }
}

export default Binary;
