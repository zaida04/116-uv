import { eq } from "drizzle-orm";
import { Elysia, t } from "elysia";
import { db } from "../client";
import { requests } from "../schema";

const router = new Elysia();

router.get(
	"/uploads/:id",
	async (ctx) => {
		const { id } = ctx.params;
		const result = await db.select().from(requests).where(eq(requests.id, id));

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
			id: t.String(),
		}),
	},
);

export default router;
