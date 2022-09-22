import Frame from "./Frame";
import Opcode from "../Opcode";

export class Text extends Frame {
    /**
     * Build TXT frame.
     *
     * @param data
     * @param final
     */
    constructor(data: Uint8Array, final: boolean = false) {
        super({
            data,
            op: Opcode.TXT,
            final,
        });
    }
}

export default Text;
