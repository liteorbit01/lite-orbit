import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import nodemailer from "nodemailer";
import validator from "validator";
import crypto from "crypto";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json(
        { message: "Please enter an email." },
        { status: 400 }
      );
    }

    if (!validator.isEmail(email)) {
      return NextResponse.json(
        { message: "Invalid email format." },
        { status: 400 }
      );
    }

    const token = crypto.randomBytes(32).toString("hex");

    const { error } = await supabase
      .from("pending_subscribers")
      .insert([{ email, token }]);

    if (error) {
      if (error.code === "23505") {
        return NextResponse.json(
          { message: "You are already subscribed or awaiting confirmation." },
          { status: 409 }
        );
      }

      console.error("Database error:", error);
      return NextResponse.json(
        { message: "Database error." },
        { status: 500 }
      );
    }

    const confirmUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/confirm?token=${token}`;

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
      to: email,
      subject: "Confirm your Lite Orbit subscription",
      html: `
        <h2>Confirm Your Subscription</h2>
        <p>Please confirm your subscription by clicking the link below:</p>
        <a href="${confirmUrl}">${confirmUrl}</a>
        <p>If you did not request this, you can ignore this email.</p>
      `,
    });

    return NextResponse.json(
      { message: "Please check your email to confirm your subscription." },
      { status: 200 }
    );

  } catch (err) {
    console.error("Server error:", err);
    return NextResponse.json(
      { message: "Server error." },
      { status: 500 }
    );
  }
}