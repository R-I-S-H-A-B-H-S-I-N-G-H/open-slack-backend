import Chat from "../models/chat";


export type ChatMessage = {
	message: string;
	to: string;
	from: string;
};

export async function sendMessage(chat: ChatMessage) {
    const res = await Chat.create({
		userId: chat.from,
		recepientId: chat.to,
		message: chat.message,
    });
    return res;
}

export async function getChatsAfterTime(userId: string, time: Date) {
	const chats = await Chat.find({
		$or: [{ userId: userId }, { recepientId: userId }],
		createdAt: { $gt: time },
	})
		.sort({ createdAt: 1 })
		.limit(100);
	return chats;
}