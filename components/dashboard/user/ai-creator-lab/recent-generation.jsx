"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useEffect, useState } from "react";
import GeneratedVideos from "./generated-videos";
import GeneratedImages from "./generated-images";
import AnalyzedScripts from "./analyzed-scripts";

export default function RecentGeneration() {
  const [activeTab, setActiveTab] = useState("video");
  const [data, setData] = useState([]);
  useEffect(() => {
    //
  }, [activeTab]);
  return (
    <Card className="my-5">
      <CardHeader>
        <CardTitle>Recent Generations</CardTitle>
        <CardDescription>Recently generated content</CardDescription>
      </CardHeader>
      <CardContent>
        {/* Tab Buttons */}
        <div className="flex gap-2 md:gap-3 *:grow">
          <Button
            variant={activeTab === "video" ? "default" : "secondary"}
            size="responsive"
            onClick={() => setActiveTab("video")}
          >
            Video
          </Button>
          <Button
            variant={activeTab === "image" ? "default" : "secondary"}
            size="responsive"
            onClick={() => setActiveTab("image")}
          >
            Image
          </Button>
          <Button
            variant={activeTab === "script" ? "default" : "secondary"}
            size="responsive"
            onClick={() => setActiveTab("script")}
          >
            Script
          </Button>
        </div>

        {/* conditionally showing tabs */}
        <div>
          {activeTab === "video" && <GeneratedVideos />}
          {activeTab === "image" && <GeneratedImages />}
          {activeTab === "script" && <AnalyzedScripts />}
        </div>
      </CardContent>
    </Card>
  );
}
