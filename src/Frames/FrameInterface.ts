import Opcode from "../Opcode";

export interface FrameInterface {
    /**
     * Frame is final.
     */
    isFinal(): boolean;

    /**
     * Frame is masked.
     */
    isMasked(): boolean;

    /**
     * Get frame opcode.
     */
    getOp(): Opcode;

    /**
     * Get frame mask.
     */
    getMask(): Uint8Array | null;

    /**
     * Get frame data.
     */
    getData(): Uint8Array | null;
}

export default FrameInterface;
