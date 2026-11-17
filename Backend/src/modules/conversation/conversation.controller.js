const { getOrCreateConversation } = require("./conversation.service");

const getOrCreateConversationController = async (req, res) => {
  try {
    const conversation = await getOrCreateConversation(
      req.user._id,
      req.params.receiverId
    );

    return res.status(conversation.statusCode).json(conversation);
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({
      success: false,
      statusCode: 500,
      message: "internal server error",
    });
  }
};

module.exports = { getOrCreateConversationController };
