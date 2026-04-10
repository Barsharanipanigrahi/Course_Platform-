const Contact = require("../model/Contact");
const nodemailer = require("nodemailer");

// Created fresh each request so it always picks up latest env values
const createTransporter = () => nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

const AddContact = async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;
    if (!name || !email || !message) {
      return res.json({ message: "Name, email and message are required.", status: false });
    }
    const contact = await Contact.create({ name, email, phone, message });
    return res.json({ message: "Message sent successfully!", Contact: contact, status: true });
  } catch (err) {
    console.log("AddContact error:", err);
    return res.json({ message: "Error while creating contact", status: false });
  }
};

const GetContact = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    return res.json({ message: "Contacts fetched", Contacts: contacts, status: true });
  } catch (err) {
    console.log("GetContact error:", err);
    return res.json({ message: "Error while fetching contacts", status: false });
  }
};

const UpdateContact = async (req, res) => {
  try {
    const updated = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true });
    return res.json({ message: "Contact updated", status: true, UpdateContact: updated });
  } catch (err) {
    console.log("UpdateContact error:", err);
    return res.json({ message: "Error while updating contact", status: false });
  }
};

const DeleteContact = async (req, res) => {
  try {
    await Contact.findByIdAndDelete(req.params.id);
    return res.json({ message: "Contact deleted", status: true });
  } catch (err) {
    console.log("DeleteContact error:", err);
    return res.json({ message: "Error while deleting contact", status: false });
  }
};

const ReplyContact = async (req, res) => {
  try {
    const { to, subject, message, contactId } = req.body;

    if (!to || !subject || !message) {
      return res.json({ message: "to, subject, and message are required.", status: false });
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: 'your@gmail.com',
        clientId: '123456789-abc.apps.googleusercontent.com',  // ← from Step 3
        clientSecret: 'GOCSPX-xxxxxxxxxxxxxxxx',               // ← from Step 3
        refreshToken: '1//xxxxxxxxxxxxxxxxxxxxxxxx',            // ← from Step 4
      }
    });

    await transporter.sendMail({
      from: `"Learnify Admin" <${process.env.GMAIL_USER}>`,
      to,
      subject,
      text: message,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #f59e0b; border-radius: 12px; overflow: hidden;">
          <div style="background: #f59e0b; padding: 24px 32px;">
            <h2 style="margin: 0; color: #18181b; font-size: 1.2rem; font-weight: 800;">📚 Learnify</h2>
            <p style="margin: 4px 0 0; color: rgba(24,24,27,0.65); font-size: 0.8rem;">Response to your enquiry</p>
          </div>
          <div style="padding: 32px; background: #18181b; color: #fafafa;">
            <p style="margin: 0 0 24px; font-size: 0.95rem; line-height: 1.7; color: #d4d4d8;">
              ${message.replace(/\n/g, "<br/>")}
            </p>
            <p style="margin: 0; font-size: 0.85rem; color: #71717a;">— The Learnify Team</p>
          </div>
          <div style="padding: 16px 32px; background: #27272a; border-top: 1px solid rgba(245,158,11,0.15);">
            <p style="margin: 0; font-size: 0.72rem; color: #52525b;">
              This is a reply to your enquiry submitted on Learnify.
            </p>
          </div>
        </div>
      `,
    });

    if (contactId) {
      await Contact.findByIdAndUpdate(contactId, { replied: true, repliedAt: new Date() });
    }

    console.log("✅ Email sent to:", to);
    return res.json({ message: "Reply sent successfully.", status: true });

  } catch (err) {
    console.log("ReplyContact error:", err.message);
    return res.json({ message: "Failed to send reply email.", status: false });
  }
};

module.exports = { AddContact, GetContact, UpdateContact, DeleteContact, ReplyContact };