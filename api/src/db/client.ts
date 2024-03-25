import { Database } from "bun:sqlite";
import { drizzle } from "drizzle-orm/bun-sqlite";

const sqlite = new Database("./data/sqlite.db", {
    "create": true,
    "readwrite": true
});
const db = drizzle(sqlite);

export { db, sqlite };
