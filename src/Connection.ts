import { Duplex } from "stream";
import ConnectionInterface from "./ConnectionInterface";

export class Connection implements ConnectionInterface {
    /**
     * Build connection instance.
     *
     * @param sock
     */
    constructor(protected sock: Duplex) {}
}

export default Connection;
