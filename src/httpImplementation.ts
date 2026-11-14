import WebSocket, { WebSocketServer } from "ws";
import http from "node:http";

const server = http.createServer((req: any, res: any) => {
  console.log(new Date() + " Received request for " + req.url);
  res.end("Response ends here");
});

const wws = new WebSocketServer({ server });

wws.on("connection", (ws) => {
  ws.on("error", console.error);
  ws.on("message", function message(data, isBinary) {
    wws.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(data, { binary: isBinary });
      }
    });
  });

  ws.send("Hello! Message From Server!!");
});

server.listen(8080, function () {
  console.log(new Date() + " Server is listening on port 8080");
});
