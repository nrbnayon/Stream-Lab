// components/dashboard/user/ai-creator-lab/recent-generation.jsx
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
import { Loader2 } from "lucide-react";

export default function RecentGeneration({
  activeTab = "video",
  recentGenerations = {},
  isLoading = false,
  showAllTypes = false,
}) {
  // If showAllTypes is true, display all generations without filtering
  // Otherwise, filter by activeTab
  const videos = showAllTypes
    ? Array.isArray(recentGenerations)
      ? recentGenerations.filter((gen) => gen.task_type === "video")
      : recentGenerations.video ?? []
    : recentGenerations.video ?? [];

  const images = showAllTypes
    ? Array.isArray(recentGenerations)
      ? recentGenerations.filter((gen) => gen.task_type === "image")
      : recentGenerations.image ?? []
    : recentGenerations.image ?? [];

  const scripts = showAllTypes
    ? Array.isArray(recentGenerations)
      ? recentGenerations.filter((gen) => gen.task_type === "script")
      : recentGenerations.script ?? []
    : recentGenerations.script ?? [];

  const renderContent = () => {
    if (isLoading) {
      return (
        <p className="text-center text-secondary-foreground my-5 flex flex-col justify-between items-center">
          <Loader2 className="w-8 h-8 animate-spin mb-4" />
          Loading your latest creations...
        </p>
      );
    }

    if (showAllTypes) {
      const hasAnyContent =
        videos.length > 0 || images.length > 0 || scripts.length > 0;

      if (!hasAnyContent) {
        return (
          <p className="text-destructive text-center my-5">
            You haven&apos;t generated any content yet
          </p>
        );
      }

      return (
        <div className="space-y-8">
          {videos.length > 0 && (
            <div>
              <h3 className="text-xl font-semibold mb-4">Videos</h3>
              <GeneratedVideos videos={videos} />
            </div>
          )}
          {images.length > 0 && (
            <div>
              <h3 className="text-xl font-semibold mb-4">Images</h3>
              <GeneratedImages images={images} />
            </div>
          )}
          {scripts.length > 0 && (
            <div>
              <h3 className="text-xl font-semibold mb-4">Scripts</h3>
              <AnalyzedScripts scripts={scripts} />
            </div>
          )}
        </div>
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
        <div>{renderContent()}</div>
      </CardContent>
    </Card>
  );
}
