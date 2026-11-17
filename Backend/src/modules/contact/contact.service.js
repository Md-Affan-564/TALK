const userModel = require("../../models/user.model");
const contactModel = require("../../models/contact.model");

const addContact = async (userId, email) => {
  try {
    const receiver = await userModel.findOne({ email });
    if (!receiver) {
      return {
        success: false,
        message: "user not found",
        statusCode: 404,
      };
    }
    if (userId === receiver._id.toString()) {
      return {
        success: false,
        message: "cannot add yourself",
        statusCode: 400,
      };
    }
    const duplicateCheck = await contactModel.find({
      $or: [
        { owner: userId, receiver: receiver._id },
        { owner: receiver._id, receiver: userId },
      ],
    });
    if (duplicateCheck.length > 0) {
      return {
        success: false,
        message: "duplicate contact found/contact already exists",
        statusCode: 409,
      };
    }
    const contact = await contactModel.create({
      owner: userId,
      receiver: receiver._id,
    });
    return {
      success: true,
      data: contact,
      statusCode: 201,
    };
  } catch (error) {
    console.log(error.messaeg);
    return {
      success: false,
      message: "internal server error",
      statusCode: 500,
    };
  }
};

const getContacts = async (userId) => {
  try {
    const contacts = await contactModel
      .find({
        $or: [{ owner: userId }, { receiver: userId }],
      })
      .populate("owner", "username email ")
      .populate("receiver", "username email");
    return {
      statusCode: 200,
      success: true,
      data: contacts,
    };
  } catch (error) {
    return {
      statusCode: 500,
      success: false,
      message: "internal server error",
    };
  }
};

module.exports = { addContact, getContacts };
