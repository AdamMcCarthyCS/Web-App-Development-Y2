import Hapi from "@hapi/hapi";
import path from "path";

import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function init() {
     const server = Hapi.server({
          port: 3000,
          host: "localhost",
     });

     server.route({
        method: "GET",
        path: "/",
        handler: function (request, h) {
            return "Hello World!";
        }
     })

     server.route({
        method: "GET",
        path: "/test",
        handler: function (request, h) {
            return "Testing a different route...";
        }
     });

     await server.start();
     console.log("Server running on %s", server.info.uri);
}

process.on("unhandledRejection", (err) => {
     console.log(err);
     process.exit(1);
});

init();
