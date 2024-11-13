import { Hono } from "hono";
import { validator } from "hono/validator";
import {
    clearParticipants,
    createParticipant,
    getParticipants,
} from "../models/participants.ts";
export const participants = new Hono();

participants.get("/", async (c) => {
    const participants = await getParticipants();
    return c.json(participants);
});
participants.post(
    "/",
    validator("json", (value, _c) => {
        return value;
    }),
    async (c) => {
        const participant = await c.req.json();
        await createParticipant(participant);
        return c.json({ message: "Participant created successfully" });
    },
);
participants.delete("/", async (c) => {
    await clearParticipants();
    return c.json({ message: "Participants cleared successfully" });
});
