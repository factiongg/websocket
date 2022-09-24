import FrameInterface from "./Frames/FrameInterface";
export declare class Message {
    /**
     *
     */
    protected frames: FrameInterface[] | null;
    constructor(data: Uint8Array | string);
    /**
     * Get message fragments.
     *
     * @returns
     */
    getFrames(): FrameInterface[];
    static make(data: Uint8Array | string): void;
}
export default Message;
