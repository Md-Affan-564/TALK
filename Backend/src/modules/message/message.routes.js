const express = require("express");
const protectRoute = require("../../middleware/auth.middleware");
const {
  getMessageController,
  sendMessageController,
  fetchMessageController,
} = require("./message.controller");
const router = express.Router();

router.get("/", protectRoute, fetchMessageController);
router.get("/now/:conversationId", protectRoute, getMessageController);
router.post("/", protectRoute, sendMessageController);

module.exports = router;
