import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

const uploads = sqliteTable("uploads", {
	id: text("id").primaryKey(),
	user: text("user").notNull().notNull(),
	content: text("content").notNull(),
	created_at: integer("created_at", { mode: "timestamp_ms" }).notNull().$defaultFn(() => new Date()),
});

const requests = sqliteTable("request", {
	id: text("id").primaryKey(),
	requested_by: text("requested_by").notNull(),
	upload_id: text("upload_id").notNull(),
	created_at: integer("created_at", { mode: "timestamp_ms" }).notNull().$defaultFn(() => new Date()),
});

export { uploads, requests };
