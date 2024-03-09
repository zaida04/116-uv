import { desc, eq } from "drizzle-orm";
import { Elysia, t } from "elysia";
import { db } from "../db/client";
import { requests, uploads } from "../db/schema";

import { nanoid } from "nanoid";
import tas from "../tas.json";
import { emailer } from "../emailer";

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

		if (process.env.NODE_ENV === "production") {
			try {
				await emailer.messages.create("ta.trc.lol", {
					from: "116 Output Viewer <116@ta.trc.lol>",
					to: `${requested_by}@buffalo.edu`,
					subject: "Request for 116 Output Viewer",
					text: `You have a request for 116 Output Viewer. https://ta.trc.lol/requests/${request_id}`
				});
			} catch (e) {
				console.log(e);
			}
		}

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
