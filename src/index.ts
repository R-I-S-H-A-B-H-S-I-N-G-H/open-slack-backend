import { Hono } from 'hono'
import { handle } from 'hono/aws-lambda'
import { serve } from "@hono/node-server";
import mongoose from 'mongoose';
import chatRouter from './controller/chat.controller';
import { logger } from 'hono/logger';
import authRouter from "./controller/auth.controller";
import userRouter from "./controller/user.controller";
import { authorizeReq } from "./middleware/authorize.middleware";

// connect to db
const database = "mongodb+srv://test:test@cluster0.vpid4.mongodb.net/open-slack-qa?retryWrites=true&w=majority&appName=Cluster0";

mongoose
	.connect(database)
	.then((res) => console.log("DB connection successfull"))
	.catch((err) => console.error("DB connection fail : ", err));

const app = new Hono();

app.use(logger());
app.get("/", (c) => {
	return c.text("Hello Hono! by rs");
});



app.route("/auth", authRouter);
app.route("/user", userRouter);

app.use(authorizeReq);

app.route("/:id/chat", chatRouter);

export const handler = handle(app)
const PORT = 3000;

serve({ fetch: app.fetch, port: PORT });
console.log(`Server is running on http://localhost:${PORT}`);
