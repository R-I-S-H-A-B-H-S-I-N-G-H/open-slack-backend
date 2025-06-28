import { Hono } from "hono";
import { ChatMessage, getChatsAfterTime, sendMessage } from "../service/chat.service";

const chatRouter = new Hono();
export default chatRouter;

chatRouter.get("/send", (c) => {
	const id = c.req.param("id");
	if (!id) {
		return c.json({ msg: "id is required" }, 400);
	}

	const msg: ChatMessage = {
		message: "Hello, this is a test message",
		to: "user123",
		from: id,
	};

	const res = sendMessage(msg);
	return c.json({ msg: "send", response: res }, 200);
});

chatRouter.get("/sync", async (c) => {
	const id = c.req.param("id");
	if (!id) {
		return c.json({ msg: "id is required" }, 400);
	}

	const timeStr = c.req.query("time");
	if (!timeStr) {
		return c.json({ msg: "time is required" }, 400);
	}

	const time = new Date(timeStr);
	if (isNaN(time.getTime())) {
		return c.json({ msg: "invalid time format" }, 400);
	}
	time.setHours(time.getHours() - 1); // Get chats from the last hour

	const chats = await getChatsAfterTime(id, time);
	return c.json({ msg: "get", response: chats }, 200);
});