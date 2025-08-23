import {
  Dollar01Icon,
  UserIcon,
  ViewIcon,
} from "@hugeicons/core-free-icons/index";
import { HugeiconsIcon } from "@hugeicons/react";

export default function AnalyticsStats() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-2 md:gap-3 lg:gap-5 my-5">
      <div className="bg-secondary py-5 lg:py-10 px-3 md:px-5 rounded-md space-y-1">
        <h4 className="text-xl md:text-2xl text-secondary-foreground flex justify-between items-center">
          Total Views
          <HugeiconsIcon icon={ViewIcon} />
        </h4>
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-black">12500</h2>
      </div>
      <div className="bg-secondary py-5 lg:py-10 px-3 md:px-5 rounded-md space-y-1">
        <h4 className="text-xl md:text-2xl text-secondary-foreground flex justify-between items-center">
          Total Earning
          <HugeiconsIcon icon={Dollar01Icon} />
        </h4>
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-black">$12500</h2>
      </div>
      <div className="bg-secondary py-5 lg:py-10 px-3 md:px-5 rounded-md space-y-1">
        <h4 className="text-xl md:text-2xl text-secondary-foreground flex justify-between items-center">
          Unique Viewers
          <HugeiconsIcon icon={UserIcon} />
        </h4>
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-black">8900</h2>
      </div>
    </div>
  );
}
