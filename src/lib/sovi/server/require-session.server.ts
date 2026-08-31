import { getSessionUser } from "@/lib/auth/verify.server";

/** Gate Sovi API routes. Unsigned callers cannot spend the owner's gateway quota. */
export async function soviUnauthorized(): Promise<Response | null> {
  const user = await getSessionUser();
  if (user) return null;
  return Response.json({ error: "Sign in required" }, { status: 401 });
}
