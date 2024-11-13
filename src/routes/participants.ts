import { Hono } from "hono";
import { validator } from "hono/validator";
import {
    clearParticipants,
    createParticipant,
    getParticipants,
} from "../models/participants.ts";
import { participantSchema } from "../schemas/participants.ts";
import { HTTPException } from "jsr:@hono/hono@^4.6.9/http-exception";

export const participants = new Hono();

participants.get("/", async (c) => {
    const participants = await getParticipants();
    return c.json(participants);
});
participants.post(
    "/",
    validator("json", (value, _c) => {
        const parsed = participantSchema.safeParse(value);
        if (!parsed.success) {
            throw new HTTPException(400, { message: parsed.error.message });
        }
        return parsed.data;
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
