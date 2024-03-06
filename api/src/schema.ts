import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

const uploads = sqliteTable("uploads", {
	id: text("id").primaryKey(),
	user: text("user").notNull().notNull(),
	content: text("content").notNull(),
	created_at: integer("created_at", { mode: "timestamp_ms" }),
});

export { uploads };
