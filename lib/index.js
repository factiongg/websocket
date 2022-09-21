"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Host_1 = __importDefault(require("./Host"));
const host = new Host_1.default();
const http_1 = require("http");
const http = (0, http_1.createServer)();
http.on("upgrade", (req, sock) => {
    host.upgrade(req, sock);
});
http.listen(8080);
