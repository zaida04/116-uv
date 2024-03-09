import { expect, test } from "bun:test";
import { makeApiRequest } from "./shared.test";

test("successful upload submission", async () => {
	const response = await makeApiRequest("/uploads", "POST", {
		user: "testUser",
		content: "testContent",
	});
	expect(response.status).toBe(200);

	const data = await response.json();
	expect(data.error).toBeFalsy();
	expect(data.submission).toHaveProperty("id");
	expect(data.submission.user).toBe("testUser");
	expect(data.submission.content).toBe("testContent");
});

test("upload submission with missing fields", async () => {
	const response = await makeApiRequest("/uploads", "POST", {
		user: "testUser",
	});
	expect(response.status).toBe(400);

	const data = await response.json();
	expect(data.error).toBeTruthy();
});
