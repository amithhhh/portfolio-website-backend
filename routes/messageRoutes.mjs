import { Router } from "express";
import { getAllMessages, getMessageById, setMessage } from "../controllers/messageController.mjs";
import authMiddleware from "../middleware/authMiddleware.mjs";

const messageRoute = Router();
messageRoute.post('/save-message', setMessage)
messageRoute.get('/get-messages',authMiddleware , getAllMessages)
messageRoute.get('/get-messages/:id',authMiddleware , getMessageById)

export default messageRoute;
