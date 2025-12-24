"use client";
import { useState, useEffect } from "react";
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
import { useUploadFilmMutation } from "@/redux/store/api/filmsApi";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useGetMeQuery } from "@/redux/store/api/usersApi";

const filmTypes = [
  { value: "MOVIE", label: "Movie" },
  { value: "DRAMA", label: "Drama" },
  // { value: "SHORT", label: "Short Film" },
  // { value: "DOCUMENTARY", label: "Documentary" },
  // { value: "EPISODE", label: "Episode" },
];

export default function FilmUploadForm() {
  const [selectedGenre, setSelectedGenre] = useState([]);
  const [selectedType, setSelectedType] = useState("");
  const [trailer, setTrailer] = useState(null);
  const [fullFilm, setFullFilm] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);
  const [formData, setFormData] = useState({
    user_name: "",
    user_email: "",
    title: "",
    logline: "",
    year: new Date().getFullYear(),
    rent_price: "",
    buy_price: "",
  });

  const [uploadFilm, { isLoading: isUploading }] = useUploadFilmMutation();
  const { data: userResponse } = useGetMeQuery();
  const router = useRouter();

  useEffect(() => {
    if (userResponse?.data) {
      setFormData((prev) => ({
        ...prev,
        user_name: userResponse.data.full_name || "",
        user_email: userResponse.data.email || "",
      }));
    }
  }, [userResponse]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Enhanced genre change handler to support text input
  const handleGenreChange = (value) => {
    setSelectedGenre(value);
  };

  // Function to handle creating new genre options from text input
  const createGenreOption = (inputValue) => {
    const trimmedValue = inputValue.trim();
    if (
      trimmedValue &&
      !selectedGenre.find(
        (genre) => (genre.value || genre.label || genre) === trimmedValue
      )
    ) {
      return {
        value: trimmedValue,
        label: trimmedValue,
      };
    }
    return null;
  };

  const validateForm = () => {
    const errors = [];

    if (!formData.user_name?.trim()) {
      errors.push("User name is required");
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.user_email?.trim() || !emailRegex.test(formData.user_email)) {
      errors.push("Please enter a valid email address");
    }

    if (!formData.title?.trim()) {
      errors.push("Film title is required");
    }
    if (!formData.logline?.trim()) {
      errors.push("Logline is required");
    }
    if (
      !formData.year ||
      formData.year < 1900 ||
      formData.year > new Date().getFullYear() + 5
    ) {
      errors.push("Please enter a valid year");
    }
    if (!selectedType) {
      errors.push("Please select a film type");
    }
    if (selectedGenre.length === 0) {
      errors.push("Please select at least one genre");
    }
    if (!thumbnail) {
      errors.push("Thumbnail is required");
    }
    if (!trailer) {
      errors.push("Trailer is required");
    }
    if (!fullFilm) {
      errors.push("Full film is required");
    }
    if (!formData.rent_price || parseFloat(formData.rent_price) <= 0) {
      errors.push("Please enter a valid rent price");
    }
    if (!formData.buy_price || parseFloat(formData.buy_price) <= 0) {
      errors.push("Please enter a valid buy price");
    }

    return errors;
  };

  const handleFilmUpload = async (e) => {
    e.preventDefault();

    // Validate form
    const errors = validateForm();
    if (errors.length > 0) {
      errors.forEach((error) => toast.error(error));
      return;
    }

    try {
      // Create FormData
      const uploadFormData = new FormData();

      // Add text fields
      uploadFormData.append("user_name", formData.user_name.trim());
      uploadFormData.append("user_email", formData.user_email.trim());
      uploadFormData.append("title", formData.title.trim());
      uploadFormData.append("logline", formData.logline.trim());
      uploadFormData.append("year", formData.year.toString());
      uploadFormData.append("film_type", selectedType);
      uploadFormData.append(
        "rent_price",
        parseFloat(formData.rent_price).toFixed(2)
      );
      uploadFormData.append(
        "buy_price",
        parseFloat(formData.buy_price).toFixed(2)
      );

      // Add genre as JSON string or comma-separated values
      const genreValues = selectedGenre.map((genre) => genre.value || genre);
      uploadFormData.append("genre", JSON.stringify(genreValues));

      // Add files
      if (thumbnail instanceof File) {
        uploadFormData.append("thumbnail", thumbnail);
      }
      if (trailer instanceof File) {
        uploadFormData.append("trailer", trailer);
      }
      if (fullFilm instanceof File) {
        uploadFormData.append("full_film", fullFilm);
      }

      // Debug log
      // console.log("Upload FormData entries:");
      // for (let [key, value] of uploadFormData.entries()) {
      //   console.log(key, value);
      //   if (value instanceof File) {
      //     console.log(
      //       `File: ${value.name}, Size: ${value.size}, Type: ${value.type}`
      //     );
      //   }
      // }

      // Upload film
      const result = await uploadFilm(uploadFormData).unwrap();

      // toast.success("Film uploaded successfully! It's now under review.");

      // Reset form
      setFormData({
        user_name: "",
        user_email: "",
        title: "",
        logline: "",
        year: new Date().getFullYear(),
        rent_price: "",
        buy_price: "",
      });
      setSelectedGenre([]);
      setSelectedType("");
      setTrailer(null);
      setFullFilm(null);
      setThumbnail(null);

      // Redirect to my titles page
      router.push("/my-titles");
    } catch (error) {
      console.error("Error uploading film:", error);

      if (error?.data?.message) {
        toast.error(error.data.message);
      } else if (error?.data?.errors) {
        Object.values(error.data.errors)
          .flat()
          .forEach((err) => {
            toast.error(err);
          });
      } else {
        toast.error("Failed to upload film. Please try again.");
      }
    }
  };

  return (
    <form className="my-5 space-y-5" onSubmit={handleFilmUpload}>
      {/* User Information Card */}
      <Card>
        <CardHeader>
          <CardTitle>User Information</CardTitle>
          <CardDescription>Enter your personal details</CardDescription>
        </CardHeader>
        <CardContent className="grid md:grid-cols-2 gap-5">
          <InputField
            label="User Name"
            name="user_name"
            value={formData.user_name}
            onChange={handleInputChange}
            placeholder="Enter your name"
            required
          />
          <InputField
            label="User Email"
            name="user_email"
            value={formData.user_email}
            onChange={handleInputChange}
            placeholder="Enter your email"
            type="email"
            required
          />
        </CardContent>
      </Card>

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
            value={formData.title}
            onChange={handleInputChange}
            placeholder="Enter film title"
            required
          />

          {/* logline */}
          <div>
            <Label htmlFor="logline">Logline *</Label>
            <Textarea
              id="logline"
              name="logline"
              value={formData.logline}
              onChange={handleInputChange}
              placeholder="Enter film logline"
              className="min-h-[100px]"
              required
            />
          </div>

          {/* year, type and genre */}
          <div className="grid lg:grid-cols-3 gap-3 my-3">
            {/* year */}
            <InputField
              type="number"
              label="Year"
              name="year"
              value={formData.year}
              onChange={handleInputChange}
              placeholder="Enter film year"
              min="1900"
              max={new Date().getFullYear() + 5}
              required
            />

            {/* type */}
            <div>
              <Label>Film Type *</Label>
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select your film type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {filmTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            {/* genre */}
            <div>
              <Label>Genre *</Label>
              <MultipleSelector
                commandProps={{
                  label: "Select genre",
                }}
                value={selectedGenre}
                onChange={handleGenreChange}
                onCreateOption={createGenreOption}
                creatable
                name="genre"
                defaultOptions={genres}
                placeholder="Select or type genre"
                hideClearAllButton
                hidePlaceholderWhenSelected
                emptyIndicator={
                  <p className="text-center text-sm">Not found</p>
                }
              />
            </div>
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
        </CardHeader>
        <CardContent className="grid grid-cols-1 lg:grid-cols-3 gap-5 overflow-hidden md:pb-10">
          {/* Upload thumbnail */}
          <UploadContent
            content={thumbnail}
            maxSize={20}
            accept={{ "image/*": [] }}
            label="Thumbnail *"
            title="Upload your thumbnail"
            setContent={setThumbnail}
          />

          {/* Upload Trailer */}
          <UploadContent
            content={trailer}
            maxSize={500}
            accept={{ "video/*": [] }}
            label="Trailer *"
            title="Upload your film trailer"
            setContent={setTrailer}
          />

          {/* Upload full film */}
          <UploadContent
            content={fullFilm}
            maxSize={20000}
            accept={{ "video/*": [] }}
            label="Full Film *"
            title="Upload your full film"
            setContent={setFullFilm}
          />
        </CardContent>
      </Card>

      {/* Pricing Card */}
      <Card>
        <CardHeader>
          <CardTitle>Pricing</CardTitle>
          <CardDescription>Set your film pricing</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-3 md:gap-5">
          <InputField
            label="Rent Price ($) *"
            name="rent_price"
            value={formData.rent_price}
            onChange={handleInputChange}
            placeholder="4.99"
            type="number"
            step="0.01"
            min="0.01"
            required
          />
          <InputField
            label="Buy Price ($) *"
            name="buy_price"
            value={formData.buy_price}
            onChange={handleInputChange}
            placeholder="19.99"
            type="number"
            step="0.01"
            min="0.01"
            required
          />
        </CardContent>
      </Card>

      {/* Submit Btn */}
      <div className="text-center">
        <Button
          type="submit"
          disabled={isUploading}
          className="w-full active:scale-[0.99]"
        >
          {isUploading ? "Uploading..." : "Submit for review"}
        </Button>
      </div>
    </form>
  );
}
