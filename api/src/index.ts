import cors from "@elysiajs/cors";
import { Elysia } from "elysia";

import create_upload from "./routes/create_upload";
import get_upload from "./routes/get_upload";
import upload_exists from "./routes/upload_exists";
import upload_request from "./routes/upload_request";

const app = new Elysia();
app.use(cors());

app.get("/", () => "Hello Elysia");
app.use(create_upload);
app.use(upload_exists);
app.use(upload_request);
app.use(get_upload);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`🦊 Elysia is running at ${app.server?.hostname}:${PORT}`);
});
