import { kv } from "../../main.ts";

type Participant = {
    id: string;
    name: string;
    direction: string;
    age: number;
    confirmed: boolean;
    date: string;
};
export const getParticipants = async () => {
    const iter = kv.list<Participant>({ prefix: ["participants"] });
    const participants: Participant[] = [];
    for await (const { value } of iter) participants.push(value);
    return participants;
};
export const createParticipant = async (participant: Participant) => {
    const key = ["participants", participant.id];
    await kv.set([...key], participant);
};
export const clearParticipants = async () => {
    const iter = kv.list({ prefix: ["participants"] });
    for await (const { key } of iter) await kv.delete(key);
};
