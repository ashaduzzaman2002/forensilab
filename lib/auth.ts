import { cookies } from "next/headers";

const SESSION_COOKIE = "admin_session";

export async function createSession() {
  const token = Buffer.from(
    `authenticated:${Date.now()}:${process.env.SESSION_SECRET}`
  ).toString("base64");

  (await cookies()).set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24,
  });
}

export async function getSession() {
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  if (!token) return null;
  try {
    const decoded = Buffer.from(token, "base64").toString();
    if (decoded.includes(process.env.SESSION_SECRET!)) return { authenticated: true };
    return null;
  } catch {
    return null;
  }
}

export async function deleteSession() {
  (await cookies()).delete(SESSION_COOKIE);
}
