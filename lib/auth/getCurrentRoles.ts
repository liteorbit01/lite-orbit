import type { Database } from "@/types/database.types";

import { supabaseAdmin } from "@/lib/supabase/admin";

type RoleRow =
  Database["public"]["Tables"]["roles"]["Row"];

/**
 * Returns every role assigned
 * to the specified profile.
 */
export async function getCurrentRoles(
  profileId: string
): Promise<RoleRow[]> {
  const { data, error } = await supabaseAdmin
    .from("profile_roles")
    .select(`
      roles (
        id,
        code,
        name
      )
    `)
    .eq("profile_id", profileId);

  if (error) {
    throw error;
  }

  return (
    data
      ?.map((profileRole) => profileRole.roles)
      .filter(
        (role): role is RoleRow => role !== null
      ) ?? []
  );
}