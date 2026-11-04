import mongoose from "mongoose";
import { validationResult } from "express-validator";
import Contact from "../models/contact.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const submitContactForm = asyncHandler("submitContactForm", async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json({ success: false, message: errors.array()[0].msg });
  }

  const { name, email, category, message, userId } = req.body;

  // Separate images and video from the uploaded URLs
  const images = [];
  let video = null;

  if (req.cloudinaryUrls && req.cloudinaryUrls.length > 0) {
    req.cloudinaryUrls.forEach((url) => {
      if (url.includes("/video/")) {
        video = url;
      } else {
        images.push(url);
      }
    });
  }

  const contactData = {
    name,
    email,
    category,
    message,
  };

  if (userId && userId !== "null") contactData.userId = userId;
  if (images.length > 0) contactData.images = images;
  if (video) contactData.video = video;

  const newContact = new Contact(contactData);

  await newContact.save();

  res.status(200).json({
    success: true,
    message: "Your message has been sent successfully!",
  });
});

export const getUserContacts = asyncHandler("getUserContacts", async (req, res) => {
  const isResponded = req.query.isResponded;
  const isRespondedBool = isResponded === "true" || isResponded === true;

  const query = { userId: req.user.userId };
  if (isRespondedBool) {
    query.response = { $ne: "" };
  } else {
    query.response = { $eq: "" };
  }

  const contacts = await Contact.find(query)
    .sort({ createdAt: -1 });

  return res.status(200).json({
    success: true,
    message: "User contacts fetched successfully!",
    data: { contacts },
  });
});

export const getAdminContactData = asyncHandler("getAdminContactData", async (req, res) => {
  const isResponded = req.query.isResponded;

  const isRespondedBool = isResponded === "true" || isResponded === true;

  const query = isRespondedBool
    ? { response: { $ne: "" } }
    : { response: { $eq: "" } };

  const contactData = await Contact.find(query)
    .populate("userId", "username profileImage email")
    .sort({ createdAt: -1 });

  const total = await Contact.countDocuments();
  const responded = await Contact.countDocuments({ response: { $ne: "" } });
  const pending = total - responded;

  return res.status(200).json({
    success: true,
    message: "Contact data fetched successfully!",
    data: {
      contacts: contactData,
      stats: { total, pending, responded },
    },
  });
});

export const respondToContact = asyncHandler("respondToContact", async (req, res) => {
  const { id } = req.params;
  const { response } = req.body;

  if (!id || !mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ success: false, message: "Invalid contact inquiry ID format." });
  }

  if (!response || typeof response !== "string" || response.trim().length === 0) {
    return res.status(400).json({ success: false, message: "Response is required." });
  }

  if (response.trim().length > 1000) {
    return res.status(400).json({ success: false, message: "Response must be 1000 characters or less." });
  }

  const contact = await Contact.findById(id);
  if (!contact) {
    return res.status(404).json({ success: false, message: "Contact inquiry not found." });
  }

  contact.response = response.trim();
  contact.isRead = false;
  await contact.save();

  return res.status(200).json({
    success: true,
    message: "Response sent successfully!",
  });
});

