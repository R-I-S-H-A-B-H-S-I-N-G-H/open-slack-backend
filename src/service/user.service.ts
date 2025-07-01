import Chat from "../models/chat";
import User from "../models/user";
import { comparePassword, hashPassword } from "./password.service";

export type ConnectedUser = {
	shortId: string;
	username: string;
};

export async function createUser(username: string, password: string) {
	const hashedPassword = await hashPassword(password);
	return User.create({
		username: username,
		password: hashedPassword,
	});
}

export async function getUserById(username: string) {
	return User.findOne({ username: username });
}

export async function authorizedUser(username: string, plainPass: string) {
	const user = await getUserById(username);

	if (!user) return null;

	const hashedPass = user.password;
	const authStatus: boolean = await comparePassword(plainPass, hashedPass);

	if (!authStatus) return null;
	return user;
}

export async function getContacts(userId: string): Promise<ConnectedUser[]> {
	const chats = await Chat.find({
		$or: [{ userId }, { recepientId: userId }],
	}).select("userId recepientId");

	const connectedUserIds = new Set<string>();

	for (const chat of chats) {
		if (chat.userId !== userId) connectedUserIds.add(chat.userId);
		if (chat.recepientId !== userId) connectedUserIds.add(chat.recepientId);
	}

	const users = await User.find({ shortId: { $in: [...connectedUserIds] } }).select("shortId username -_id");

	// Ensure correct type
	return users.map((user) => ({
		shortId: user.shortId,
		username: user.username,
	}));
}
