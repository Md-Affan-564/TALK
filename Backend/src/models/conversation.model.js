const mongoose = require("mongoose");

const conversationSchema = mongoose.Schema(
  {
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "userModel",
      },
    ],
    deletedBy: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "userModel",
        },
      ],
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("conversationModel", conversationSchema);
