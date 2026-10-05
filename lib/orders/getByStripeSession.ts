import { supabaseAdmin } from "@/lib/supabase/admin";

export async function getOrderByStripeSession(
  stripeSessionId: string
) {
  const { data, error } = await supabaseAdmin
    .from("orders")
    .select("id, order_number")
    .eq("stripe_session_id", stripeSessionId)
    .maybeSingle();

  if (error) {
    throw error;
  }

  return data;
}