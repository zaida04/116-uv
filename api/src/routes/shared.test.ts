const BASE_URL = "http://localhost:3000";

export async function makeApiRequest(endpoint: string, method: string = "POST", body?: object) {
	return fetch(`${BASE_URL}${endpoint}`, {
		method,
		headers: {
			"Content-Type": "application/json",
		},
		body: body ? JSON.stringify(body) : undefined,
	});
}
