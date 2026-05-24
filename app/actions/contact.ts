"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function contactAction(formData: FormData) {
  try {
    const name = formData.get("name")?.toString();
    const email = formData.get("email")?.toString();
    const message = formData.get("message")?.toString();
    const honeypot = formData.get("company")?.toString(); // Spam protection

    // Honeypot check
    if (honeypot) {
      return { success: false, error: "Spam detected." };
    }

    if (!name || !email || !message) {
      return { success: false, error: "Please fill out all required fields." };
    }

    if (!process.env.RESEND_API_KEY) {
      // For development when API key is missing
      console.log("Contact submission:", { name, email, message });
      return { success: true, message: "Message sent successfully." };
    }

    await resend.emails.send({
  from: "onboarding@resend.dev",
  to: "arrtholic@gmail.com",
  replyTo: email,
  subject: `New Inquiry from ${name}`,
  text: `
Name: ${name}
Email: ${email}

Message:
${message}
  `,
});

    return { success: true, message: "Your inquiry has been sent." };
  } catch (error) {
    console.error("Contact error:", error);
    return { success: false, error: "Failed to send message. Please try again later." };
  }
}
