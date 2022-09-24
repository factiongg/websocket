import Opcode from "../Opcode";
import FrameInterface from "./FrameInterface";

export type FrameParameters = {
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

// Make frame immutable.

export class Frame implements FrameInterface {
    protected final: boolean;

    readonly rsv1: boolean;

    readonly rsv2: boolean;

    readonly rsv3: boolean;

    protected masked: boolean;

    protected op: Opcode;

    protected mask: Uint8Array | null;

    protected data: Uint8Array | null;

    constructor({
        final = true,
        rsv1 = false,
        rsv2 = false,
        rsv3 = false,
        masked = false,
        op,
        mask,
        data,
    }: FrameParameters) {
        this.final = final;
        this.rsv1 = rsv1;
        this.rsv2 = rsv2;
        this.rsv3 = rsv3;
        this.masked = masked;
        this.op = op;
        this.mask = mask ?? null;
        this.data = data ?? null;
    }

    /**
     * Frame is final.
     */
    isFinal(): boolean {
        return this.final;
    }

    /**
     * Frame is masked.
     */
    isMasked(): boolean {
        return this.masked;
    }

    /**
     * Get frame opcode.
     */
    getOp(): Opcode {
        return this.op;
    }

    /**
     * Get frame mask.
     */
    getMask(): Uint8Array | null {
        return this.mask;
    }

    /**
     * Get frame data.
     */
    getData(): Uint8Array | null {
        return this.data;
    }
}

export default Frame;
