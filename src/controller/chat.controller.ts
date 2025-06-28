import { Hono } from "hono";
import { ChatMessage, sendMessage } from "../service/chat.service";

const chatRouter = new Hono();
export default chatRouter;


chatRouter.get("/send", (c) => {
    const id = c.req.param("id");
    if (!id) {
        return c.json({ "msg": "id is required" }, 400);
    }

    const msg: ChatMessage = {
        message: "Hello, this is a test message",
        to: "user123",
        from: id,
    }

    const res = sendMessage(msg)
    return c.json({"msg":"send", response: res}, 200);
});