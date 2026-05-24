"use server";

import prisma from "@/lib/prisma";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function subscribeAction(formData: FormData) {
  try {
    const email = formData.get("email")?.toString();
    const honeypot = formData.get("website")?.toString(); // Spam protection

    // Honeypot check
    if (honeypot) {
      return { success: false, error: "Spam detected." };
    }

    if (!email || !email.includes("@")) {
      return { success: false, error: "Please provide a valid email address." };
    }

    // Check if subscriber already exists
    const existingSubscriber = await prisma.subscriber.findUnique({
      where: { email },
    });

    if (existingSubscriber) {
      return { success: true, message: "You are already subscribed." };
    }

    // Save to database
    await prisma.subscriber.create({
      data: { email },
    });

    // Optionally send welcome email via Resend if API key is configured
    if (process.env.RESEND_API_KEY) {
      await resend.emails.send({
        from: "D'ARTE <noreply@resend.dev>", // Replace with verified domain in production
        to: email,
        subject: "Welcome to the Studio Notes",
        html: `
          <div style="font-family: sans-serif; padding: 40px; color: #111111; background-color: #F6F3EE; max-width: 600px; margin: 0 auto;">
            <p style="font-size: 14px; text-transform: uppercase; letter-spacing: 2px; color: #6B6762; margin-bottom: 24px;">Studio Notes</p>
            <p style="font-size: 16px; line-height: 1.6; margin-bottom: 24px;">
              Thank you for subscribing. You will occasionally receive updates on new works, process fragments, and quiet notes directly from the studio.
            </p>
            <p style="font-size: 16px; line-height: 1.6;">
              Best,<br>Daksh Prajapati
            </p>
          </div>
        `,
      });
    }

    return { success: true, message: "Subscribed successfully." };
  } catch (error) {
    console.error("Subscription error:", error);
    return { success: false, error: "Failed to subscribe. Please try again later." };
  }
}
