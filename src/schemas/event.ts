import { z } from "zod";
export const eventSchema = z.object({
    eventDate: z.string(),
});
