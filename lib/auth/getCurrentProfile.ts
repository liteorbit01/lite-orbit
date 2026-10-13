import type { User } from "@supabase/supabase-js";
import type { Database } from "@/types/database.types";

import { supabaseAdmin } from "@/lib/supabase/admin";

type Profile =
  Database["public"]["Tables"]["profiles"]["Row"];

/**
 * Returns the Lite Orbit profile associated
 * with an authenticated user.
 */
export async function getCurrentProfile(
  user: User | null
): Promise<Profile | null> {
  if (!user) {
    return null;
  }

  const { data, error } = await supabaseAdmin
    .from("profiles")
    .select(`
      id,
      email,
      first_name,
      last_name,
      display_name,
      avatar_url,
      phone,
      is_active,
      created_at,
      updated_at
    `)
    .eq("id", user.id)
    .maybeSingle();

  if (error) {
    throw error;
  }

  return data;
}