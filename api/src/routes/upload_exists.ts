import { eq } from "drizzle-orm";
import { Elysia, t } from "elysia";
import { db } from "../client";
import { uploads } from "../schema";

const router = new Elysia();

router.get(
	"/uploads/:user",
	async (ctx) => {
		const { user } = ctx.params;
		const result = await db.select().from(uploads).where(eq(uploads.user, user));

		return {
			error: result.length === 0,
		};
	},
	{
		params: t.Object({
			user: t.String(),
		}),
	},
);

export default router;
