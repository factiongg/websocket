import { Duplex, pipeline } from "stream";
import ConnectionInterface from "./ConnectionInterface";
import DecodeFrames from "./Stream/DecodeFrames";

import Frame from "./Frames/Frame";

export class Connection implements ConnectionInterface {
    /**
     * Build connection instance.
     *
     * @param sock
     */
    constructor(protected sock: Duplex) {
        this.makeDecodePipeline();
    }

    /**
     * Make decode pipeline.
     *
     * @returns
     */
    makeDecodePipeline() {
        this.sock
            .pipe(new DecodeFrames())
            .on("data", (frame: Frame) => console.log("Frame: ", frame));
    }
}

export default Connection;
