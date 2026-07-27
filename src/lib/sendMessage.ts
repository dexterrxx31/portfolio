import { email } from "../data/projects";

export interface MessagePayload {
  name: string;
  email: string;
  message: string;
}

/**
 * Web3Forms access key. Get yours free at https://web3forms.com (enter your
 * email → it emails you a key). Paste it below to enable real email delivery.
 * While it's the placeholder, the form falls back to opening the mail client.
 */
const WEB3FORMS_ACCESS_KEY = "YOUR_WEB3FORMS_ACCESS_KEY";

/** True once a real Web3Forms key is set (drives the form's success copy). */
export const emailConfigured =
  !!WEB3FORMS_ACCESS_KEY && !WEB3FORMS_ACCESS_KEY.startsWith("YOUR_");

const isConfigured = emailConfigured;

/** Opens the visitor's mail client with a prefilled message (fallback). */
function mailtoFallback(payload: MessagePayload) {
  const subject = encodeURIComponent(`Portfolio message from ${payload.name}`);
  const body = encodeURIComponent(
    `${payload.message}\n\n— ${payload.name} (${payload.email})`,
  );
  window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
}

/**
 * Sends the contact-form message. Uses Web3Forms once a key is configured;
 * otherwise falls back to a prefilled mailto so the button still works.
 */
export async function sendMessage(payload: MessagePayload): Promise<void> {
  if (!isConfigured) {
    mailtoFallback(payload);
    await new Promise((r) => setTimeout(r, 400));
    return;
  }

  const res = await fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      access_key: WEB3FORMS_ACCESS_KEY,
      subject: `Portfolio message from ${payload.name}`,
      from_name: payload.name,
      name: payload.name,
      email: payload.email,
      message: payload.message,
    }),
  });

  const data = await res.json().catch(() => ({ success: false }));
  if (!res.ok || !data.success) {
    throw new Error(data.message || "Failed to send message");
  }
}
