import express, { type Application } from "express";
import { WebSocketServer } from "ws";

const app: Application = express();
const httpServer = app.listen(8080);
app.get("/", (req, res) => {
  res.send("Hello from express server");
});

const wws = new WebSocketServer({ server: httpServer });

wws.on("connection", (ws) => {
  ws.on("error", console.error);
  ws.on("message", (data, isBinary) => {
    wws.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(data, { binary: isBinary });
      }
    });
  });
  ws.send("Hello! From server");
});
