const express = require("express");
const protectRoute = require("../../middleware/auth.middleware");
const {
  getOrCreateConversationController,
} = require("./conversation.controller");
const router = express.Router();

router.get("/", protectRoute, getOrCreateConversationController);

module.exports = router;
