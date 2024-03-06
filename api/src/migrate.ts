import { migrate } from "drizzle-orm/bun-sqlite/migrator";
import { db, sqlite } from "./client";

console.log("Migrating database...");
migrate(db, { migrationsFolder: "drizzle" });
console.log("Database migrated successfully");
sqlite.close();
