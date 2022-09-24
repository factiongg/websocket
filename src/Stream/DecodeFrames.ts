import { Transform } from "stream";

import Opcode from "../Opcode";
import Frame, { FrameParameters } from "../Frames/Frame";

export enum Action {
    getHead = "getHead",
    getPayloadLength16 = "getPayloadLength16",
    getPayloadLength64 = "getPayloadLength64",
    getMask = "getMask",
    getData = "getData",
    finish = "finish",
}

export class DecodeFrames extends Transform {
    /**
     * The decoder is processing.
     */
    protected processing: boolean = false;

    /**
     * The state of the decoder.
     */
    protected action: Action = Action.getHead;

    /**
     * List of buffered chunks.
     */
    protected chunks: Buffer[] = [];

    /**
     * Frame parameters.
     */
    protected params: FrameParameters = { op: Opcode.TXT };

    /**
     * Build frame decoder.
     */
    constructor() {
        super({ readableObjectMode: true }); // We will output an object.
    }

    /**
     * Get bytes from buffered chunks.
     *
     * @param len
     * @returns
     */
    get(len: number): Buffer | false {
        if (len > this.length()) {
            return (this.processing = false);
        }

        const out = Buffer.alloc(len);

        while (len > 0) {
            const chunk = this.chunks.shift();

            if (!chunk) {
                throw new Error(); // Catastropic error, kill pipeline & connection.
            }

            chunk.copy(
                out,
                out.length - len,
                0,
                len >= chunk.length ? chunk.length : len
            );

            if (len < chunk.length) {
                this.chunks.unshift(chunk.slice(len));
            }

            len -= chunk.length;
        }

        return out;
    }

    /**
     * Length of the buffered chunks.
     *
     * @returns
     */
    length() {
        return this.chunks.reduce((len, chunk) => len + chunk.length, 0);
    }

    /**
     * Transform incoming frame.
     *
     * @param chunk
     * @param encoding
     * @param cb
     */
    _transform(chunk: Buffer, encoding: string, cb: Function) {
        this.chunks.push(chunk);

        this.processing = true;

        while (this.processing) {
            this.action = this[this.action]();
        }

        cb();
    }

    /**
     * Get head
     */
    getHead(): Action {
        const buffer = this.get(2);

        if (!buffer) {
            return Action.getHead;
        }

        this.params = {
            final: (buffer[0] & 0x80) != 0,
            rsv1: (buffer[0] & 0x40) != 0,
            rsv2: (buffer[0] & 0x20) != 0,
            rsv3: (buffer[0] & 0x10) != 0,
            masked: (buffer[1] & 0x80) != 0,
            op: buffer[0] & 0xf,
            length: buffer[1] & ~0x80,
        };

        if (this.params.length == 126) {
            return Action.getPayloadLength16;
        }

        if (this.params.length == 127) {
            return Action.getPayloadLength64;
        }

        return this.params.masked ? Action.getMask : Action.getData;
    }

    /**
     * Get payload length (16-bit)
     */
    getPayloadLength16(): Action {
        const buffer = this.get(2);

        if (!buffer) {
            return Action.getPayloadLength16;
        }

        this.params.length = buffer.readUInt16BE();

        return this.params.masked ? Action.getMask : Action.getData;
    }

    /**
     * Get payload length (64-bit)
     */
    getPayloadLength64(): Action {
        const buffer = this.get(8);

        if (!buffer) {
            return Action.getPayloadLength16;
        }

        const length = buffer.readUInt32BE(0);

        if (length > Math.pow(2, 53 - 32) - 1) {
            throw new Error();
        }

        this.params.length = length * Math.pow(2, 32) + buffer.readUInt32BE(4);

        return this.params.masked ? Action.getMask : Action.getData;
    }

    /**
     * Get mask
     */
    getMask(): Action {
        console.log("getMask");
        if (this.params.masked) {
            const buffer = this.get(4);

            if (!buffer) {
                return Action.getMask;
            }

            this.params.mask = buffer;
        }

        return Action.getData;
    }

    /**
     * Get data
     */
    getData(): Action {
        if (this.params.length) {
            const buffer = this.get(this.params.length);

            console.log("Lengths: ", buffer, this.length());

            if (!buffer) {
                console.log("Returning!");
                return Action.getData;
            }

            if (this.params.masked && this.params.mask) {
                for (let i = 0; i < buffer.length; i++) {
                    buffer[i] ^= this.params.mask[i & 3];
                }
            }

            this.params.data = buffer;
        }

        return Action.finish;
    }

    /**
     * Build & export frame.
     */
    finish(): Action {
        this.push(new Frame(this.params));
        this.params = { op: Opcode.TXT };
        return Action.getHead;
    }
}

export default DecodeFrames;
