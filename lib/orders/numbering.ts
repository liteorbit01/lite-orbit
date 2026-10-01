import { supabaseAdmin } from "@/lib/supabase/admin";

export async function generateOrderNumber() {

  const { count, error } =
    await supabaseAdmin
      .from("orders")
      .select("*", {
        count: "exact",
        head: true,
      });

  if (error) {
    throw error;
  }

  const nextNumber =
    (count ?? 0) + 100001;

  return `LO-${nextNumber}`;
}