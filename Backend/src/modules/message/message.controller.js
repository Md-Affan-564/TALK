const { getMessages, sendMessage, fetchMessage } = require("./message.service");
const { isParticipant } = require("../conversation/conversation.service");

const sendMessageController = async (req, res) => {
  try {
    const senderId = req.user._id;
    const { text, receiverId } = req.body;
    const result = await sendMessage(senderId, receiverId, text);
    if (result.success) {
      const io = req.app.get("io");
      io.to(String(result.data.conversation)).emit("new-message", result.data);
    }
    return res.status(result.statusCode).json(result);
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({
      success: false,
      statusCode: 500,
      message: "internal server error",
    });
  }
};
const fetchMessageController = async (req, res) => {
  try {
    const senderId = req.user._id;
    const receiverId = req.query.receiverId;

    const result = await fetchMessage(senderId, receiverId);

    return res.status(result.statusCode).json(result);
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({
      success: false,
      statusCode: 500,
      message: "internal server error",
    });
  }
};

const getMessageController = async (req, res) => {
  try {
    const conversationId = req.params.conversationId;
    if (!(await isParticipant(conversationId, req.user._id))) {
      return res.status(403).json({
        success: false,
        statusCode: 403,
        message: "Conversation not found or access denied",
      });
    }
    const result = await getMessages(conversationId);

    return res.status(result.statusCode).json(result);
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({
      success: false,
      statusCode: 500,
      message: "internal server error",
    });
  }
};

module.exports = {
  fetchMessageController,
  sendMessageController,
  getMessageController,
};
