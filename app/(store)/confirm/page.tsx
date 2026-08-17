import { supabase } from "@/lib/supabase";
import nodemailer from "nodemailer";

interface ConfirmPageProps {
  searchParams: Promise<{ token?: string }>;
}

export default async function ConfirmPage({ searchParams }: ConfirmPageProps) {
  const params = await searchParams;
  const token = params.token;

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Invalid confirmation link.
      </div>
    );
  }

 // Find pending subscriber
const { data, error } = await supabase
  .from("pending_subscribers")
  .select("*")
  .eq("token", token)
  .single();

if (error || !data) {
  return (
    <main className="min-h-screen bg-[#F5F1EB] flex items-center justify-center text-[#2F2F2F]">
      <div className="text-center px-6 max-w-md">

        <h1 className="text-4xl md:text-5xl font-light tracking-[0.08em] mb-6">
          Invalid Link
        </h1>

        <p className="text-lg text-[#6B6B6B] mb-10">
          This confirmation link is invalid or has already been used.
          Please subscribe again to receive a new confirmation email.
        </p>

        <a
          href="/"
          className="inline-block px-8 py-3 border border-[#2F2F2F] text-sm tracking-wide hover:bg-[#2F2F2F] hover:text-white transition-all duration-300"
        >
          Return Home
        </a>

      </div>
    </main>
  );
}

// 🔐 TOKEN EXPIRATION CHECK (24 hours)
const createdAt = new Date(data.created_at);
const now = new Date();

const diffInHours =
  (now.getTime() - createdAt.getTime()) / (1000 * 60 * 60);

if (diffInHours > 24) {
  // Delete expired token
  await supabase
    .from("pending_subscribers")
    .delete()
    .eq("token", token);

  return (
  <main className="min-h-screen bg-[#F5F1EB] flex items-center justify-center text-[#2F2F2F]">
    <div className="text-center px-6 max-w-md">

      <h1 className="text-4xl md:text-5xl font-light tracking-[0.08em] mb-6">
        Link Expired
      </h1>

      <p className="text-lg text-[#6B6B6B] mb-10">
        This confirmation link has expired.
        Please subscribe again to receive a new confirmation email.
      </p>

      <a
        href="/"
        className="inline-block px-8 py-3 border border-[#2F2F2F] text-sm tracking-wide hover:bg-[#2F2F2F] hover:text-white transition-all duration-300"
      >
        Return Home
      </a>

    </div>
  </main>
);
}
  // Insert into subscribers table
  await supabase.from("subscribers").insert([{ email: data.email }]);

  // Delete from pending table
  await supabase
    .from("pending_subscribers")
    .delete()
    .eq("token", token);
const transporter = nodemailer.createTransport({
  host: "smtp.zohocloud.ca",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  authMethod: "LOGIN",
  tls: {
    rejectUnauthorized: false,
  },
});

await transporter.sendMail({
  from: `"Lite Orbit" <${process.env.EMAIL_USER}>`,
  to: process.env.EMAIL_USER,
  subject: "New Confirmed Subscriber",
  html: `<h2>New Confirmed Subscriber</h2>
  <p>Email: <strong>${data.email}</strong></p>`,
});

  return (
    <main className="min-h-screen bg-[#F5F1EB] flex items-center justify-center text-[#2F2F2F]">
      <div className="text-center px-6">
        <h1 className="text-4xl md:text-5xl font-light tracking-[0.08em] mb-6">
          Subscription Confirmed
        </h1>

        <p className="text-lg text-[#6B6B6B] mb-10 max-w-md mx-auto">
          Thank you for confirming your subscription.
          Welcome to Lite Orbit.
        </p>

        <a
          href="/"
          className="inline-block px-8 py-3 border border-[#2F2F2F] text-sm tracking-wide hover:bg-[#2F2F2F] hover:text-white transition-all duration-300"
        >
          Return Home
        </a>
      </div>
    </main>
  );
}