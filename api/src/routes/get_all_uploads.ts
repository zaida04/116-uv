import { Elysia } from "elysia";
import { db } from "../db/client";
import { uploads } from "../db/schema";

const router = new Elysia();

// This is for analytics.
router.get(
    "/uploads",
    async (ctx) => {
        const all_uploads = await db.select().from(uploads)

        return {
            error: false,
            uploads: all_uploads,
        };
    },
);

export default router;
