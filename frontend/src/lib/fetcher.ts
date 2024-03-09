import { API_URL } from "./consts";

type SuccessResponse<T> = T & {
    error: false;
}

interface ErrorResponse {
    error: string;
}

type APIResponse<T> = SuccessResponse<T> | ErrorResponse;

export function fetcher<T = Record<string, any>>(method: string, path: string, init?: Omit<RequestInit, "body"> & { body: Record<string, any> }): Promise<APIResponse<T>> {

    return fetch(API_URL + path, {
        ...init,
        method,
        body: init?.body ? JSON.stringify(init.body) : undefined,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
    }).then((res) => res.json());
}