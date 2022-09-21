import Host from "./Host";

const host = new Host();

import { createServer } from "http";

const http = createServer();
http.on("upgrade", (req, sock) => {
    host.upgrade(req, sock);
});
http.listen(8080);
