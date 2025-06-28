import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";
const JWT_EXPIRES_IN = "7d";

export type JwtPayload = {
    userId: string;
    email?: string;
    [key: string]: any; // Allow additional properties
};

export function signJwt(payload: JwtPayload, options?: jwt.SignOptions): string {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN, ...options });
}

export function verifyJwt(token: string): JwtPayload | null {
    try {
        return jwt.verify(token, JWT_SECRET) as JwtPayload;
    } catch (e) {
        return null;
    }
}

export function decodeJwt(token: string): null | { [key: string]: any } {
    return jwt.decode(token) as { [key: string]: any } | null;
}