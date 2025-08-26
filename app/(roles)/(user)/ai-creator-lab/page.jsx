import GenerationCards from "@/components/dashboard/user/ai-creator-lab/generation-cards";
import RecentGeneration from "@/components/dashboard/user/ai-creator-lab/recent-generation";
import RemainingGenerations from "@/components/dashboard/user/ai-creator-lab/remaining-generations";
import UpgradePlan from "@/components/dashboard/user/ai-creator-lab/subscriptions/upgrade-plan";

export default function AICreatorLab() {
  return (
    <>
      <div className="flex gap-5 justify-between items-center flex-wrap">
        <span>
          <h2 className="text-3xl md:text-4xl font-medium">
            Bring Your Story to Life
          </h2>
          <p className="text-secondary-foreground max-w-3xl">
            CreatorLab is JusB’s AI-powered toolkit for filmmakers and
            creators—featuring image generation, video generation, and script
            analysis. Use these tools to create pitch decks, social media
            content, get detailed notes on your script or create whatever
            content you may need for your project!
          </p>
        </span>
        {/* TODO: render the button condionally */}
        <UpgradePlan />
      </div>

      <RemainingGenerations />
      <GenerationCards />
      <RecentGeneration />
    </>
  );
}
