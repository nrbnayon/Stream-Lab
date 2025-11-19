"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Cancel01Icon,
  SentIcon,
  Upload01Icon,
} from "@hugeicons/core-free-icons/index";
import { HugeiconsIcon } from "@hugeicons/react";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { useGenerateAiContentMutation } from "@/redux/store/api/aiCreatorApi";

export default function AiInput({ activeTab = "video", onGenerationComplete }) {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [input, setInput] = useState("");
  const [generateAiContent, { isLoading }] = useGenerateAiContentMutation();

  const currentTab = activeTab || "video";

  const canSubmit = useMemo(() => {
    if (currentTab === "script") {
      return Boolean(input.trim()) || Boolean(uploadedFile);
    }
    return Boolean(input.trim());
  }, [currentTab, input, uploadedFile]);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFile(file);
    }
  };

  const resetInputs = () => {
    setInput("");
    setUploadedFile(null);
  };

  const handleGenerate = async () => {
    if (!canSubmit || isLoading) return;

    try {
      const payload = {
        taskType: currentTab,
        inputData: input.trim(),
        file: currentTab === "script" ? uploadedFile : null,
      };

      const response = await generateAiContent(payload).unwrap();

      console.log("Generation response:", response);

      toast.success(
        response?.message ||
          `Your ${currentTab === "script" ? "analysis" : "generation"} is ready`
      );

      const body = response?.data ?? response ?? {};

      const normalizedResult = {
        id: body?.id ?? `${currentTab}-${Date.now()}`,
        task_type: currentTab,
        prompt: payload.inputData || uploadedFile?.name || "Uploaded file",
        file_name: body?.file_name ?? uploadedFile?.name,
        analysis_text:
          body?.analysis_text ?? body?.summary ?? body?.description ?? "",
        output_url:
          body?.output_url ??
          body?.url ??
          body?.result_url ??
          body?.file_url ??
          body?.image_url ??
          body?.video_url ??
          "",
        thumbnail:
          body?.thumbnail ??
          body?.preview ??
          body?.cover_image ??
          body?.image_url ??
          body?.output_url ??
          "",
        summary: body?.summary ?? body?.description ?? response?.message ?? "",
        metadata: body?.metadata ?? body?.meta ?? {},
        status: body?.status ?? "completed",
        created_at: body?.created_at ?? new Date().toISOString(),
        raw: body,
      };

      console.log("Normalized result:", normalizedResult);

      onGenerationComplete?.(normalizedResult);
      resetInputs();
    } catch (error) {
      console.error("Generation error:", error);
      toast.error(
        error?.data?.message ||
          error?.message ||
          "Unable to process your request. Please try again."
      );
    }
  };

  // Remove files when leave from script tab
  useEffect(() => {
    if (currentTab !== "script") {
      setUploadedFile(null);
    }
  }, [currentTab]);

  return (
    <div className="my-5 relative">
      <Textarea
        placeholder={`Describe the ${currentTab} you want to ${
          currentTab === "script" ? "analyze" : "create"
        }...`}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="min-h-52 overflow-y-auto relative custom-scrollbar"
        disabled={isLoading}
      />

      <div className="grid md:grid-cols-2 mt-2">
        {/* Preview section */}
        <div>
          {uploadedFile ? (
            <p className="relative inline-block">
              <span className="text-xs bg-secondary text-secondary-foreground p-2 rounded-sm">
                📎 {uploadedFile.name}
              </span>

              <HugeiconsIcon
                icon={Cancel01Icon}
                size={15}
                onClick={() => setUploadedFile(null)}
                className="absolute -right-2 -top-1 text-red-500 bg-red-100/25 rounded-full cursor-pointer"
              />
            </p>
          ) : null}
        </div>

        {/* Upload file and generate button */}
        <div className="flex gap-3 justify-end">
          {!uploadedFile && currentTab === "script" ? (
            <Button variant="secondary" className="p-0">
              <Label
                htmlFor="file-upload"
                className="cursor-pointer px-4 py-2 w-full h-full"
              >
                <HugeiconsIcon icon={Upload01Icon} />
                <span>Upload Script</span>
              </Label>
              <Input
                type="file"
                id="file-upload"
                onChange={handleFileChange}
                accept=".pdf,.doc,.docx,.txt"
                className="hidden"
              />
            </Button>
          ) : null}
          <Button onClick={handleGenerate} disabled={!canSubmit || isLoading}>
            <HugeiconsIcon icon={SentIcon} />
            {isLoading
              ? currentTab === "script"
                ? "Analyzing..."
                : "Generating..."
              : currentTab === "script"
              ? "Analyze"
              : "Generate"}
          </Button>
        </div>
      </div>
    </div>
  );
}
