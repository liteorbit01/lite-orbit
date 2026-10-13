import { redirect } from "next/navigation";

import type { Identity } from "./getCurrentIdentity";

import { getCurrentIdentity } from "./getCurrentIdentity";

/**
 * Ensures the current request is authenticated.
 *
 * Redirects unauthenticated users to the admin login page.
 */
export async function requireAuth(): Promise<Identity> {
  const identity = await getCurrentIdentity();

  if (!identity) {
    redirect("/admin/login");
  }

  return identity;
}