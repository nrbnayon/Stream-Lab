import { Button } from "@/components/ui/button";
import { Download01Icon, PlayIcon } from "@hugeicons/core-free-icons/index";
import { HugeiconsIcon } from "@hugeicons/react";
import Image from "next/image";

export default function VideoCard() {
  return (
    <div className="relative w-full max-w-48 aspect-[9/16]">
      <Image
        src="https://i.pinimg.com/736x/ac/79/dd/ac79ddd7af3b06b3ced6c1822f16fe13.jpg"
        alt="Video thumbnail"
        className="rounded-md object-cover"
        fill
      />
      <span className="absolute inset-0 flex items-center justify-center bg-black/50 text-white rounded-lg">
        <HugeiconsIcon icon={PlayIcon} size={40} className="cursor-pointer" />
      </span>
      <span className="z-10 absolute bottom-0 flex items-center justify-between w-full px-3 bg-secondary/50">
        <span className="text-sm">0:08</span>
        <Button
          size="icon"
          variant="ghost"
          className="bg-secondary/25 rounded-full"
        >
          <HugeiconsIcon icon={Download01Icon} />
        </Button>
      </span>
    </div>
  );
}
