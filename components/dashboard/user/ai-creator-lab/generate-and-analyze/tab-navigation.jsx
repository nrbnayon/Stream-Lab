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
    <div className="grid lg:grid-cols-3 gap-4 border-b">
      {["video", "image", "script"].map((tab) => (
        <Button
          key={tab}
          variant={activeTab === tab ? "default" : "secondary"}
          onClick={() => handleTabChange(tab)}
          className="px-4 py-2 flex-col"
        >
          <HugeiconsIcon
            size={40}
            icon={
              tab === "video"
                ? Video01Icon
                : tab === "image"
                ? Image03Icon
                : File02Icon
            }
          />
          {capitalizeWords(tab)}
        </Button>
      ))}
    </div>
  );
}
