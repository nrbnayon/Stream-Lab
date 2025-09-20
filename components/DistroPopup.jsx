"use client";
import { useState, useRef, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogOverlay,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  QrCode01Icon,
  Copy01Icon,
  Download01Icon,
  UserIcon,
  LockIcon,
} from "@hugeicons/core-free-icons/index";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import CustomIcon from "./ui/CustomIcon";
import Link from "next/link";
import Image from "next/image";

export default function DistroPopup({
  movieId,
  movieTitle,
  movie_pic,
  distributionUrl,
  className,
  isUserLogin = true,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [downloaded, setDownloaded] = useState(false);
  const [qrDataUrl, setQrDataUrl] = useState("");

  // Generate QR code when dialog opens (only if user is logged in)
  useEffect(() => {
    if (isOpen && !qrDataUrl && isUserLogin) {
      generateQRCode();
    }
  }, [isOpen, qrDataUrl, isUserLogin]);

  const generateQRCode = async () => {
    try {
      // Try to import qrcode library
      const QRCode = await import("qrcode");

      const canvas = document.createElement("canvas");
      canvas.width = 200;
      canvas.height = 200;

      await QRCode.toCanvas(canvas, distributionUrl, {
        width: 200,
        margin: 2,
        color: {
          dark: "#000000",
          light: "#ffffff",
        },
        errorCorrectionLevel: "M",
      });

      const dataUrl = canvas.toDataURL("image/png");
      setQrDataUrl(dataUrl);
    } catch (error) {
      console.error("QRCode library not found, creating fallback:", error);
      // Fallback: Create a simple placeholder
      createPlaceholderQR();
    }
  };

  const createPlaceholderQR = () => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = 200;
    canvas.height = 200;

    // Create a simple pattern as fallback
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, 200, 200);

    ctx.fillStyle = "#000000";
    // Create a simple grid pattern
    for (let i = 0; i < 20; i++) {
      for (let j = 0; j < 20; j++) {
        if ((i + j) % 2 === 0) {
          ctx.fillRect(i * 10, j * 10, 10, 10);
        }
      }
    }

    // Add border
    ctx.strokeStyle = "#000000";
    ctx.lineWidth = 2;
    ctx.strokeRect(0, 0, 200, 200);

    // Add text in center
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 14px Arial";
    ctx.textAlign = "center";
    ctx.fillText("QR CODE", 100, 95);
    ctx.fillText("PLACEHOLDER", 100, 115);

    const dataUrl = canvas.toDataURL("image/png");
    setQrDataUrl(dataUrl);
  };

  const handleCopyLink = async () => {
    try {
      // Check if clipboard API is available
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(distributionUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } else {
        // Fallback for older browsers or insecure contexts
        copyToClipboardFallback(distributionUrl);
      }
    } catch (err) {
      console.error("Failed to copy using clipboard API: ", err);
      // Use fallback method
      copyToClipboardFallback(distributionUrl);
    }
  };

  const copyToClipboardFallback = (text) => {
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
      if (successful) {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } else {
        console.error("Copy command was unsuccessful");
      }

      document.body.removeChild(textArea);
    } catch (fallbackErr) {
      console.error("Fallback copy failed:", fallbackErr);
    }
  };

  const handleDownloadQR = () => {
    if (qrDataUrl) {
      try {
        const link = document.createElement("a");
        const safeFilename = movieTitle
          .replace(/[^a-zA-Z0-9\s]/g, "_")
          .replace(/\s+/g, "_");
        link.download = `${safeFilename}_QR_Code.png`;
        link.href = qrDataUrl;

        // Append to body, click, and remove
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        setDownloaded(true);
        setTimeout(() => setDownloaded(false), 2000);
      } catch (error) {
        console.error("Download failed:", error);
      }
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          size="icon"
          variant="ghost"
          className={cn("bg-transparent hover:bg-primary/10", className)}
        >
          {/* <HugeiconsIcon icon={Share01Icon} /> */}
          <CustomIcon width={24} height={24} fill="#fff" />
        </Button>
      </DialogTrigger>
      {/* <DialogOverlay className="bg-black/10 backdrop-blur-xs" /> */}
      <DialogContent className="sm:max-w-md backdrop-blur-md bg-white border border-white/20 text-black">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {isUserLogin ? (
              <HugeiconsIcon icon={QrCode01Icon} />
            ) : (
              <HugeiconsIcon icon={LockIcon} />
            )}
            {isUserLogin ? `Distribute "${movieTitle}"` : `"${movieTitle}"`}
          </DialogTitle>
          <DialogDescription asChild>
            <div
              className={cn(
                "border rounded-lg p-3 text-center backdrop-blur-sm",
                isUserLogin
                  ? "bg-green-50 border-green-200"
                  : "bg-blue-50 border-blue-200"
              )}
            >
              <span
                className={cn(
                  "font-medium",
                  isUserLogin ? "text-green-800" : "text-blue-800"
                )}
              >
                {isUserLogin
                  ? "Share this film and earn 30% commission when someone purchases from your link."
                  : "Login to share this film and earn 30% commission on purchases!"}
              </span>
            </div>
          </DialogDescription>
        </DialogHeader>

        {isUserLogin ? (
          // Logged in user view - show sharing functionality
          <div className="space-y-4">
            {/* QR Code Display */}
            <div className="flex justify-center p-4 bg-white rounded-lg border shadow-sm">
              {qrDataUrl ? (
                <img
                  src={qrDataUrl}
                  alt="QR Code for movie distribution"
                  className="w-[200px] h-[200px]"
                />
              ) : (
                <div className="w-[200px] h-[200px] bg-gray-100 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <HugeiconsIcon
                      icon={QrCode01Icon}
                      size={48}
                      className="mx-auto mb-2 text-gray-400"
                    />
                    <p className="text-sm text-gray-500">
                      Generating QR Code...
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Distribution Link */}
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Your Distribution Link:
              </label>
              <div className="flex items-center gap-2">
                <input
                  readOnly
                  value={distributionUrl}
                  className="flex-1 px-3 py-2 bg-gray-50/80 backdrop-blur-sm border rounded-md text-sm"
                />
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleCopyLink}
                  className="whitespace-nowrap bg-white/80 backdrop-blur-sm"
                >
                  {copied ? (
                    <Check size={16} className="text-green-600" />
                  ) : (
                    <HugeiconsIcon icon={Copy01Icon} size={16} />
                  )}
                  {copied ? "Copied!" : "Copy"}
                </Button>
              </div>
            </div>
          </div>
        ) : (
          // Not logged in view - show movie details and login prompt
          <div className="space-y-4">
            {/* Movie Details */}
            <div className="flex justify-center p-6 bg-gray-50 rounded-lg border">
              <div className="text-center">
                <Image
                  src={movie_pic}
                  alt={movieTitle}
                  width={200}
                  height={60}
                  className="w-full rounded-md h-40 object-cover"
                />
                <h3 className="text-lg font-semibold mb-2">{movieTitle}</h3>
                <p className="text-gray-600 mb-4">
                  Login to unlock sharing features and start earning
                  commissions!
                </p>
                <div className="bg-white rounded-md p-3 border">
                  <p className="text-sm text-gray-700">
                    <strong>Benefits of sharing:</strong>
                  </p>
                  <ul className="text-sm text-gray-600 mt-2 space-y-1">
                    <li>• Earn 30% commission on every purchase</li>
                    <li>• Get your personalized QR code</li>
                    {/* <li>• Track your referrals and earnings</li> */}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        <DialogFooter className="flex gap-2 sm:gap-2">
          {isUserLogin ? (
            // Logged in user buttons
            <>
              <Button
                variant="outline"
                onClick={handleDownloadQR}
                className="flex-1 bg-white/80 backdrop-blur-sm"
                disabled={!qrDataUrl}
              >
                {downloaded ? (
                  <Check size={16} className="text-green-600" />
                ) : (
                  <HugeiconsIcon icon={Download01Icon} size={16} />
                )}
                {downloaded ? "Downloaded!" : "Download QR"}
              </Button>
              <Button onClick={handleCopyLink} className="flex-1">
                {copied ? (
                  <Check size={16} className="mr-1" />
                ) : (
                  <HugeiconsIcon icon={Copy01Icon} size={16} className="mr-1" />
                )}
                {copied ? "Link Copied!" : "Copy Link"}
              </Button>
            </>
          ) : (
            // Not logged in user buttons
            <>
              <Button
                variant="outline"
                onClick={() => setIsOpen(false)}
                className="flex-1"
              >
                Close
              </Button>
              <Button asChild className="flex-1">
                <Link href="/login">
                  <HugeiconsIcon icon={UserIcon} size={16} className="mr-1" />
                  Login to Share
                </Link>
              </Button>
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
