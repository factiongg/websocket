/// <reference types="@types/node" />
import { Duplex } from "stream";
import { IncomingMessage } from "http";
import HostInterface from "./HostInterface";
import ConnectionInterface from "./ConnectionInterface";
export declare class Host implements HostInterface {
    /**
     * List of connections.
     *
     * @var ConnectionInterface[]
     */
    protected connections: ConnectionInterface[];
    /**
     * Upgrade a HTTP request.
     *
     * @param req
     * @param sock
     */
    upgrade(req: IncomingMessage, sock: Duplex): void;
    /**
     * Authorize a connection
     *
     * @param req
     * @returns
     */
    authorize(req: IncomingMessage): boolean;
    /**
     * Host has connection.
     *
     * @param connection
     * @returns
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
     */
    makeConnection(req: IncomingMessage, sock: Duplex): ConnectionInterface;
}
export default Host;
