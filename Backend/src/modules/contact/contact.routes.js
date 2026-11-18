const express = require("express");
const router = express.Router();
const protectRoute = require("../../middleware/auth.middleware");
const {
  addContactController,
  getContactsController,
  removeContactController,
} = require("./contact.controller");

router.post("/", protectRoute, addContactController);
router.get("/", protectRoute, getContactsController);
router.delete("/:contactId", protectRoute, removeContactController);
module.exports = router;
