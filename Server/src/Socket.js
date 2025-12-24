import { WebSocketServer } from "ws";
import { sessionMiddleware } from "./Session.js";

const onlineUsers = new Map();

const broadcastOnlineUsers = (wss) => {
  const onlineUserIds = Array.from(onlineUsers.keys());

  wss.clients.forEach((client) => {
    if (client.readyState === client.OPEN) {
      client.send(
        JSON.stringify({
          type: "ONLINE_USERS",
          users: onlineUserIds,
        }),
      );
    }
  });
};

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
    console.log("✅ WebSocket connected:", ws.userId);
    onlineUsers.set(ws.userId.toString(), ws);
    broadcastOnlineUsers(wss);

    ws.on("message", async (data) => {
      const parsed = JSON.parse(data);
      if (parsed.type !== "MESSAGE") return;

      const message = parsed.data;
      const receiverSocket = onlineUsers.get(message.receiver.toString());

      if (receiverSocket && receiverSocket.readyState === ws.OPEN) {
        receiverSocket.send(JSON.stringify(message));
      }
    });

    ws.on("close", () => {
      onlineUsers.delete(ws.userId.toString());
      broadcastOnlineUsers(wss);
      console.log("❌ WebSocket disconnected:", ws.userId);
    });
  });
}

export { initWebSocket };
