import { desc, eq } from "drizzle-orm";
import { Elysia, t } from "elysia";
import { db } from "../client";
import { requests, uploads } from "../schema";

import { nanoid } from "nanoid";
import tas from "../tas.json";

const router = new Elysia();

router.post(
	"/uploads/:user/request",
	async (ctx) => {
		const { user } = ctx.params;
		const { requested_by } = ctx.body;

		if (!tas.includes(requested_by)) {
			ctx.set.status = 403;
			return { error: "You are not authorized to request this upload" };
		}

		const [upload] = await db.select().from(uploads).where(eq(uploads.user, user)).orderBy(desc(uploads.created_at));

		if (!upload) {
			ctx.set.status = 404;
			return { error: "No uploads found" };
		}

		const request_id = nanoid();
		await db
			.insert(requests)
			.values({
				id: request_id,
				requested_by,
				upload_id: upload.id,
				created_at: new Date(),
			})
			.returning();

		return {
			error: false,
			id: process.env.NODE_ENV === "production" ? undefined : request_id,
		};
	},
	{
		params: t.Object({
			user: t.String(),
		}),
		body: t.Object({
			requested_by: t.String(),
		}),
	},
);

export default router;
