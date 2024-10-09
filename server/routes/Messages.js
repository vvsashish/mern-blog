import express from "express";
import Message from "../models/message.model.js";

const router = express.Router();

// Get all messages
router.get("/", async (req, res) => {
  try {
    const messages = await Message.find();
    res.json(messages);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Add a new message
router.post("/add", async (req, res) => {
  const { message } = req.body;

  const newMessage = new Message({ message });

  try {
    await newMessage.save();
    res.json("Message added!");
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;
