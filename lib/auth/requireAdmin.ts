import type { Identity } from "./getCurrentIdentity";

import { requireRole } from "./requireRole";
import { Roles } from "./roles";

/**
 * Ensures the authenticated user
 * is a Lite Orbit administrator.
 */
export async function requireAdmin(): Promise<Identity> {
  return requireRole(Roles.ADMIN);
}