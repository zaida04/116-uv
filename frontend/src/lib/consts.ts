import { dev } from '$app/environment';

export const ISDEV = dev;
export const ISPROD = !ISDEV;
export const API_URL = ISPROD ? 'https://ta-api.trc.lol' : 'http://localhost:3000';
// export const API_URL = 'https://ta-api.trc.lol';