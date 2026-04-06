const Contact = require("../model/Contact");

const AddContact = async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    // Basic validation
    if (!name || !email || !message) {
      return res.json({
        message: "Name, email and message are required.",
        status: false,
      });
    }

    const contact = await Contact.create({ name, email, phone, message });

    return res.json({
      message: "Message sent successfully!",
      Contact: contact,
      status: true,
    });
  } catch (err) {
    console.log("AddContact error:", err);
    return res.json({
      message: "Error while creating contact",
      status: false,
    });
  }
};

const GetContact = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 }); // newest first

    return res.json({
      message: "Contacts fetched",
      Contacts: contacts,
      status: true,
    });
  } catch (err) {
    console.log("GetContact error:", err);
    return res.json({
      message: "Error while fetching contacts",
      status: false,
    });
  }
};

const UpdateContact = async (req, res) => {
  try {
    const updated = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true });
    return res.json({
      message: "Contact updated",
      status: true,
      UpdateContact: updated,
    });
  } catch (err) {
    console.log("UpdateContact error:", err);
    return res.json({
      message: "Error while updating contact",
      status: false,
    });
  }
};

const DeleteContact = async (req, res) => {
  try {
    await Contact.findByIdAndDelete(req.params.id);
    return res.json({
      message: "Contact deleted",
      status: true,
    });
  } catch (err) {
    console.log("DeleteContact error:", err);
    return res.json({
      message: "Error while deleting contact",
      status: false,
    });
  }
};

module.exports = { AddContact, GetContact, UpdateContact, DeleteContact };