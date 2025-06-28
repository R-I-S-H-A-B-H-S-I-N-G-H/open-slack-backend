import bcrypt from "bcrypt";

const saltRounds = 10;

export async function hashPassword(plaintextPassword: string): Promise<string> {
	return await bcrypt.hash(plaintextPassword, saltRounds);
}

export async function comparePassword(plainPassword: string, hash: string): Promise<boolean> {
	return await bcrypt.compare(plainPassword, hash);
}
