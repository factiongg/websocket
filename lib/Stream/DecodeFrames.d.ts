/// <reference types="@types/node" />
import { Transform } from "stream";
import { FrameParameters } from "../Frames/Frame";
export declare enum Action {
    getHead = "getHead",
    getPayloadLength16 = "getPayloadLength16",
    getPayloadLength64 = "getPayloadLength64",
    getMask = "getMask",
    getData = "getData",
    finish = "finish"
}
export declare class DecodeFrames extends Transform {
    /**
     * The decoder is processing.
     */
    protected processing: boolean;
    /**
     * The state of the decoder.
     */
    protected action: Action;
    /**
     * List of buffered chunks.
     */
    protected chunks: Buffer[];
    /**
     * Frame parameters.
     */
    protected params: FrameParameters;
    /**
     * Build frame decoder.
     */
    constructor();
    /**
     * Get bytes from buffered chunks.
     *
     * @param len
     * @returns
     */
    get(len: number): Buffer | false;
    /**
     * Length of the buffered chunks.
     *
     * @returns
     */
    length(): number;
    /**
     * Transform incoming frame.
     *
     * @param chunk
     * @param encoding
     * @param cb
     */
    _transform(chunk: Buffer, encoding: string, cb: Function): void;
    /**
     * Get head
     */
    getHead(): Action;
    /**
     * Get payload length (16-bit)
     */
    getPayloadLength16(): Action;
    /**
     * Get payload length (64-bit)
     */
    getPayloadLength64(): Action;
    /**
     * Get mask
     */
    getMask(): Action;
    /**
     * Get data
     */
    getData(): Action;
    /**
     * Build & export frame.
     */
    finish(): Action;
}
export default DecodeFrames;
