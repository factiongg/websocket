import { Duplex } from "stream";
import { IncomingMessage } from "http";

import ConnectionInterface from "./ConnectionInterface";

export interface HostInterface {
    /**
     * Upgrade a HTTP request.
     *
     * @param req
     * @param sock
     */
    upgrade(req: IncomingMessage, sock: Duplex): void;

    /**
     * Authorize a connection.
     *
     * @param req
     */
    authorize(req: IncomingMessage): boolean;

    /**
     * Host has connection.
     *
     * @param connection
     */
    hasConnection(connection: ConnectionInterface): boolean;

    /**
     * Add a connection.
     *
     * @param connection
     */
    addConnection(connection: ConnectionInterface): void;

    /**
     * Delete a connection.
     *
     * @param connection
     */
    delConnection(connection: ConnectionInterface): void;

    /**
     * Make a connection instance.
     *
     * @param req
     * @param sock
     */
    makeConnection(req: IncomingMessage, sock: Duplex): ConnectionInterface;
}

export default HostInterface;
