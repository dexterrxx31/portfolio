import { email } from "../data/projects";

export interface MessagePayload {
  name: string;
  email: string;
  message: string;
}

/**
 * Frontend-only for now: opens the visitor's mail client with a prefilled
 * message so the button actually works today.
 *
 * TODO (backend): replace the body of this function with a real POST, e.g.
 *
 *   const res = await fetch("https://formspree.io/f/XXXX", {
 *     method: "POST",
 *     headers: { "Content-Type": "application/json", Accept: "application/json" },
 *     body: JSON.stringify(payload),
 *   });
 *   if (!res.ok) throw new Error("send failed");
 *
 * ...or a Resend / AWS SES / custom API endpoint. The form UI already handles
 * the returned promise (loading / success / error), so this is a one-function swap.
 */
export async function sendMessage(payload: MessagePayload): Promise<void> {
  const subject = encodeURIComponent(`Portfolio message from ${payload.name}`);
  const body = encodeURIComponent(
    `${payload.message}\n\n— ${payload.name} (${payload.email})`,
  );
  window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;

  // simulate async so the UI shows a brief sending state
  await new Promise((r) => setTimeout(r, 400));
}
