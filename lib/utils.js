import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// convert minutes to hour
export function minutesToHours(minutes) {
  if (minutes < 60) {
    return `${minutes}m`;
  }

  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;

  return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
}

// clip long text and add ...
export function truncateText(text, maxLength = 70) {
  if (!text) return "";
  return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
}

// share movie link
export async function webShare({ title, text = "Check this movie out!", url }) {
  // Try native Web Share API
  if (typeof navigator !== "undefined" && navigator.share) {
    try {
      await navigator.share({ title, text, url });
      return { ok: true, method: "web-share" };
    } catch (err) {
      // ignore and fallback to clipboard
    }
  }

  // Clipboard fallback
  try {
    await navigator.clipboard.writeText(
      `${title ? `${title} — ` : ""}${text} — ${shareUrl}`.trim()
    );
    return { ok: true, method: "clipboard" };
  } catch (error) {
    return { ok: false, method: "clipboard", error };
  }
}
