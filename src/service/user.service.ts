import User from "../models/user";
import { comparePassword, hashPassword } from "./password.service";

export async function createUser(username: string, password: string) {
    const hashedPassword = await hashPassword(password);
    return User.create({
        username: username,
        password: hashedPassword
    })
}

export async function getUserById(username: string) {
    return User.findOne({ username: username })
}

export async function authorizedUser(username: string, plainPass: string) {
    const user = await getUserById(username);

    if (!user) return null;

    const hashedPass = user.password;
    const authStatus: boolean = await comparePassword(plainPass, hashedPass);

    if (!authStatus) return null;
    return user;
}