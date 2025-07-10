import { Hono } from "hono";
import { createUser, getContacts, getUserList } from "../service/user.service";

const userRouter = new Hono();
export default userRouter;

userRouter.post("/", async (c) => {
	const body = await c.req.json();
	const username: string = body.username as string;
	const password: string = body.password as string;

	if (!username) return c.json({ reason: "username needed" }, 400);
	if (!password) return c.json({ reason: "password needed" }, 400);

	const user = await createUser(username, password);
	return c.json({ user });
});

userRouter.get("/find", async (c) => {
	const fuzzyUser = c.req.query("search");
	if (!fuzzyUser) return c.json({ userList: [] });
	const userList = await getUserList(fuzzyUser);
	return c.json({ userList });
});