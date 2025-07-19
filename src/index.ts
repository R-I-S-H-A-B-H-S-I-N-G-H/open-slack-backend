import { Hono } from "hono";
import { handle } from "hono/aws-lambda";
import { logger } from "hono/logger";
import mongoose from "mongoose";

import chatRouter from "./controller/chat.controller";
import authRouter from "./controller/auth.controller";
import userRouter from "./controller/user.controller";
import { authorizeReq } from "./middleware/authorize.middleware";

const database = "mongodb+srv://test:test@cluster0.vpid4.mongodb.net/open-slack-qa?retryWrites=true&w=majority&appName=Cluster0";

let isConnected = false;

async function connectToDatabase() {
	if (isConnected) return;

	try {
		await mongoose.connect(database, {
			serverSelectionTimeoutMS: 5000, // fail fast on cold starts
		});
		isConnected = true;
		console.log("✅ DB connected");
	} catch (err) {
		console.error("❌ DB connection error:", err);
		throw err;
	}
}

const app = new Hono();

app.use(logger());

// Ensure DB is connected for every request (middleware runs first)
app.use("*", async (c, next) => {
	await connectToDatabase();
	return next();
});

// Public route
app.get("/", (c) => {
	return c.text("Hello Hono! by rs");
});

// Routes
app.route("/auth", authRouter);
app.route("/user", userRouter);

// Protected routes (apply auth middleware)
app.use(authorizeReq);
app.route("/:id/chat", chatRouter);

// For AWS Lambda
export const handler = handle(app);

// Optional local dev server
if (process.env.NODE_ENV !== "production") {
	import("@hono/node-server").then(({ serve }) => {
		const PORT = 3000;
		serve({ fetch: app.fetch, port: PORT });
		console.log(`🚀 Local server running at http://localhost:${PORT}`);
	});
}
