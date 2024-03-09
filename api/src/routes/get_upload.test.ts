import { expect, test } from "bun:test";
import { makeApiRequest } from "./shared.test";

test("retrieve uploads for existing user", async () => {
	// Check whether an upload exists for testUser
	const response = await makeApiRequest("/uploads/testUser", "GET");
	expect(response.status).toBe(200);

	const data = await response.json();
	expect(data.error).toBeFalsy();
});

test("retrieve uploads for non-existing user", async () => {
	const response = await makeApiRequest("/uploads/nonExistingUser", "GET");
	expect(response.status).toBe(404);

	const data = await response.json();
	expect(data.error).toBeTruthy();
});
