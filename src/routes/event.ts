import { Hono } from "hono";
import { getEventDate, setEventDate } from "../models/event.ts";
import { validator } from "hono/validator";
import { eventSchema } from "../schemas/event.ts";
import { HTTPException } from "hono/http-exception";

export const event = new Hono();

event.get("/", async (c) => {
    const eventDate = (await getEventDate()).value;
    return c.json({ eventDate });
});

event.post(
    "/",
    validator("json", (value, _c) => {
        const parsed = eventSchema.safeParse(value);
        if (!parsed.success) {
            throw new HTTPException(400, { message: parsed.error.message });
        }
    }),
    async (c) => {
        const { eventDate } = await c.req.json();
        await setEventDate(eventDate);
        return c.json({ eventDate });
    },
);
