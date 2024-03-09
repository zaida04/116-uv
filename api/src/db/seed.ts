import { eq } from "drizzle-orm";
import { db, sqlite } from "./client";
import { uploads } from "./schema";

async function main() {
	const [existing_upload] = await db.select().from(uploads).where(eq(uploads.id, "testUpload"));

	if (!existing_upload) {
		await db.insert(uploads).values({
			id: "testUpload",
			content: "testContent",
			user: "testUser",
		});
	}

	sqlite.close();
}

main();
