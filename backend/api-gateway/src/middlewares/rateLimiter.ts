import { Elysia } from "elysia";

const requests = new Map<string, number>();
const WINDOW_MS = 10_000;

export const rateLimiter = (app: Elysia) => {
  app.onRequest(({ request }) => {
    const ip = request.headers.get("x-forwarded-for") || "local";
    const now = Date.now();

    if (!requests.has(ip)) requests.set(ip, now);
    const diff = now - (requests.get(ip) || 0);

    if (diff < WINDOW_MS) {
      throw new Error("Rate limit exceeded");
    }

    requests.set(ip, now);
  });
};
