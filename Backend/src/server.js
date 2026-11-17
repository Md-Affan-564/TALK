require("dotenv").config();
const http = require("http");
const { Server } = require("socket.io");
const app = require("./app");
const connectDB = require("./config/database");
const PORT = process.env.PORT || 3000;
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    credentials: true,
  },
});
app.set("io", io);
io.on("connection", (socket) => {
  console.log("a user connected:", socket.id);
  socket.on("join-conversation", (conversationId) => {
    console.log("ROOM JOINED ", socket.id, conversationId);
    socket.join(conversationId);
  });
  socket.on("leave-conversation", (conversationId) => {
    socket.leave(conversationId);
  });
});
async function startServer() {
  await connectDB();
  server.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
  });
}
startServer();
