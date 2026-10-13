import { redirect } from "next/navigation";

import type { Identity } from "./getCurrentIdentity";
import type { Role } from "./roles";

import { requireAuth } from "./requireAuth";

/**
 * Ensures the authenticated user has the required
 * Lite Orbit role.
 *
 * Authentication is handled by requireAuth().
 * Authorization is handled here.
 *
 * TODO:
 * Replace the redirect with a dedicated /403
 * Unauthorized page once it has been implemented.
 */
export async function requireRole(
  requiredRole: Role
): Promise<Identity> {
  const identity = await requireAuth();

  if (!identity.roleCodes.includes(requiredRole)) {
    redirect("/403");
  }

  return identity;
}