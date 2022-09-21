"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Host = void 0;
const crypto_1 = require("crypto");
class Host {
    /**
     * List of connections.
     *
     * @var ConnectionInterface[]
     */
    connections = [];
    constructor() { }
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
            sock.write(["HTTP/1.1 403 Unauthorized"].join("\r\n").concat("\r\n\r\n"));
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
        // this.addConnection(this.makeConnection(req, sock));
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
}
exports.Host = Host;
exports.default = Host;
