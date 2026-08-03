"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export type LoginState = {
  error: string;
};

export async function login(
  previousState: LoginState,
  formData: FormData
): Promise<LoginState> {
  console.log("====================================");
  console.log("LOGIN ACTION CALLED");
  console.log("====================================");

  const supabase = await createClient();

  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  console.log("Email:", email);

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  console.log("User:", data.user?.email);
  console.log("Session created:", !!data.session);
  console.log("Error:", error?.message);

  if (error) {
    return {
      error: error.message,
    };
  }

  console.log("Redirecting to /admin/dashboard");

  redirect("/admin/dashboard");
}