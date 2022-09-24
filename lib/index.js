"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Host_1 = __importDefault(require("./Host"));
const http_1 = require("http");
const http = (0, http_1.createServer)((req, res) => res.end("Hello World"));
const host = new Host_1.default();
http.on("upgrade", host.upgrade.bind(host));
http.listen(8080, () => {
    console.log("Listening for connections on ws://localhost:8080");
});
