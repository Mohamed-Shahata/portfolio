import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import {
  ADMIN_COOKIE_NAME,
  verifyAdminToken,
  type AdminSessionPayload,
} from "@/lib/auth-edge";

export { ADMIN_COOKIE_NAME, signAdminToken } from "@/lib/auth-edge";
export type { AdminSessionPayload } from "@/lib/auth-edge";

/** Reads and verifies the admin session from cookies in a Server Component / Route Handler. */
export async function getAdminSession(): Promise<AdminSessionPayload | null> {
  const store = await cookies();
  const token = store.get(ADMIN_COOKIE_NAME)?.value;
  if (!token) return null;
  return verifyAdminToken(token);
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}

export async function verifyPassword(
  password: string,
  hash: string,
): Promise<boolean> {
  return bcrypt.compare(password, hash);
}
