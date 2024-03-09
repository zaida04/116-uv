import { eq } from "drizzle-orm";
import { Elysia, t } from "elysia";
import { db } from "../db/client";
import { uploads } from "../db/schema";

const router = new Elysia();

// This is for checking if a UBIT has any uploads.
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
