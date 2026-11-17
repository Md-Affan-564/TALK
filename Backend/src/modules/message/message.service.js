const messageModel = require("../../models/message.model");
const {
  getConversation,
  getOrCreateConversation,
} = require("../conversation/conversation.service");

async function saveMessage(conversation, sender, text) {
  try {
    const message = await messageModel.create({
      conversation,
      sender,
      text,
    });
    return {
      success: true,
      statusCode: 201,
      data: message,
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

async function getMessages(conversation) {
  try {
    const messages = await messageModel
      .find({ conversation })
      .sort({ createdAt: 1 });
    return {
      success: true,
      statusCode: 200,
      data: messages,
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
async function sendMessage(sender, receiver, text) {
  try {
    const conversation = await getOrCreateConversation(sender, receiver);
    if (!conversation.success) {
      return conversation;
    }
    const result = await saveMessage(conversation.data._id, sender, text);
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
async function fetchMessage(sender, receiver) {
  try {
    const conversation = await getConversation(sender, receiver);
    if (!conversation.success) {
      return conversation;
    }
    const result = await getMessages(conversation.data._id);
    return { ...result, conversationId: conversation.data._id };
  } catch (err) {
    console.log(err.message);
    return {
      success: false,
      statusCode: 500,
      message: "internal server error",
    };
  }
}

module.exports = { saveMessage, getMessages, sendMessage, fetchMessage };
