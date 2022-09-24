import Host from "./Host";
import { createServer } from "http";

const http = createServer((req, res) => res.end("Hello World"));
const host = new Host();

http.on("upgrade", host.upgrade.bind(host));
http.listen(8080, () => {
    console.log("Listening for connections on ws://localhost:8080");
});
