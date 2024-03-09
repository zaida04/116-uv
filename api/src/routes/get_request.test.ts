import { expect, test } from "bun:test";
import { makeApiRequest } from "./shared.test";

test("retrieve existing upload by id", async () => {
    await makeApiRequest("/uploads", "POST", {
        user: "testUser2",
        content: "STUFF",
    });
    const request_req = await makeApiRequest("/uploads/testUser2/request", "POST", {
        requested_by: "ta1",
    });
    const id = (await request_req.json()).id;

    const upload_req = await makeApiRequest(`/uploads/requests/${id}`, "GET");
    expect(upload_req.status).toBe(200);
    const data = await upload_req.json();

    expect(data.error).toBeFalsy();
    expect(data.upload).toBeObject();
    expect(data.upload.user).toBe("testUser2");
});

test("attempt to retrieve upload with non-existing id", async () => {
    const response = await makeApiRequest(`/uploads/notExistingId`, "GET");
    expect(response.status).toBe(404);

    const data = await response.json();
    expect(data.error).toBe("No uploads found");
});
