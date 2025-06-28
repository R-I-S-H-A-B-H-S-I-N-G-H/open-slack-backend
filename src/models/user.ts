import mongoose from "mongoose";
import { getShortId } from "../utils/uuid";

const userSchema = new mongoose.Schema(
{
        shortId: {
            type: String,
            unique: true,
            default: () => `user-${getShortId()}`,
        },
        username: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
    }
);

const User = mongoose.model("user", userSchema);
export default User;