/// <reference types="@types/node" />
import { Duplex } from "stream";
import ConnectionInterface from "./ConnectionInterface";
export declare class Connection implements ConnectionInterface {
    protected sock: Duplex;
    /**
     * Build connection instance.
     *
     * @param sock
     */
    constructor(sock: Duplex);
    /**
     * Make decode pipeline.
     *
     * @returns
     */
    makeDecodePipeline(): void;
}
export default Connection;
