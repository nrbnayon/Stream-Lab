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
import { useState } from "react";

export default function FilmEditDialog({ trigger, filmID }) {
  const [thumbnail, setThumbnail] = useState(null);
  //   TODO: fetch film

  const handleEditFilm = (e) => {
    e.preventDefault();
    console.log("Heyy");
  };
  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-w-3xl">
        <form onSubmit={handleEditFilm}>
          <DialogHeader>
            <DialogTitle>Edit - Film Name</DialogTitle>
            <DialogDescription>
              Edit your film here. Click save when you&apos;re done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-3">
            {/* title */}
            <InputField
              label="Film Title"
              name="title"
              placeholder="Enter film title"
            />
            {/* logline */}
            <span>
              <Label>Logline</Label>
              <Textarea name="logline" placeholder="Enter film logline" />
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
              <Button variant="secondary">Cancel</Button>
            </DialogClose>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
