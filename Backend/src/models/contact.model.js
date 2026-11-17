const mongoose = require("mongoose");

const contactSchema = mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "userModel",
    required: true,
  },
  receiver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "userModel",
    required: true,
  },
});
contactSchema.index({ owner: 1, receiver: 1 }, { unique: true });
module.exports = mongoose.model("contactModel", contactSchema);
