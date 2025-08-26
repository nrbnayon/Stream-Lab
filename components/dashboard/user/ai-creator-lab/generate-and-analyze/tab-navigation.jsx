import { Button } from "@/components/ui/button";
import { capitalizeWords } from "@/lib/utils";
import {
  File02Icon,
  Image03Icon,
  Video01Icon,
} from "@hugeicons/core-free-icons/index";
import { HugeiconsIcon } from "@hugeicons/react";

export default function TabNavigation({ activeTab, handleTabChange }) {
  return (
    <div className="grid grid-cols-3 gap-2 md:gap-3 lg:gap-4">
      {["video", "image", "script"].map((tab) => (
        <Button
          key={tab}
          variant={activeTab === tab ? "default" : "secondary"}
          onClick={() => handleTabChange(tab)}
          className="px-4 py-2 md:flex-col h-auto!"
        >
          <HugeiconsIcon
            icon={
              tab === "video"
                ? Video01Icon
                : tab === "image"
                ? Image03Icon
                : File02Icon
            }
            className="size-5 md:size-6 lg:size-8"
          />
          {capitalizeWords(tab)}
        </Button>
      ))}
    </div>
  );
}
