import Frame from "./Frame";
import Opcode from "../Opcode";

export class Continue extends Frame {
    /**
     * Build CONTINUE frame
     *
     * @param data
     * @param final
     */
    constructor(data: Uint8Array, final: boolean = false) {
        super({
            final,
            op: Opcode.CONTINUE,
            data,
        });
    }
}

export default Continue;
