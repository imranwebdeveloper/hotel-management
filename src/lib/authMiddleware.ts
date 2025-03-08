// app/middleware/auth.ts
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

export async function requireAuth() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return null;
  }
  return session;
}
