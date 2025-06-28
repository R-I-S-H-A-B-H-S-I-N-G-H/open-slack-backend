import { nanoid } from "nanoid";

export function getUUID(length: number = 32): string {
    return nanoid(length);
}

export function getShortId(length: number = 8): string {
    return getUUID(length);
}
