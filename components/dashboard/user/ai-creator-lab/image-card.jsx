import { Button } from "@/components/ui/button";
import { Download01Icon, PlayIcon } from "@hugeicons/core-free-icons/index";
import { HugeiconsIcon } from "@hugeicons/react";
import Image from "next/image";
export default function ImageCard() {
  return (
    <div className="relative w-full max-w-52 aspect-[1/1]">
      <Image
        src="https://i.pinimg.com/736x/f8/18/e5/f818e5c1b495419f5ff2516c4dfd03a0.jpg"
        alt="Video thumbnail"
        className="rounded-md object-cover"
        fill
      />
      <span className="absolute top-0 right-0 p-2">
        <Button
          size="icon"
          variant="ghost"
          className="bg-secondary/50 rounded-full"
        >
          <HugeiconsIcon icon={Download01Icon} />
        </Button>
      </span>
    </div>
  );
}
