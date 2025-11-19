import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Download01Icon } from "@hugeicons/core-free-icons/index";
import { HugeiconsIcon } from "@hugeicons/react";
import Image from "next/image";

const FALLBACK_IMAGE =
  "https://i.pinimg.com/736x/f8/18/e5/f818e5c1b495419f5ff2516c4dfd03a0.jpg";

export default function ImageCard({ image }) {
  const [open, setOpen] = useState(false);

  const thumbnail = image?.thumbnail || image?.output_url || FALLBACK_IMAGE;
  const downloadUrl =
    image?.download_url || image?.output_url || image?.file_url || null;
  const prompt = image?.prompt || "Generated image";

  return (
    <>
      <button
        type="button"
        className="relative w-full max-w-52 aspect-[1/1]"
        onClick={() => setOpen(true)}
      >
        <Image
          src={thumbnail}
          alt={prompt}
          className="rounded-md object-cover"
          fill
        />
        <span className="absolute inset-0 rounded-md ring-1 ring-transparent focus-visible:ring-primary" />
        <span className="absolute top-0 right-0 p-2">
          {downloadUrl ? (
            <Button
              size="icon"
              variant="ghost"
              className="bg-secondary/50 rounded-full"
              asChild
            >
              <a
                href={downloadUrl}
                target="_blank"
                rel="noopener noreferrer"
                download
              >
                <HugeiconsIcon icon={Download01Icon} />
              </a>
            </Button>
          ) : (
            <Button
              size="icon"
              variant="ghost"
              className="bg-secondary/50 rounded-full"
              disabled
            >
              <HugeiconsIcon icon={Download01Icon} />
            </Button>
          )}
        </span>
      </button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-xl">
          <DialogHeader>
            <DialogTitle>{prompt}</DialogTitle>
          </DialogHeader>
          <div className="relative aspect-square">
            <Image
              src={thumbnail}
              alt={prompt}
              className="rounded-md object-contain"
              fill
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
