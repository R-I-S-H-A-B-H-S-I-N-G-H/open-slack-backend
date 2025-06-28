import { Hono } from "hono";
import { authorizedUser } from "../service/user.service";
import { JwtPayload, signJwt } from "../service/jwt.service";

const authRouter = new Hono();
export default authRouter;

authRouter.post("/login", async (c) => {
    const body = await c.req.json();
   
    const username = body.username as string;
    const password = body.password as string
    const user = await authorizedUser(username, password);

    if (!user) return c.text("Unauthorized", 401)
    
    const jwtPayload: JwtPayload = {
        userId: user.shortId
    }
    const jwt = signJwt(jwtPayload);
 
    return c.json({ jwt: jwt })
});
