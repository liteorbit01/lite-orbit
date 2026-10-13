import type { User } from "@supabase/supabase-js";
import type { Database } from "@/types/database.types";

import { getCurrentUser } from "./getCurrentUser";
import { getCurrentProfile } from "./getCurrentProfile";
import { getCurrentRoles } from "./getCurrentRoles";
import { Roles } from "./roles";


type ProfileRow =
  Database["public"]["Tables"]["profiles"]["Row"];

type RoleRow =
  Database["public"]["Tables"]["roles"]["Row"];

export type Identity = {
  user: User;
  profile: ProfileRow;
  roles: RoleRow[];
  roleCodes: string[];
  isAdmin: boolean;
};

/**
 * Resolves the authenticated Lite Orbit identity.
 */
export async function getCurrentIdentity():
Promise<Identity | null> {

  const user = await getCurrentUser();

  if (!user) {
    return null;
  }

  const profile =
    await getCurrentProfile(user);

  if (!profile) {
    return null;
  }

  const roles =
    await getCurrentRoles(profile.id);

  const roleCodes =
    roles.map((role) => role.code);
  
    const isAdmin =
  roleCodes.includes(Roles.ADMIN);

  return {
    user,
    profile,
    roles,
    roleCodes,
    isAdmin,
  };
}