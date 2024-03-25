import cors from "@elysiajs/cors";
import { Elysia } from "elysia";

import upload_request from "./routes/create_request";
import create_upload from "./routes/create_upload";
import get_upload from "./routes/get_request";
import upload_exists from "./routes/get_upload";
import get_all_uploads from "./routes/get_all_uploads";
import { migrate } from "drizzle-orm/bun-sqlite/migrator";
import { db } from "./db/client";

const app = new Elysia();
app.use(cors());
app.onError((ctx) => {
	console.log(`
Err:
	route: ${ctx.request.url}
	${ctx.error}
	`);
	return { error: "An internal error occurred" };
});

app.get("/", () => "Hello Elysia");
// The flow goes
// autolab: create_upload
// ta: get_upload (checking if exists), create_request, get_request
// "but zaid, why not condense those 3 into one route?"
// because this is our makeshift auth that ensures only TAs can request uploads
app.use(create_upload);
app.use(get_upload);
app.use(upload_exists);
app.use(upload_request);
app.use(get_all_uploads);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	migrate(db, { migrationsFolder: "drizzle" });
	console.log("Database migrated successfully");
	console.log(`🦊 Elysia is running at ${app.server?.hostname}:${PORT}`);
});
