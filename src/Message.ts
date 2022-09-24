import Frame from "./Frames/Frame";
import FrameInterface from "./Frames/FrameInterface";

export class Message {
    /**
     *
     */
    protected frames: FrameInterface[] | null = null;

    constructor(data: Uint8Array | string) {
        // ...
    }

    /**
     * Get message fragments.
     *
     * @returns
     */
    getFrames(): FrameInterface[] {
        if (!this.frames) {
            this.frames = [];
        }

        return this.frames;
    }

    static make(data: Uint8Array | string) {}
}

export default Message;
