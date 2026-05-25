"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

interface InquiryItem {
  id: string;
  title: string;
  price: number;
  quantity: number;
}

interface InquiryData {
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  apartment?: string;
  city: string;
  state: string;
  zip: string;
  items: InquiryItem[];
  subtotal: number;
}

export async function checkoutInquiryAction(data: InquiryData) {
  try {
    if (!data.email || !data.firstName || !data.lastName) {
      return { success: false, error: "Please provide your contact information." };
    }

    if (!data.address || !data.city || !data.state || !data.zip) {
      return { success: false, error: "Please provide your shipping address." };
    }

    if (!data.items || data.items.length === 0) {
      return { success: false, error: "No artworks selected." };
    }

    const itemRows = data.items
      .map(
        (item) =>
          `<tr>
            <td style="padding: 12px 0; border-bottom: 1px solid #E8E4DF; font-size: 14px; color: #111111;">${item.title}</td>
            <td style="padding: 12px 0; border-bottom: 1px solid #E8E4DF; font-size: 14px; color: #6B6762; text-align: center;">${item.quantity}</td>
            <td style="padding: 12px 0; border-bottom: 1px solid #E8E4DF; font-size: 14px; color: #111111; text-align: right;">$${(item.price * item.quantity).toLocaleString()}</td>
          </tr>`
      )
      .join("");

    const htmlEmail = `
      <div style="font-family: 'Georgia', serif; max-width: 640px; margin: 0 auto; padding: 48px 32px; background-color: #FAFAF8; color: #111111;">
        <p style="font-size: 11px; text-transform: uppercase; letter-spacing: 3px; color: #6B6762; margin-bottom: 32px;">D'Arte — Acquisition Request</p>

        <p style="font-size: 16px; line-height: 1.7; margin-bottom: 32px;">
          A new artwork acquisition inquiry has been submitted.
        </p>

        <div style="margin-bottom: 32px; padding-bottom: 24px; border-bottom: 1px solid #E8E4DF;">
          <p style="font-size: 11px; text-transform: uppercase; letter-spacing: 2px; color: #6B6762; margin-bottom: 12px;">Client</p>
          <p style="font-size: 15px; margin: 0 0 4px;">${data.firstName} ${data.lastName}</p>
          <p style="font-size: 14px; color: #6B6762; margin: 0;">${data.email}</p>
        </div>

        <div style="margin-bottom: 32px; padding-bottom: 24px; border-bottom: 1px solid #E8E4DF;">
          <p style="font-size: 11px; text-transform: uppercase; letter-spacing: 2px; color: #6B6762; margin-bottom: 12px;">Shipping Address</p>
          <p style="font-size: 14px; line-height: 1.6; margin: 0;">
            ${data.address}${data.apartment ? `, ${data.apartment}` : ""}<br>
            ${data.city}, ${data.state} ${data.zip}
          </p>
        </div>

        <div style="margin-bottom: 32px;">
          <p style="font-size: 11px; text-transform: uppercase; letter-spacing: 2px; color: #6B6762; margin-bottom: 16px;">Selected Works</p>
          <table style="width: 100%; border-collapse: collapse;">
            <thead>
              <tr>
                <th style="text-align: left; font-size: 10px; text-transform: uppercase; letter-spacing: 1.5px; color: #6B6762; padding-bottom: 8px; border-bottom: 1px solid #E8E4DF;">Title</th>
                <th style="text-align: center; font-size: 10px; text-transform: uppercase; letter-spacing: 1.5px; color: #6B6762; padding-bottom: 8px; border-bottom: 1px solid #E8E4DF;">Qty</th>
                <th style="text-align: right; font-size: 10px; text-transform: uppercase; letter-spacing: 1.5px; color: #6B6762; padding-bottom: 8px; border-bottom: 1px solid #E8E4DF;">Value</th>
              </tr>
            </thead>
            <tbody>
              ${itemRows}
            </tbody>
          </table>
        </div>

        <div style="text-align: right; padding-top: 8px; margin-bottom: 32px;">
          <span style="font-size: 11px; text-transform: uppercase; letter-spacing: 2px; color: #6B6762;">Subtotal</span>
          <p style="font-size: 22px; font-family: 'Georgia', serif; margin: 4px 0 0;">$${data.subtotal.toLocaleString()}</p>
        </div>

        <p style="font-size: 12px; color: #9A9590; line-height: 1.6; margin-top: 40px; padding-top: 24px; border-top: 1px solid #E8E4DF;">
          This inquiry was submitted through the D'Arte gallery. Please respond to the client directly at ${data.email}.
        </p>
      </div>
    `;

    const textEmail = `
D'ARTE — New Artwork Acquisition Request

Client: ${data.firstName} ${data.lastName}
Email: ${data.email}

Shipping Address:
${data.address}${data.apartment ? `, ${data.apartment}` : ""}
${data.city}, ${data.state} ${data.zip}

Selected Works:
${data.items.map((item) => `  ${item.title} × ${item.quantity} — $${(item.price * item.quantity).toLocaleString()}`).join("\n")}

Subtotal: $${data.subtotal.toLocaleString()}
    `.trim();

    await resend.emails.send({
      from: "D'Arte Gallery <onboarding@resend.dev>",
      to: "dakshprajapat71726@gmail.com",
      replyTo: data.email,
      subject: "New Artwork Acquisition Request",
      html: htmlEmail,
      text: textEmail,
    });

    return { success: true, message: "Your inquiry has been received." };
  } catch (error) {
    console.error("Inquiry error:", error);
    return { success: false, error: "Failed to submit inquiry. Please try again." };
  }
}
