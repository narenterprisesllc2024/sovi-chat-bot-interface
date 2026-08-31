import { getBearerToken } from "@/lib/auth/client";

/** Same-origin Sovi API fetch. Attaches the live-preview bearer when present. */
export function soviFetch(input: string, init: RequestInit = {}) {
  const headers = new Headers(init.headers);
  const token = getBearerToken();
  if (token && !headers.has("Authorization")) {
    headers.set("Authorization", `Bearer ${token}`);
  }
  return fetch(input, { ...init, headers, credentials: "include" });
}
