import { API_URL } from "./consts";

export function fetcher<T = Record<string, any>>(method: string, path: string, init?: RequestInit): Promise<T> {
    return fetch(API_URL + path, {
        method,
        body: init?.body ? JSON.stringify(init.body) : undefined,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        ...init
    }).then((res) => res.json());
}