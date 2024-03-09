import { eq } from "drizzle-orm";
import { Elysia, t } from "elysia";
import { db } from "../db/client";
import { requests, uploads } from "../db/schema";

const router = new Elysia();

// This is for the TA to view a output.
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
