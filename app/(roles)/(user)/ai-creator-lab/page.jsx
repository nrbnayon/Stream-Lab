import GenerationCards from "@/components/dashboard/user/ai-creator-lab/generation-cards";
import RecentGeneration from "@/components/dashboard/user/ai-creator-lab/recent-generation";
import RemainingGenerations from "@/components/dashboard/user/ai-creator-lab/remaining-generations";
import { Button } from "@/components/ui/button";
import { Crown03Icon } from "@hugeicons/core-free-icons/index";
import { HugeiconsIcon } from "@hugeicons/react";
import Link from "next/link";

export default function AICreatorLab() {
  return (
    <>
      <div className="flex gap-5 justify-between items-center">
        <span>
          <h2 className="text-4xl font-medium">AI Creator Lab</h2>
          <p className="text-secondary-foreground">
            Create amazing contant with AI Assistance
          </p>
        </span>
        {/* TODO: render the button condionally */}
        <Link href="/ai-creator-lab/upgrade-plan">
          <Button>
            <HugeiconsIcon icon={Crown03Icon} />
            Upgrade Plan
          </Button>
        </Link>
      </div>

      <RemainingGenerations />
      <GenerationCards />
      <RecentGeneration />
    </>
  );
}
