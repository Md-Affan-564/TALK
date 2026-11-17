const conversationModel = require("../../models/conversation.model");

async function getConversation(senderId, receiverId) {
  try {
    const conversation = await conversationModel.findOne({
      $and: [
        { participants: senderId },
        { participants: receiverId },
        { deletedBy: { $ne: senderId } },
      ],
    });
    if (!conversation) {
      return {
        success: false,
        statusCode: 404,
        message: "conversation not found",
      };
    }
    return {
      success: true,
      statusCode: 200,
      data: conversation,
    };
  } catch (err) {
    console.log(err.message);
    return {
      success: false,
      statusCode: 500,
      message: "internal server error",
    };
  }
}

async function createConversation(senderId, receiverId) {
  try {
    const conversation = await conversationModel.create({
      participants: [senderId, receiverId],
    });
    return {
      success: true,
      statusCode: 201,
      data: conversation,
    };
  } catch (err) {
    console.log(err.message);
    return {
      success: false,
      statusCode: 500,
      message: "internal server error",
    };
  }
}

async function getOrCreateConversation(senderId, receiverId) {
  try {
    const result = await getConversation(senderId, receiverId);
    if (result.statusCode === 404) {
      const response = await createConversation(senderId, receiverId);
      return response;
    }
    return result;
  } catch (err) {
    console.log(err.message);
    return {
      success: false,
      statusCode: 500,
      message: "internal server error",
    };
  }
}
async function isParticipant(conversationId, userId) {
  const conversation = await conversationModel.findOne({
    _id: conversationId,
    participants: userId,
  });

  return conversation;
}

module.exports = {
  isParticipant,
  getConversation,
  createConversation,
  getOrCreateConversation,
};
