import express from "express";
import { createServer } from "node:http";
import { Server } from "socket.io";
import path from "path";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

app.use(express.static(path.resolve(__dirname, "..", "public")));

io.on("connection", (socket) => {
  console.log(`New connection: ${socket.id}`);

  socket.on("message", (message) => {
    socket.broadcast.emit("recived", { message: message });
  });
});

httpServer.listen(3000, () => {
  console.log("server is running!!!");
});
