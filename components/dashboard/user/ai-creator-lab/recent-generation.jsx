"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import GeneratedVideos from "./generated-videos";
import GeneratedImages from "./generated-images";
import AnalyzedScripts from "./analyzed-scripts";

export default function RecentGeneration({
  activeTab = "video",
  recentGenerations = {},
  isLoading = false,
}) {
  const videos = recentGenerations.video ?? [];
  const images = recentGenerations.image ?? [];
  const scripts = recentGenerations.script ?? [];

  const renderContent = () => {
    if (isLoading) {
      return (
        <p className="text-center text-secondary-foreground my-5">
          Loading your latest creations...
        </p>
      );
    }

    if (activeTab === "video") {
      return <GeneratedVideos videos={videos} />;
    }

    if (activeTab === "image") {
      return <GeneratedImages images={images} />;
    }

    return <AnalyzedScripts scripts={scripts} />;
  };

  return (
    <Card className="my-5">
      <CardHeader>
        <CardTitle>Recent Generations</CardTitle>
        <CardDescription>Recently generated content</CardDescription>
      </CardHeader>
      <CardContent>
        {/* conditionally showing tabs */}
        <div>{renderContent()}</div>
      </CardContent>
    </Card>
  );
}
