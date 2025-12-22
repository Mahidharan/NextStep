import { WebSocketServer } from "ws";
import session from "express-session";
import MongoStore from "connect-mongo";
import { sessionMiddleware } from "./Session.js";

const sessionParser = session({
  secret: "NEXTSTEP_SECRET",
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.MONGO_URL,
  }),
});

function initWebSocket(server) {
  const wss = new WebSocketServer({ noServer: true });

  server.on("upgrade", (req, socket, head) => {
    sessionMiddleware(req, {}, () => {
      if (!req.session?.passport?.user) {
        socket.destroy();
        return;
      }

      wss.handleUpgrade(req, socket, head, (ws) => {
        ws.userId = req.session.passport.user;
        wss.emit("connection", ws, req);
      });
    });
  });

  wss.on("connection", (ws) => {
    console.log("✅Websocket connected", ws.userId);

    ws.on("message", (data) => {
      const message = JSON.parse(data);
      console.log("Message", message);

      wss.clients.forEach((client) => {
        if (client.readyState === ws.OPEN) {
          client.send(JSON.stringify(message));
        }
      });
    });
    ws.on("close", () => {
      console.log("WebSocket disconnected", ws.userId);
    });
  });
}

export { initWebSocket };
