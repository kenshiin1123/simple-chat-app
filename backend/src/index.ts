import express from "express";
import cors from "cors";
import "dotenv/config";
import { createServer } from "http";
import { Server } from "socket.io";
import type { ChatType, UserType } from "./types.js";

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

const PORT = process.env.PORT || 3000;
let users: UserType[] = [];
let chats: ChatType[] = [];

app.use(cors());
app.use(express.json());

app.get("/chats", (req, res) => {
  res.json({
    success: true,
    message: "Successfully retrieved chats",
    data: chats,
  });
});

app.get("/users/:userId", (req, res) => {
  const userId = req.params.userId;
  const user: UserType | undefined = users.find((usr) => usr.userId === userId);

  if (!user || user === undefined) {
    return res.json({
      success: false,
      message: "Failed retrieved user",
      data: {},
    });
  }

  res.json({
    success: true,
    message: "Successfully retrieved user",
    data: user,
  });
});

io.on("connection", (socket) => {
  console.log(`A user has connected: ${socket.id}`);

  socket.on("new_user", (newUser: UserType) => {
    users.push(newUser);
    socket.broadcast.emit("new_user", newUser);
  });

  socket.on("new_chat", (newChat: ChatType) => {
    chats.push(newChat);
    socket.broadcast.emit("receive_chat", newChat);
  });
});

server.listen(PORT, () => {
  console.log("Listening on port", PORT);
});
