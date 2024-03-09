import { expect, test } from "bun:test";
import { makeApiRequest } from "./shared.test";

test("successful upload request by authorized user", async () => {
	const response = await makeApiRequest(`/uploads/testUser/request`, "POST", {
		requested_by: "ta1",
	});
	expect(response.status).toBe(200);

	const data = await response.json();
	expect(data.error).toBeFalsy();
	expect(data).toHaveProperty("id");
});

test("upload request by unauthorized user", async () => {
	const response = await makeApiRequest(`/uploads/testUser/request`, "POST", {
		requested_by: "unauthorizedUser",
	});
	expect(response.status).toBe(403);

	const data = await response.json();
	expect(data.error).toBe("You are not authorized to request this upload");
});

test("upload request for non-existing user", async () => {
	const response = await makeApiRequest(`/uploads/nonExistingUser/request`, "POST", {
		requested_by: "ta1",
	});
	expect(response.status).toBe(404);

	const data = await response.json();
	expect(data.error).toBe("No uploads found");
});
