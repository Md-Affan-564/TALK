const express = require("express");
const router = express.Router();
const protectRoute = require("../../middleware/auth.middleware");
const {
  addContactController,
  getContactsController,
} = require("./contact.controller");

router.post("/", protectRoute, addContactController);
router.get("/", protectRoute, getContactsController);

module.exports = router;
