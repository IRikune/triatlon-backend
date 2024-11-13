import { kv } from "../../main.ts";

export const getEventDate = async () => {
    const eventDate = await kv.get<string>(["eventDate"]);
    return eventDate;
};

export const setEventDate = async (eventDate: string) => {
    await kv.set(["eventDate"], eventDate);
    return eventDate;
};
