import { Hono } from "hono";
import { createUser } from "../service/user.service";

const userRouter = new Hono()
export default userRouter;

userRouter.post("/", async (c) => {
    const body = await c.req.json();
    const username: string = body.username as string;
    const password: string = body.password as string;

    if (!username) return c.json({ reason: "username needed" }, 400)
    if (!password) return c.json({ reason: "password needed" }, 400);

    const user = await createUser(username, password);
    return c.json({ user });
});