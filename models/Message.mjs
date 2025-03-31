import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema({
    name: String,
    email: String,
    subject: String,
    message: String,
    timestamp: {
        type: Date,
        default: Date.now
    }
});
const Message = mongoose.model("Message", MessageSchema)

export default Message;