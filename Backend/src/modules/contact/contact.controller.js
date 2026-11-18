const { addContact, getContacts, removeContact } = require("./contact.service");

const addContactController = async (req, res) => {
  try {
    const email = req.body.email;
    if (!email) {
      return res.status(400).json({
        success: false,
        message: "email cannot be empty",
        statusCode: 400,
      });
    }
    const _id = req.user._id;
    const result = await addContact(_id, email);
    return res.status(result.statusCode).json(result);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: "internal server error",
      statusCode: 500,
    });
  }
};
const removeContactController = async (req, res) => {
  try {
    const { contactId } = req.params;

    if (!contactId) {
      return res.status(400).json({
        success: false,
        statusCode: 400,
        message: "contact ID is required",
      });
    }

    const result = await removeContact(req.user._id, contactId);

    return res.status(result.statusCode).json(result);
  } catch (error) {
    console.log("removeContactController:", error.message);

    return res.status(500).json({
      success: false,
      statusCode: 500,
      message: "internal server error",
    });
  }
};
const getContactsController = async (req, res) => {
  try {
    const _id = req.user._id;
    const result = await getContacts(_id);
    if (!result.success) {
      return res.status(result.statusCode).json(result);
    }
    const finalResult = result.data.map((contact) => {
      const user =
        _id.toString() === contact.owner._id.toString()
          ? contact.receiver
          : contact.owner;

      return {
        contactId: contact._id,
        ...user.toObject(),
      };
    });
    return res.status(result.statusCode).json({
      statusCode: result.statusCode,
      success: result.success,
      data: finalResult,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: "internal server error",
      statusCode: 500,
    });
  }
};

module.exports = {
  addContactController,
  getContactsController,
  removeContactController,
};
