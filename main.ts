import { Hono } from "hono";
import { participants } from "./src/routes/participants.ts";

export const kv = await Deno.openKv();

const app = new Hono();

app.route("/participants/", participants);

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

Deno.serve(app.fetch);
