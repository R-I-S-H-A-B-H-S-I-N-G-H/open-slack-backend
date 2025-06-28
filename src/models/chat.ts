import mongoose from "mongoose";
import { getShortId } from "../utils/uuid";

// models/chat.js

const chatSchema = new mongoose.Schema({
	shortId: {
		type: String,
		unique: true,
		default: () => `chat-${getShortId()}`,
	},

	userId: {
		type: String,
		required: true,
	},
	recepientId: {
		type: String,
		required: true,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
	isRead: {
		type: Boolean,
		default: false,
	},
	isDeleted: {
		type: Boolean,
		default: false,
	},
	message: {
		type: String,
		required: true,
	},
});

const Chat = mongoose.model("chat", chatSchema);
export default Chat;
