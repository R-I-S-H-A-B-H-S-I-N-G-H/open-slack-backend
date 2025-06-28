import { Context } from "hono";
import { decodeJwt, verifyJwt } from "../service/jwt.service";

export async function authorizeReq(c: Context, next: () => Promise<void>) {
    // Get the Authorization header
    const authHeader = c.req.header("authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return c.json({ error: "Unauthorized" }, 401);
    }

    const token = authHeader.replace("Bearer ", "").trim();

    if (!verifyJwt(token)) {
        return c.json({ error: "Unauthorized" }, 401);
    }

    const jwtPayload = decodeJwt(token) ?? {};
    const userId = jwtPayload["userId"];
    const reqUserId = c.req.path.split('/')[1]
    if (userId != reqUserId) {
        return c.json({ error: "Unauthorized" }, 401);
    }

    // Token is valid, proceed to next middleware/handler
    await next();
}