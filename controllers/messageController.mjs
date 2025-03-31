import { sendTelegramNotification } from "../ExtraFunctions/ExtraFunctions.mjs";
import Message from "../models/Message.mjs";

export const setMessage = async (req, res) => {
    const { name, email, subject, message } = req.body;

    try {
        const newMessage = new Message({
            name: name,
            email: email,
            subject: subject,
            message: message
        })

        await newMessage.save();
        await sendTelegramNotification(newMessage)
        res.status(201).json({ success: true, message: "Message Submitted successfully" });
    }catch (err) {
        return res.status(500).json({ success: false, error: err.message });
    }

}

export const getAllMessages = async (req, res) => {
    try {
        const messages = await Message.find({});
        res.json(messages)
    }catch (err) {
        return res.status(500).json({error: err})
    }
}

export const getMessageById = async (req, res) => {
    try {
        const message = await Message.findById(req.params.id)

        if (!message) {
            return res.status(404).json({error: "Message not found..!"})
        }
        res.json(message);
    } catch (err) {
        res.status(500).json({error: "server error"})
    }
}