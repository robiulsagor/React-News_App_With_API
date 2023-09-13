import axios from "axios";

export const instance = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    timeout: 10000,
    headers: { 'X-Api-Key': import.meta.env.VITE_API_KEY }
});