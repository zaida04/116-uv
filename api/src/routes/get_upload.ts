import { eq } from "drizzle-orm";
import { Elysia, t } from "elysia";
import { db } from "../client";
import { uploads } from "../schema";

const router = new Elysia();

router.get(
	"/uploads/:user",
	async (ctx) => {
		const { user } = ctx.params;
		const [upload] = await db.select().from(uploads).where(eq(uploads.user, user));

		if (!upload) ctx.set.status = 404;

		return {
			error: upload ? false : "No uploads found",
		};
	},
	{
		params: t.Object({
			user: t.String(),
		}),
	},
);

export default router;
