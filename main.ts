import { Hono } from "hono";
import { cors } from "hono/cors";
import { participants } from "./src/routes/participants.ts";
import { event } from "./src/routes/event.ts";

export const kv = await Deno.openKv();

const app = new Hono();

app.use(cors());
app.route("/participants/", participants);
app.route("/event/", event);

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

Deno.serve(app.fetch);
