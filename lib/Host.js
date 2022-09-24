"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Host = void 0;
const crypto_1 = require("crypto");
const Connection_1 = __importDefault(require("./Connection"));
class Host {
    /**
     * List of connections.
     *
     * @var ConnectionInterface[]
     */
    connections = [];
    /**
     * Upgrade a HTTP request.
     *
     * @param req
     * @param sock
     */
    upgrade(req, sock) {
        if (req.headers["sec-websocket-version"] != "7" &&
            req.headers["sec-websocket-version"] != "13") {
            sock.write(["HTTP/1.1 422 Unprocessable Entity"]
                .join("\r\n")
                .concat("\r\n\r\n"));
            return;
        }
        if (req.headers["upgrade"] != "websocket") {
            sock.write(["HTTP/1.1 422 Unprocessable Entity"]
                .join("\r\n")
                .concat("\r\n\r\n"));
            return;
        }
        if (!req.headers["sec-websocket-key"]) {
            sock.write(["HTTP/1.1 422 Unprocessable Entity"]
                .join("\r\n")
                .concat("\r\n\r\n"));
            return;
        }
        if (!this.authorize(req)) {
            sock.write(["HTTP/1.1 401 Unauthorized"].join("\r\n").concat("\r\n\r\n"));
        }
        sock.write([
            "HTTP/1.1 101 Switching Protocols",
            "Upgrade: websocket",
            "Connection: Upgrade",
            "Sec-Websocket-Accept: " +
                (0, crypto_1.createHash)("sha1")
                    .update(req.headers["sec-websocket-key"] +
                    "258EAFA5-E914-47DA-95CA-C5AB0DC85B11")
                    .digest("base64"),
        ]
            .join("\r\n")
            .concat("\r\n\r\n"));
        this.addConnection(this.makeConnection(req, sock));
    }
    /**
     * Authorize a connection
     *
     * @param req
     * @returns
     */
    authorize(req) {
        return true;
    }
    /**
     * Host has connection.
     *
     * @param connection
     * @returns
     */
    hasConnection(connection) {
        return this.connections.findIndex((conn) => conn == connection) !== -1;
    }
    /**
     * Add a connection.
     *
     * @param connection
     */
    addConnection(connection) {
        if (this.hasConnection(connection))
            return;
        this.connections.push(connection);
    }
    /**
     * Delete a connection.
     *
     * @param connection
     */
    delConnection(connection) {
        if (!this.hasConnection(connection))
            return;
        this.connections.splice(this.connections.findIndex((conn) => conn == connection), 1);
    }
    /**
     * Make a connection instance.
     *
     * @param req
     */
    makeConnection(req, sock) {
        return new Connection_1.default(sock);
    }
}
exports.Host = Host;
exports.default = Host;
