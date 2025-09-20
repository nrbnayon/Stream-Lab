// components/dashboard/user/my-titles/edit-film/film-edit-dialog.jsx
"use client";
import InputField from "@/components/input-field";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";
import {
  useGetFilmDetailsQuery,
  useEditFilmMutation,
} from "@/redux/store/api/filmsApi";
import { toast } from "sonner";
import { X, Upload, Image as ImageIcon } from "lucide-react";

export default function FilmEditDialog({ trigger, filmID }) {
  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    logline: "",
  });
  const [isOpen, setIsOpen] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  const { data: filmDetails, isLoading: isLoadingFilm } =
    useGetFilmDetailsQuery(filmID, {
      skip: !isOpen,
    });

  const [editFilm, { isLoading: isEditing }] = useEditFilmMutation();

  useEffect(() => {
    if (filmDetails?.film_details) {
      setFormData({
        title: filmDetails.film_details.title || "",
        logline: filmDetails.film_details.logline || "",
      });
      // Set existing thumbnail preview if available
      if (filmDetails.film_details.thumbnail) {
        setThumbnailPreview(filmDetails.film_details.thumbnail);
      }
    }
  }, [filmDetails]);

  // Reset form when dialog closes
  useEffect(() => {
    if (!isOpen) {
      setThumbnail(null);
      setThumbnailPreview(null);
      setFormData({ title: "", logline: "" });
    }
  }, [isOpen]);

  const handleEditFilm = async (e) => {
    e.preventDefault();

    const editFormData = new FormData();
    editFormData.append("film_id", filmID);
    editFormData.append("title", formData.title);
    editFormData.append("logline", formData.logline);

    // Only append thumbnail if a new file is selected
    if (thumbnail && thumbnail instanceof File) {
      editFormData.append("thumbnail", thumbnail);
    }

    try {
      await editFilm(editFormData).unwrap();
      toast.success("Film updated successfully!");
      setIsOpen(false);
    } catch (error) {
      console.error("Error updating film:", error);
      toast.error("Failed to update film. Please try again.");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileSelect = (file) => {
    if (file && file.type.startsWith("image/")) {
      // Check file size (20MB limit)
      if (file.size > 20 * 1024 * 1024) {
        toast.error("File size must be less than 20MB");
        return;
      }

      setThumbnail(file);

      // Create preview URL
      const reader = new FileReader();
      reader.onload = (e) => {
        setThumbnailPreview(e.target.result);
      };
      reader.readAsDataURL(file);
    } else {
      toast.error("Please select a valid image file");
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);

    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const removeThumbnail = () => {
    setThumbnail(null);
    setThumbnailPreview(null);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <form onSubmit={handleEditFilm}>
          <DialogHeader>
            <DialogTitle>
              Edit -{" "}
              {isLoadingFilm
                ? "Loading..."
                : filmDetails?.film_details?.title || "Film"}
            </DialogTitle>
            <DialogDescription>
              Edit your film here. Click save when you&apos;re done.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            {/* Title Field */}
            <div className="space-y-2">
              <InputField
                label="Film Title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Enter film title"
                required
              />
            </div>

            {/* Logline Field */}
            <div className="space-y-2">
              <Label htmlFor="logline">Logline</Label>
              <Textarea
                id="logline"
                name="logline"
                value={formData.logline}
                onChange={handleInputChange}
                placeholder="Enter film logline"
                className="min-h-[100px]"
              />
            </div>

            {/* Thumbnail Upload */}
            <div className="space-y-2">
              <Label>Thumbnail</Label>

              {/* Preview Section */}
              {thumbnailPreview && (
                <div className="relative inline-block">
                  <img
                    src={thumbnailPreview}
                    alt="Thumbnail preview"
                    className="w-32 h-24 object-cover rounded-lg border"
                  />
                  <button
                    type="button"
                    onClick={removeThumbnail}
                    className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 transition-colors"
                  >
                    <X size={16} />
                  </button>
                </div>
              )}

              {/* Upload Area */}
              <label
                htmlFor="thumbnail-upload"
                className={`block border-2 border-dashed rounded-lg p-6 text-center transition-colors cursor-pointer ${
                  dragOver
                    ? "border-primary bg-primary/5"
                    : "border-gray-300 hover:border-primary/50"
                }`}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
              >
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileInputChange}
                  className="hidden"
                  id="thumbnail-upload"
                />

                <div className="flex flex-col items-center space-y-2">
                  {thumbnailPreview ? (
                    <ImageIcon className="h-8 w-8 text-gray-400" />
                  ) : (
                    <Upload className="h-8 w-8 text-gray-400" />
                  )}

                  <div>
                    <span className="text-primary hover:text-primary/80 font-medium">
                      {thumbnailPreview
                        ? "Change thumbnail"
                        : "Upload thumbnail"}
                    </span>
                    <p className="text-sm text-gray-500 mt-1">
                      Drag and drop or click to upload
                    </p>
                    <p className="text-xs text-gray-400">
                      Accepts images less than 20MB
                    </p>
                  </div>
                </div>
              </label>
            </div>
          </div>

          <DialogFooter className="flex gap-2 pt-4 border-t">
            <DialogClose asChild>
              <Button variant="secondary" type="button" className="flex-1">
                Cancel
              </Button>
            </DialogClose>
            <Button
              type="submit"
              disabled={isEditing || !formData.title.trim()}
              className="flex-1"
            >
              {isEditing ? "Saving..." : "Save changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
