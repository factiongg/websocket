import { Duplex } from "stream";
import { IncomingMessage } from "http";

import { createHash } from "crypto";

import HostInterface from "./HostInterface";
import Connection from "./Connection";
import ConnectionInterface from "./ConnectionInterface";

export class Host implements HostInterface {
    /**
     * List of connections.
     *
     * @var ConnectionInterface[]
     */
    protected connections: ConnectionInterface[] = [];

    /**
     * Upgrade a HTTP request.
     *
     * @param req
     * @param sock
     */
    upgrade(req: IncomingMessage, sock: Duplex) {
        if (
            req.headers["sec-websocket-version"] != "7" &&
            req.headers["sec-websocket-version"] != "13"
        ) {
            sock.write(
                ["HTTP/1.1 422 Unprocessable Entity"]
                    .join("\r\n")
                    .concat("\r\n\r\n")
            );

            return;
        }

        if (req.headers["upgrade"] != "websocket") {
            sock.write(
                ["HTTP/1.1 422 Unprocessable Entity"]
                    .join("\r\n")
                    .concat("\r\n\r\n")
            );

            return;
        }

        if (!req.headers["sec-websocket-key"]) {
            sock.write(
                ["HTTP/1.1 422 Unprocessable Entity"]
                    .join("\r\n")
                    .concat("\r\n\r\n")
            );

            return;
        }

        if (!this.authorize(req)) {
            sock.write(
                ["HTTP/1.1 403 Unauthorized"].join("\r\n").concat("\r\n\r\n")
            );
        }

        sock.write(
            [
                "HTTP/1.1 101 Switching Protocols",
                "Upgrade: websocket",
                "Connection: Upgrade",
                "Sec-Websocket-Accept: " +
                    createHash("sha1")
                        .update(
                            req.headers["sec-websocket-key"] +
                                "258EAFA5-E914-47DA-95CA-C5AB0DC85B11"
                        )
                        .digest("base64"),
            ]
                .join("\r\n")
                .concat("\r\n\r\n")
        );

        this.addConnection(this.makeConnection(req, sock));
    }

    /**
     * Authorize a connection
     *
     * @param req
     * @returns
     */
    authorize(req: IncomingMessage): boolean {
        return true;
    }

    /**
     * Host has connection.
     *
     * @param connection
     * @returns
     */
    hasConnection(connection: ConnectionInterface): boolean {
        return this.connections.findIndex((conn) => conn == connection) !== -1;
    }

    /**
     * Add a connection.
     *
     * @param connection
     */
    addConnection(connection: ConnectionInterface): void {
        if (this.hasConnection(connection)) return;

        this.connections.push(connection);
    }

    /**
     * Delete a connection.
     *
     * @param connection
     */
    delConnection(connection: ConnectionInterface): void {
        if (!this.hasConnection(connection)) return;

        this.connections.splice(
            this.connections.findIndex((conn) => conn == connection),
            1
        );
    }

    /**
     * Make a connection instance.
     *
     * @param req
     */
    makeConnection(req: IncomingMessage, sock: Duplex): ConnectionInterface {
        return new Connection(sock);
    }
}

export default Host;
