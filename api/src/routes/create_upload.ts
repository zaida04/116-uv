import { Elysia, t } from "elysia";
import { nanoid } from "nanoid";
import { db } from "../db/client";
import { uploads } from "../db/schema";

const router = new Elysia();

router.post(
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

export default router;
