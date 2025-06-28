import { nanoid } from "nanoid";

export function getUUID(length: number = 32): string {
    return nanoid(length);
}

export function getShortId(length: number = 10): string {
	return getUUID(length);
}
