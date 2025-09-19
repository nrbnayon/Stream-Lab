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
import UploadContent from "../../submit-film/upload-content";
import { useEffect, useState } from "react";
import {
  useGetFilmDetailsQuery,
  useEditFilmMutation,
} from "@/redux/store/api/filmsApi";
import { toast } from "sonner";

export default function FilmEditDialog({ trigger, filmID }) {
  const [thumbnail, setThumbnail] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    logline: "",
  });
  const [isOpen, setIsOpen] = useState(false);

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
    }
  }, [filmDetails]);

  const handleEditFilm = async (e) => {
    e.preventDefault();

    const editFormData = new FormData();
    editFormData.append("film_id", filmID);
    editFormData.append("title", formData.title);
    editFormData.append("logline", formData.logline);

    if (thumbnail) {
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

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-w-3xl">
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
          <div className="grid gap-3">
            {/* title */}
            <InputField
              label="Film Title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Enter film title"
            />
            {/* logline */}
            <span>
              <Label>Logline</Label>
              <Textarea
                name="logline"
                value={formData.logline}
                onChange={handleInputChange}
                placeholder="Enter film logline"
              />
            </span>
            {/* thumbnail */}
            <UploadContent
              content={thumbnail}
              maxSize={20}
              accept={{ "image/*": [] }}
              label="Thumbnail"
              title="Change your thumbnail"
              setContent={setThumbnail}
            />
          </div>
          <DialogFooter className="flex *:grow mt-3">
            <DialogClose asChild>
              <Button variant="secondary" type="button">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" disabled={isEditing}>
              {isEditing ? "Saving..." : "Save changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
