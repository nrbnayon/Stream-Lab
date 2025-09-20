import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

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

// copies it to clipboard with fallback for insecure contexts
export async function copyToClipboard(text) {
  // Modern Clipboard API (secure contexts only)
  if (navigator.clipboard && window.isSecureContext) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (err) {
      console.error("Failed to copy with Clipboard API:", err);
      // Fall through to legacy method
    }
  }

  // Legacy fallback method for insecure contexts
  try {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";
    textArea.style.left = "-999999px";
    textArea.style.top = "-999999px";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    const successful = document.execCommand("copy");
    document.body.removeChild(textArea);

    return successful;
  } catch (err) {
    console.error("Failed to copy with fallback method:", err);
    return false;
  }
}

// share film
export async function webShareFunction({
  title = "",
  text = "Check this film out!",
  url = "",
}) {
  const shareText = `${title ? `${title} — ` : ""}${text}${
    url ? ` — ${url}` : ""
  }`.trim();

  // First, copy to clipboard using existing function
  const clipboardCopied = await copyToClipboard(shareText);

  // Then, try native Web Share API
  if (typeof navigator !== "undefined" && navigator.share) {
    try {
      await navigator.share({ title, text, url });
      return { ok: true, method: "web-share", clipboardCopied };
    } catch (err) {
      console.error("Web Share failed:", err);
      return { ok: true, method: "clipboard", clipboardCopied, error: err };
    }
  }

  // Fallback: only clipboard worked (or failed)
  return { ok: clipboardCopied, method: "clipboard", clipboardCopied };
}

// capitalize first letter
export function capitalizeWords(str) {
  return str
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export const getFullImageUrl = (imagePath) => {
  if (!imagePath) return "/default_avatar.png"; // ✅ Correct - absolute path
  if (imagePath.startsWith("http")) return imagePath;
  return `${process.env.NEXT_PUBLIC_ASSETS_BASE_URL}${imagePath}`;
};