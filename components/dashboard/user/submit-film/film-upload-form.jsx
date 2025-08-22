"use client";
import { useState } from "react";
import InputField from "@/components/input-field";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import MultipleSelector from "@/components/ui/multiselect";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { genres } from "@/constants";
import UploadContent from "./upload-content";

export default function FilmUploadForm() {
  const [selectedGenre, setSelectedGenre] = useState([]);
  const [trailer, setTrailer] = useState(null);
  const [fullFilm, setFullFilm] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);
  const handleFilmUpload = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    // console.log({ ...data, genre: selectedGenre });
  };
  return (
    <form className="my-5 space-y-5" onSubmit={handleFilmUpload}>
      {/* Film Information Card */}
      <Card>
        <CardHeader>
          <CardTitle>Film Information</CardTitle>
          <CardDescription>Basic details about your film</CardDescription>
        </CardHeader>

        <CardContent className="space-y-3">
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
          {/* year , type and genre */}
          <div className="grid md:grid-cols-3 gap-3 my-3">
            {/* year */}
            <InputField
              type="number"
              label="Year"
              name="year"
              placeholder="Enter film year"
            />
            {/* type */}
            <span>
              <Label>Type</Label>
              <Select name="type">
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select your film type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="apple">Apple</SelectItem>
                    <SelectItem value="banana">Banana</SelectItem>
                    <SelectItem value="blueberry">Blueberry</SelectItem>
                    <SelectItem value="grapes">Grapes</SelectItem>
                    <SelectItem value="pineapple">Pineapple</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </span>
            {/* genre */}
            <span>
              <Label>Genre</Label>
              <MultipleSelector
                commandProps={{
                  label: "Select genre",
                }}
                value={selectedGenre}
                onChange={setSelectedGenre}
                name="genre"
                defaultOptions={genres}
                placeholder="Select genre"
                hideClearAllButton
                hidePlaceholderWhenSelected
                emptyIndicator={
                  <p className="text-center text-sm">Not found</p>
                }
              />
            </span>
          </div>
        </CardContent>
      </Card>
      {/* Submit Title Card */}
      <Card>
        <CardHeader>
          <CardTitle>Submit Title</CardTitle>
          <CardDescription>
            Upload your project and all its details and we'll get back to you
            within 2-14 days.
          </CardDescription>
          <CardContent className="mt-3 px-0 grid lg:grid-cols-3 gap-5">
            {/* Upload Trailer */}
            <UploadContent
              content={trailer}
              maxSize={500}
              label="Trailer"
              title="Upload your film trailer"
              setContent={setTrailer}
            />
            {/* Upload full film */}
            <UploadContent
              content={fullFilm}
              maxSize={5000}
              label="Full Film"
              title="Upload your full film"
              setContent={setFullFilm}
            />
            {/* Upload thumbnail */}
            <UploadContent
              content={thumbnail}
              maxSize={20}
              accept={{ "image/*": [] }}
              label="Thumbnail"
              title="Upload your thumbnail"
              setContent={setThumbnail}
            />
          </CardContent>
        </CardHeader>
      </Card>
      {/* Pricing Card */}
      <Card>
        <CardHeader>
          <CardTitle>Pricing</CardTitle>
          <CardDescription>Set your film pricing</CardDescription>
        </CardHeader>
        <CardContent className="grid md:grid-cols-2 gap-5">
          {/* title */}
          <InputField
            label="Rent Price ($)"
            name="rent_price"
            placeholder="4.99"
            type="number"
          />
          <InputField
            label="Buy Price ($)"
            name="buy_price"
            placeholder="19.99"
            type="number"
          />
        </CardContent>
      </Card>
      {/* Submit Btn */}
      <div className="text-center">
        <Button className="w-full active:scale-[0.99]">
          Submit for review
        </Button>
      </div>
    </form>
  );
}
