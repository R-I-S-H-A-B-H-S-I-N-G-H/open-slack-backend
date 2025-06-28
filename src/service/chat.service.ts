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
