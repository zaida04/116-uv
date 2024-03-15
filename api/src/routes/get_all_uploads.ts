import { Elysia } from "elysia";
import { db } from "../db/client";
import { uploads } from "../db/schema";
import { desc } from "drizzle-orm";

const router = new Elysia();

// This is for analytics.
router.get(
    "/uploads",
    async (ctx) => {
        const all_uploads = await db.select()
            .from(uploads)
            .orderBy(desc(uploads.created_at));

        return {
            error: false,
            uploads: [],
        };
    },
);

export default router;
