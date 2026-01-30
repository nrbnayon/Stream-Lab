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
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useGetMeQuery } from "@/redux/store/api/usersApi";
import axios from "axios";
import Cookies from "js-cookie";
import { Progress } from "@/components/ui/progress";

const filmTypes = [
  { value: "SHORT", label: "Short Film" },
  { value: "MOVIE", label: "Movie" },
  { value: "DRAMA", label: "Drama" },
  { value: "DOCUMENTARY", label: "Documentary" },
];

export default function FilmUploadForm() {
  const [selectedGenre, setSelectedGenre] = useState([]);
  const [selectedType, setSelectedType] = useState("");
  const [trailer, setTrailer] = useState(null);
  const [fullFilm, setFullFilm] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);

  // Upload Progress State
  const [uploadStatus, setUploadStatus] = useState("IDLE"); // IDLE, UPLOADING, COMPLETED, ERROR
  const [uploadProgress, setUploadProgress] = useState({
    thumbnail: 0,
    trailer: 0,
    fullFilm: 0,
    overall: 0,
  });
  const [currentUploading, setCurrentUploading] = useState(""); // Which file is currently uploading

  const [formData, setFormData] = useState({
    user_name: "",
    user_email: "",
    title: "",
    logline: "",
    year: new Date().getFullYear(),
    rent_price: "",
    buy_price: "",
  });

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

  const handleGenreChange = (value) => {
    setSelectedGenre(value);
  };

  const createGenreOption = (inputValue) => {
    const trimmedValue = inputValue.trim();
    if (
      trimmedValue &&
      !selectedGenre.find(
        (genre) => (genre.value || genre.label || genre) === trimmedValue,
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

  // Upload file directly to S3 using presigned URL
  const uploadToS3 = async (file, presignedData, fileType) => {
    return new Promise((resolve, reject) => {
      const formData = new FormData();

      // Add all fields from presigned data
      Object.keys(presignedData.fields).forEach((key) => {
        formData.append(key, presignedData.fields[key]);
      });

      // Add the file last
      formData.append("file", file);

      const xhr = new XMLHttpRequest();

      // Track upload progress
      xhr.upload.addEventListener("progress", (e) => {
        if (e.lengthComputable) {
          const percentComplete = Math.round((e.loaded / e.total) * 100);
          setUploadProgress((prev) => ({
            ...prev,
            [fileType]: percentComplete,
          }));
        }
      });

      xhr.addEventListener("load", () => {
        if (xhr.status === 204 || xhr.status === 200) {
          resolve(presignedData.key);
        } else {
          reject(new Error(`Upload failed with status ${xhr.status}`));
        }
      });

      xhr.addEventListener("error", () => {
        reject(new Error(`Network error uploading ${fileType}`));
      });

      xhr.addEventListener("abort", () => {
        reject(new Error(`Upload aborted for ${fileType}`));
      });

      xhr.open("POST", presignedData.url);
      xhr.send(formData);
    });
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
      setUploadStatus("UPLOADING");
      setUploadProgress({ thumbnail: 0, trailer: 0, fullFilm: 0, overall: 0 });

      const token = Cookies.get("accessToken");

      // Step 1: Get presigned URLs from backend
      toast.info("Preparing upload...");

      // Extract file names with extensions
      const trailerName = trailer?.name || "trailer.mp4";
      const fullFilmName = fullFilm?.name || "full_film.mp4";
      const thumbnailName = thumbnail?.name || "thumbnail.jpg";

      const presignedResponse = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/flims/get-upload-urls`,
        {
          title: formData.title.trim(),
          trailer_name: trailerName,
          full_film_name: fullFilmName,
          thumbnail_name: thumbnailName,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      );

      const {
        unique_folder,
        thumbnail: thumbData,
        trailer: trailerData,
        full_film: filmData,
      } = presignedResponse.data;

      // Step 2: Upload files directly to S3
      toast.info("Uploading files to S3...");

      try {
        // Upload thumbnail
        setCurrentUploading("thumbnail");
        await uploadToS3(thumbnail, thumbData, "thumbnail");
        toast.success("Thumbnail uploaded!");

        // Upload trailer
        setCurrentUploading("trailer");
        await uploadToS3(trailer, trailerData, "trailer");
        toast.success("Trailer uploaded!");

        // Upload full film
        setCurrentUploading("fullFilm");
        await uploadToS3(fullFilm, filmData, "fullFilm");
        toast.success("Full film uploaded!");

        setUploadProgress((prev) => ({ ...prev, overall: 100 }));

        // Step 3: Notify backend to confirm upload
        toast.info("Confirming upload...");

        const genreValues = selectedGenre.map((genre) => genre.value || genre);

        await axios.post(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/flims/confirm-upload`,
          {
            user_name: formData.user_name.trim(),
            user_email: formData.user_email.trim(),
            title: formData.title.trim(),
            logline: formData.logline.trim(),
            year: formData.year.toString(),
            film_type: selectedType,
            genre: JSON.stringify(genreValues),
            rent_price: parseFloat(formData.rent_price).toFixed(2),
            buy_price: parseFloat(formData.buy_price).toFixed(2),
            unique_folder: unique_folder,
            thumbnail_key: thumbData.key,
            trailer_key: trailerData.key,
            full_film_key: filmData.key,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          },
        );

        handleUploadSuccess();
      } catch (uploadError) {
        console.error("S3 Upload Error:", uploadError);
        setUploadStatus("ERROR");
        toast.error(`Failed to upload ${currentUploading}. Please try again.`);
      }
    } catch (error) {
      setUploadStatus("ERROR");
      console.error("Error:", error);
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Failed to upload film. Please try again.");
      }
    }
  };

  const handleUploadSuccess = () => {
    setUploadStatus("COMPLETED");
    toast.success("Film uploaded successfully! It's now under review.");

    setTimeout(() => {
      setFormData({
        user_name: userResponse?.data?.full_name || "",
        user_email: userResponse?.data?.email || "",
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
      setUploadStatus("IDLE");
      setUploadProgress({ thumbnail: 0, trailer: 0, fullFilm: 0, overall: 0 });
      setCurrentUploading("");
    }, 2000);
  };

  return (
    <>
      {/* Upload Progress Overlay */}
      {uploadStatus === "UPLOADING" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
          <Card className="w-full max-w-md p-6 shadow-lg border-primary/20">
            <div className="flex flex-col items-center gap-6 text-center">
              <div className="relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xl font-bold">
                    {Math.round(
                      (uploadProgress.thumbnail +
                        uploadProgress.trailer +
                        uploadProgress.fullFilm) /
                        3,
                    )}
                    %
                  </span>
                </div>
                <svg className="w-24 h-24 transform -rotate-90">
                  <circle
                    className="text-muted"
                    strokeWidth="8"
                    stroke="currentColor"
                    fill="transparent"
                    r="44"
                    cx="48"
                    cy="48"
                  />
                  <circle
                    className="text-primary transition-all duration-300 ease-in-out"
                    strokeWidth="8"
                    strokeDasharray={276}
                    strokeDashoffset={
                      276 -
                      ((uploadProgress.thumbnail +
                        uploadProgress.trailer +
                        uploadProgress.fullFilm) /
                        3 /
                        100) *
                        276
                    }
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="transparent"
                    r="44"
                    cx="48"
                    cy="48"
                  />
                </svg>
              </div>

              <div className="space-y-2 w-full">
                <h3 className="text-xl font-semibold">
                  Uploading to Server...
                </h3>
                {/* <p className="text-sm text-muted-foreground">
                  Direct upload - bypassing server for faster speeds
                </p> */}
              </div>

              <div className="w-full space-y-3">
                {/* Individual file progress */}
                <div className="space-y-2 text-left">
                  <div className="flex justify-between text-xs">
                    <span>Thumbnail</span>
                    <span className="font-semibold">
                      {uploadProgress.thumbnail}%
                    </span>
                  </div>
                  <Progress
                    value={uploadProgress.thumbnail}
                    className="h-1.5"
                  />
                </div>

                <div className="space-y-2 text-left">
                  <div className="flex justify-between text-xs">
                    <span>Trailer</span>
                    <span className="font-semibold">
                      {uploadProgress.trailer}%
                    </span>
                  </div>
                  <Progress value={uploadProgress.trailer} className="h-1.5" />
                </div>

                <div className="space-y-2 text-left">
                  <div className="flex justify-between text-xs">
                    <span>Full Film</span>
                    <span className="font-semibold">
                      {uploadProgress.fullFilm}%
                    </span>
                  </div>
                  <Progress value={uploadProgress.fullFilm} className="h-1.5" />
                </div>
              </div>

              <p className="text-xs text-muted-foreground">
                Currently uploading:{" "}
                <span className="font-semibold capitalize">
                  {currentUploading || "Preparing..."}
                </span>
              </p>
            </div>
          </Card>
        </div>
      )}

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
              inputDisabled={
                uploadStatus === "PROCESSING" || uploadStatus === "UPLOADING"
              }
            />
            <InputField
              label="User Email"
              name="user_email"
              value={formData.user_email}
              onChange={handleInputChange}
              placeholder="Enter your email"
              type="email"
              required
              inputDisabled={
                uploadStatus === "PROCESSING" || uploadStatus === "UPLOADING"
              }
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
            <InputField
              label="Film Title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Enter film title"
              required
              inputDisabled={
                uploadStatus === "PROCESSING" || uploadStatus === "UPLOADING"
              }
            />

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
                disabled={
                  uploadStatus === "PROCESSING" || uploadStatus === "UPLOADING"
                }
              />
            </div>

            <div className="grid lg:grid-cols-3 gap-3 my-3">
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
                inputDisabled={
                  uploadStatus === "PROCESSING" || uploadStatus === "UPLOADING"
                }
              />

              <div>
                <Label>Film Type *</Label>
                <Select
                  value={selectedType}
                  onValueChange={setSelectedType}
                  disabled={
                    uploadStatus === "PROCESSING" ||
                    uploadStatus === "UPLOADING"
                  }
                >
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
                  disabled={
                    uploadStatus === "PROCESSING" ||
                    uploadStatus === "UPLOADING"
                  }
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
            <UploadContent
              content={thumbnail}
              maxSize={20}
              accept={{ "image/*": [] }}
              label="Thumbnail *"
              title="Upload your thumbnail"
              setContent={setThumbnail}
              disabled={
                uploadStatus === "PROCESSING" || uploadStatus === "UPLOADING"
              }
            />

            <UploadContent
              content={trailer}
              maxSize={500}
              accept={{ "video/*": [] }}
              label="Trailer *"
              title="Upload your film trailer"
              setContent={setTrailer}
              disabled={
                uploadStatus === "PROCESSING" || uploadStatus === "UPLOADING"
              }
            />

            <UploadContent
              content={fullFilm}
              maxSize={20000}
              accept={{ "video/*": [] }}
              label="Full Film *"
              title="Upload your full film"
              setContent={setFullFilm}
              disabled={
                uploadStatus === "PROCESSING" || uploadStatus === "UPLOADING"
              }
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
              inputDisabled={
                uploadStatus === "PROCESSING" || uploadStatus === "UPLOADING"
              }
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
              inputDisabled={
                uploadStatus === "PROCESSING" || uploadStatus === "UPLOADING"
              }
            />
          </CardContent>
        </Card>

        {/* Submit Button */}
        <div className="text-center">
          <Button
            type="submit"
            disabled={
              uploadStatus === "UPLOADING" || uploadStatus === "PROCESSING"
            }
            className="w-full active:scale-[0.99]"
          >
            {uploadStatus === "UPLOADING"
              ? "Uploading to Server..."
              : "Submit for review"}
          </Button>
        </div>
      </form>
    </>
  );
}
