import { TextEncoder } from "util";

import Frame from "./Frame";
import Opcode from "../Opcode";

export class Ping extends Frame {
    /**
     * Build PING frame.
     *
     * @param data
     */
    constructor(data: Uint8Array) {
        super({
            final: true,
            op: Opcode.PING,
            data,
        });
    }
}

export default Ping;
