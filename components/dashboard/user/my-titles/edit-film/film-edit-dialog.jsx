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
  useGetMyTitleFilmDetailsQuery,
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

  const {
    data: filmResponse,
    isLoading: isLoadingFilm,
    error: filmError,
  } = useGetMyTitleFilmDetailsQuery(filmID, {
    skip: !isOpen || !filmID,
  });

  const [editFilm, { isLoading: isEditing }] = useEditFilmMutation();

  // Populate form when data loads
  useEffect(() => {
    if (filmResponse?.data) {
      const film = filmResponse.data;
      setFormData({
        title: film.title || "",
        logline: film.logline || "",
      });
      setThumbnailPreview(film.thumbnail || null);
    }
  }, [filmResponse]);

  // Reset form on close
  useEffect(() => {
    if (!isOpen) {
      setThumbnail(null);
      setThumbnailPreview(null);
      setFormData({ title: "", logline: "" });
    }
  }, [isOpen]);

  // Handle form submission
  const handleEditFilm = async (e) => {
    e.preventDefault();

    const editFormData = new FormData();
    editFormData.append("film_id", filmID);
    editFormData.append("title", formData.title.trim()); // Keep existing title
    editFormData.append("logline", formData.logline.trim());

    if (thumbnail && thumbnail instanceof File) {
      editFormData.append("thumbnail", thumbnail);
    }

    try {
      await editFilm(editFormData).unwrap();
      toast.success("Film updated successfully!");
      setIsOpen(false);
    } catch (err) {
      console.error("Edit failed:", err);
      toast.error(err?.data?.message || "Failed to update film");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileSelect = (file) => {
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select a valid image file");
      return;
    }

    if (file.size > 20 * 1024 * 1024) {
      toast.error("Image must be under 20MB");
      return;
    }

    setThumbnail(file);
    const reader = new FileReader();
    reader.onload = (e) => setThumbnailPreview(e.target.result);
    reader.readAsDataURL(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFileSelect(file);
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
    const file = e.target.files?.[0];
    if (file) handleFileSelect(file);
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
              Edit Film
              {isLoadingFilm && " - Loading..."}
            </DialogTitle>
            <DialogDescription>
              Update your film's logline and thumbnail.
            </DialogDescription>
          </DialogHeader>

          {filmError ? (
            <div className="text-red-500 text-center py-8">
              Failed to load film details. Please try again.
            </div>
          ) : (
            <div className="grid gap-6 py-4">
              {/* Display Film Title (Read-only) */}
              <div className="space-y-2">
                <Label className="text-muted-foreground">Film Title</Label>
                <div className="text-lg font-semibold">
                  {formData.title || "Loading..."}
                </div>
              </div>

              {/* Logline */}
              <div className="space-y-2">
                <Label htmlFor="logline">Logline</Label>
                <Textarea
                  id="logline"
                  name="logline"
                  value={formData.logline}
                  onChange={handleInputChange}
                  placeholder="A compelling one-sentence summary of your film..."
                  className="min-h-[120px] resize-none"
                  disabled={isLoadingFilm}
                />
              </div>

              {/* Thumbnail Upload */}
              <div className="space-y-3">
                <Label>Thumbnail</Label>

                {/* Current Preview */}
                {thumbnailPreview && (
                  <div className="relative inline-block">
                    <img
                      src={thumbnailPreview}
                      alt="Thumbnail preview"
                      className="w-40 h-28 object-cover rounded-lg border-2 border-gray-200 shadow-md"
                    />
                    <button
                      type="button"
                      onClick={removeThumbnail}
                      className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1.5 transition-all shadow-lg"
                    >
                      <X size={16} />
                    </button>
                  </div>
                )}

                {/* Upload Zone */}
                <label
                  htmlFor="thumbnail-upload"
                  className={`block border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all ${
                    dragOver
                      ? "border-primary bg-primary/5"
                      : "border-gray-300 hover:border-primary/60 hover:bg-gray-50"
                  }`}
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                >
                  <input
                    id="thumbnail-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleFileInputChange}
                    className="hidden"
                    disabled={isLoadingFilm}
                  />

                  <div className="flex flex-col items-center space-y-3">
                    {thumbnailPreview ? (
                      <ImageIcon className="w-10 h-10 text-muted-foreground" />
                    ) : (
                      <Upload className="w-10 h-10 text-muted-foreground" />
                    )}
                    <div className="text-sm">
                      <span className="font-medium text-primary hover:underline">
                        {thumbnailPreview ? "Change" : "Upload"} thumbnail
                      </span>
                      <p className="text-muted-foreground">
                        Drag & drop or click to browse
                      </p>
                      <p className="text-xs text-muted-foreground/80 mt-1">
                        Max 20MB • JPG, PNG, WebP
                      </p>
                    </div>
                  </div>
                </label>
              </div>
            </div>
          )}

          <DialogFooter className="flex gap-3 pt-6 border-t mt-6">
            <DialogClose asChild>
              <Button type="button" variant="outline" className="flex-1">
                Cancel
              </Button>
            </DialogClose>
            <Button
              type="submit"
              disabled={isEditing || isLoadingFilm}
              className="flex-1"
            >
              {isEditing ? "Saving..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
