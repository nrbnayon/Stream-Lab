import {
  DropzoneContent,
  Dropzone,
  DropzoneEmptyState,
} from "@/components/ui/dropzone";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { toast } from "sonner";

export default function UploadContent({
  label,
  title,
  content,
  setContent,
  maxSize,
  accept = { "video/*": [] },
  disabled = false,
  description,
}) {
  const handleDrop = (acceptedFiles) => {
    if (disabled) return;
    
    if (acceptedFiles && acceptedFiles.length > 0) {
      const file = acceptedFiles[0];

      // Validate file size
      const maxSizeBytes = maxSize * 1024 * 1024;
      if (file.size > maxSizeBytes) {
        toast.error(`File size must be less than ${maxSize}MB`);
        return;
      }

      // Validate file type
      const acceptedTypes = Object.keys(accept);
      const fileType = file.type;
      const isAccepted = acceptedTypes.some((type) => {
        if (type === "image/*") return fileType.startsWith("image/");
        if (type === "video/*") return fileType.startsWith("video/");
        return fileType === type;
      });

      if (!isAccepted) {
        const typeDescription = acceptedTypes.includes("image/*")
          ? "image"
          : acceptedTypes.includes("video/*")
          ? "video"
          : "file";
        toast.error(`Please select a valid ${typeDescription} file`);
        return;
      }

      // console.log("File selected:", {
      //   name: file.name,
      //   size: file.size,
      //   type: file.type,
      //   lastModified: file.lastModified,
      // });

      setContent(file);
      toast.success(`${file.name} uploaded successfully`);
    }
  };

  const handleError = (error) => {
    console.error("Upload error:", error);
    if (error.code === "file-too-large") {
      toast.error(`File size must be less than ${maxSize}MB`);
    } else if (error.code === "file-invalid-type") {
      const typeDescription = Object.keys(accept).includes("image/*")
        ? "image"
        : Object.keys(accept).includes("video/*")
        ? "video"
        : "file";
      toast.error(`Please select a valid ${typeDescription} file`);
    } else {
      toast.error("Upload failed. Please try again.");
    }
  };

  const removeFile = () => {
    if (disabled) return;
    setContent(null);
    toast.success("File removed");
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return (
    <div className="space-y-2">
      <Label>{label}</Label>

      {/* File Preview */}
      {content && (
        <div className="p-3 border rounded-lg bg-gray-50 flex items-center justify-between">
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-black truncate">
              {content.name}
            </p>
            <p className="text-xs text-gray-500">
              {formatFileSize(content.size)} • {content.type}
            </p>
          </div>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={removeFile}
            disabled={disabled}
            className="ml-2 h-8 w-8 p-0 hover:bg-primary/70"
          >
            <X className="h-4 w-4 text-red-500" />
          </Button>
        </div>
      )}

      {/* Upload Area */}
      <Dropzone
        accept={accept}
        maxSize={maxSize * 1024 * 1024}
        onDrop={handleDrop}
        onError={handleError}
        multiple={false}
        disabled={disabled}
        className="min-h-[120px]"
      >
        <DropzoneEmptyState
          title={content ? "Replace file" : title}
          description={description || `Max size: ${maxSize}MB`}
        />
        <DropzoneContent />
      </Dropzone>
    </div>
  );
}
