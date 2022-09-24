import Opcode from "../Opcode";
import FrameInterface from "./FrameInterface";
export declare type FrameParameters = {
    final?: boolean;
    rsv1?: boolean;
    rsv2?: boolean;
    rsv3?: boolean;
    masked?: boolean;
    op: Opcode;
    length?: number;
    mask?: Uint8Array;
    data?: Uint8Array;
};
export declare class Frame implements FrameInterface {
    protected final: boolean;
    readonly rsv1: boolean;
    readonly rsv2: boolean;
    readonly rsv3: boolean;
    protected masked: boolean;
    protected op: Opcode;
    protected mask: Uint8Array | null;
    protected data: Uint8Array | null;
    constructor({ final, rsv1, rsv2, rsv3, masked, op, mask, data, }: FrameParameters);
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
export default Frame;
