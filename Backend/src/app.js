const express = require("express");
const authRoutes = require("./modules/auth/auth.routes");
const contactRoutes = require("./modules/contact/contact.routes");
const messageRoutes = require("./modules/message/message.routes");
const conversationRoutes = require("./modules/conversation/conversation.routes");
const cookieparser = require("cookie-parser");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173", "https://talk-x-guftguu.vercel.app"],
    credentials: true,
  })
);
app.use(cookieparser());
app.use(express.urlencoded({ extended: true }));
app.use("/api/auth", authRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/message", messageRoutes);
app.use("/api/conversation", conversationRoutes);
module.exports = app;
