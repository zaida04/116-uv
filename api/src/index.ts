import cors from "@elysiajs/cors";
import { desc, eq } from "drizzle-orm";
import { Elysia, t } from "elysia";
import { nanoid } from "nanoid";
import { db } from "./client";
import { uploads } from "./schema";

const app = new Elysia();
app.use(cors());

app.get("/", () => "Hello Elysia");

app.post(
	"/uploads",
	async (ctx) => {
		const { user, content } = ctx.body;
		const new_id = nanoid();

		const inserted = await db
			.insert(uploads)
			.values({
				id: new_id,
				user,
				content,
				created_at: new Date(),
			})
			.returning();
		return {
			error: false,
			submission: inserted[0],
		};
	},
	{
		body: t.Object({
			user: t.String(),
			content: t.String(),
		}),
	},
);

app.get(
	"/uploads/:user",
	async (ctx) => {
		const { user } = ctx.params;
		const result = await db
			.select()
			.from(uploads)
			.where(eq(uploads.user, user))
			.orderBy(desc(uploads.created_at));

		if (result.length === 0) {
			ctx.set.status = 404;
			return { error: "No uploads found" };
		}

		return {
			error: false,
			submission: result[0],
		};
	},
	{
		params: t.Object({
			user: t.String(),
		}),
	},
);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`🦊 Elysia is running at ${app.server?.hostname}:${PORT}`);
});
