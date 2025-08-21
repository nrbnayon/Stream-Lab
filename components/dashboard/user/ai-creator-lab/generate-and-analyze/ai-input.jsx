"use-client";
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
import { useEffect, useState } from "react";

export default function AiInput({ activeTab }) {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [input, setInput] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadedFile(file);
    }
  };

  // Remove files when leave from script tab
  useEffect(() => {
    activeTab !== "script" && setUploadedFile(null);
  }, [activeTab]);

  return (
    <div className="my-5 relative">
      <Textarea
        placeholder={`Describe the ${activeTab} you want to ${
          activeTab === "script" ? "analyze" : "create"
        }...`}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="min-h-52 overflow-y-auto relative custom-scrollbar"
      />

      <div className="grid md:grid-cols-2 mt-2">
        {/* Preview section */}
        <div className="">
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
          {!uploadedFile && activeTab === "script" ? (
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
          <Button disabled={!input}>
            <HugeiconsIcon icon={SentIcon} />
            {activeTab === "script" ? "Analyze" : "Generate"}
          </Button>
        </div>
      </div>
    </div>
  );
}
