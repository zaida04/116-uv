import { eq } from "drizzle-orm";
import { Elysia, t } from "elysia";
import { db } from "../client";
import { requests, uploads } from "../schema";

const router = new Elysia();

router.get(
	"/uploads/requests/:id",
	async (ctx) => {
		const { id } = ctx.params;
		const [request] = await db.select().from(requests).where(eq(requests.id, id));

		if (!request) {
			ctx.set.status = 404;
			return { error: "No request found" };
		}

		const [upload] = await db.select().from(uploads).where(eq(uploads.id, request.upload_id));

		return {
			error: false,
			upload,
		};
	},
	{
		params: t.Object({
			id: t.String(),
		}),
	},
);

export default router;