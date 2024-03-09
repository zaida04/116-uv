import { expect, test } from "bun:test";
import { makeApiRequest } from "./shared.test";

test("retrieve existing upload by id", async () => {
	// Make a request for the upload
	const request_req = await makeApiRequest("/uploads/testUser/request", "POST", {
		requested_by: "ta1",
	});
	const id = (await request_req.json()).id;

	// Get the info about the request/upload
	const upload_req = await makeApiRequest(`/uploads/requests/${id}`, "GET");
	expect(upload_req.status).toBe(200);
	const data = await upload_req.json();

	// Make sure the data is correct
	expect(data.error).toBeFalsy();
	expect(data.upload).toBeObject();
	expect(data.upload.user).toBe("testUser");
	expect(data.upload.content).toBe("testContent");
});

test("attempt to retrieve upload with non-existing id", async () => {
	const response = await makeApiRequest(`/uploads/notExistingId`, "GET");
	expect(response.status).toBe(404);

	const data = await response.json();
	expect(data.error).toBe("No uploads found");
});
