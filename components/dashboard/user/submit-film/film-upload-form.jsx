// components\dashboard\user\submit-film\film-upload-form.jsx
"use client";
import { useState, useEffect, useRef } from "react";
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
import { Checkbox } from "@/components/ui/checkbox";
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
import { useGetMeQuery } from "@/redux/store/api/usersApi";
import axios from "axios";
import Cookies from "js-cookie";
import { Progress } from "@/components/ui/progress";
import { Type, PenTool, Upload, Eraser, Check, X } from "lucide-react";

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

  // Agreements & Signature State
  const [agreements, setAgreements] = useState({
    owner: false,
    rights: false,
    authority: false,
  });
  const [signature, setSignature] = useState("");
  const [signatureTab, setSignatureTab] = useState("type"); // "type", "draw", "upload"
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);

  // Handle signature tab change
  const handleSignatureTabChange = (tab) => {
    setSignatureTab(tab);
    setSignature("");
  };

  // Canvas drawing functions
  const getCoordinates = (e) => {
     if (e.touches && e.touches.length > 0) {
       return {
         clientX: e.touches[0].clientX,
         clientY: e.touches[0].clientY
       };
     }
     return {
       clientX: e.clientX,
       clientY: e.clientY
     };
  };

  const startDrawing = (e) => {
    // Prevent scrolling when touching the canvas
    if (e.cancelable) e.preventDefault();
    
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const rect = canvas.getBoundingClientRect();
    const coords = getCoordinates(e);
    
    // Calculate scale factors
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    
    const x = (coords.clientX - rect.left) * scaleX;
    const y = (coords.clientY - rect.top) * scaleY;

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineWidth = 2;
    ctx.lineCap = "round";
    ctx.strokeStyle = "#000"; 
    setIsDrawing(true);
  };

  const draw = (e) => {
    // Prevent scrolling when touching the canvas
    if (e.cancelable) e.preventDefault();

    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const rect = canvas.getBoundingClientRect();
    const coords = getCoordinates(e);
    
    // Calculate scale factors
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    const x = (coords.clientX - rect.left) * scaleX;
    const y = (coords.clientY - rect.top) * scaleY;

    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    if (!isDrawing) return;
    setIsDrawing(false);
    const canvas = canvasRef.current;
    if (canvas) {
      setSignature(canvas.toDataURL());
    }
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      setSignature("");
    }
  };

  // Handle file upload for signature
  const handleSignatureUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setSignature(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };


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
    // Dummy fields
    format: "Traditional",
    accolades: "",
    website_link: "",
    instagram_link: "",
    directed_by: "",
    screenplay_by: "",
    produced_by: "",
    notable_cast: "",
  });

  const { data: userResponse } = useGetMeQuery();

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

    if (!agreements.owner) {
      errors.push("You must declare ownership of the work");
    }
    if (!agreements.rights) {
      errors.push("You must accept the terms regarding content removal");
    }
    if (!agreements.authority) {
      errors.push("You must confirm authority to license the work");
    }
    if (!signature.trim()) {
      errors.push("Signature is required");
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

      // Helper to ensure file has extension
      const getFileNameWithExtension = (file, defaultName) => {
        if (!file?.name) return defaultName;
        if (file.name.includes(".")) return file.name;

        // Map common mime types if extension is missing
        const mimeMap = {
          "video/mp4": ".mp4",
          "video/quicktime": ".mov",
          "video/x-matroska": ".mkv",
          "image/jpeg": ".jpg",
          "image/png": ".png",
          "image/webp": ".webp",
        };
        return file.name + (mimeMap[file.type] || "");
      };

      // Extract file names with extensions
      const trailerName = getFileNameWithExtension(trailer, "trailer.mp4");
      const fullFilmName = getFileNameWithExtension(fullFilm, "full_film.mp4");
      const thumbnailName = getFileNameWithExtension(
        thumbnail,
        "thumbnail.jpg",
      );

      //  const trailerName = trailer?.name || "trailer.mp4";
      // const fullFilmName = fullFilm?.name || "full_film.mp4";
      // const thumbnailName = thumbnail?.name || "thumbnail.jpg";

      // Check for S3 single upload limit (5GB)
      const MAX_S3_SIZE = 5 * 1024 * 1024 * 1024; // 5GB in bytes
      if (fullFilm?.size > MAX_S3_SIZE) {
        toast.error("File too large. Maximum upload size is 5GB.");
        setUploadStatus("ERROR");
        return;
      }

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
        format: "Traditional",
        accolades: "",
        website_link: "",
        instagram_link: "",
        directed_by: "",
        screenplay_by: "",
        produced_by: "",
        notable_cast: "",
      });
      setSelectedGenre([]);
      setSelectedType("");
      setTrailer(null);
      setFullFilm(null);
      setThumbnail(null);
      setUploadStatus("IDLE");
      setUploadProgress({ thumbnail: 0, trailer: 0, fullFilm: 0, overall: 0 });
      setCurrentUploading("");
      setAgreements({ owner: false, rights: false, authority: false });
      setSignature("");
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
              label="Name"
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
              label="Email"
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
              label="Film/ Series Title"
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

            {/* Format Field */}
            <div className="space-y-3">
              <Label>Format *</Label>
              <div className="grid grid-cols-2 gap-4">
                <div
                  className={`cursor-pointer rounded-lg border-2 p-4 text-center transition-all ${
                    formData.format === "Traditional"
                      ? "border-primary bg-primary/10"
                      : "border-muted hover:border-primary/50"
                  }`}
                  onClick={() =>
                    setFormData((prev) => ({ ...prev, format: "Traditional" }))
                  }
                >
                  <p className="font-semibold">Traditional</p>
                </div>
                <div
                  className={`cursor-pointer rounded-lg border-2 p-4 text-center transition-all ${
                    formData.format === "Vertical"
                      ? "border-primary bg-primary/10"
                      : "border-muted hover:border-primary/50"
                  }`}
                  onClick={() =>
                    setFormData((prev) => ({ ...prev, format: "Vertical" }))
                  }
                >
                  <p className="font-semibold">Vertical</p>
                </div>
              </div>
              <p className="text-xs text-muted-foreground">
                Is this title meant to be watched horizontal (traditional film)
                or vertical (like social media)?
              </p>
            </div>

            {/* Accolades */}
            <div>
              <Label htmlFor="accolades">Accolades</Label>
              <Textarea
                id="accolades"
                name="accolades"
                value={formData.accolades}
                onChange={handleInputChange}
                placeholder="Enter accolades"
                className="mt-2 min-h-[100px]"
                disabled={
                  uploadStatus === "PROCESSING" || uploadStatus === "UPLOADING"
                }
              />
              <p className="text-xs text-muted-foreground mt-2">
                Any notable film festival selections or awards, viral Youtube
                viewership or large social media followings
              </p>
            </div>

            {/* Website / IMDB Link */}
            <div>
              <InputField
                label="Website / IMDB Link"
                name="website_link"
                value={formData.website_link}
                onChange={handleInputChange}
                placeholder="Enter website or IMDB link"
                inputDisabled={
                  uploadStatus === "PROCESSING" || uploadStatus === "UPLOADING"
                }
              />
              <p className="text-xs text-muted-foreground mt-1">
                Does the title have a website or an IMDb page?
              </p>
            </div>

            {/* Film/Series Instagram Link */}
            <div>
              <InputField
                label="Film/Series Instagram Link"
                name="instagram_link"
                value={formData.instagram_link}
                onChange={handleInputChange}
                placeholder="Enter Instagram link"
                inputDisabled={
                  uploadStatus === "PROCESSING" || uploadStatus === "UPLOADING"
                }
              />
              <p className="text-xs text-muted-foreground mt-1">
                Does the title have a social media page?
              </p>
            </div>

            {/* Credits */}
            <div className="grid md:grid-cols-2 gap-3">
              <InputField
                label="Directed by"
                name="directed_by"
                value={formData.directed_by}
                onChange={handleInputChange}
                placeholder="Enter director name(s)"
                inputDisabled={
                  uploadStatus === "PROCESSING" || uploadStatus === "UPLOADING"
                }
              />
              <InputField
                label="Screenplay by"
                name="screenplay_by"
                value={formData.screenplay_by}
                onChange={handleInputChange}
                placeholder="Enter screenplay writer(s)"
                inputDisabled={
                  uploadStatus === "PROCESSING" || uploadStatus === "UPLOADING"
                }
              />
              <InputField
                label="Produced by"
                name="produced_by"
                value={formData.produced_by}
                onChange={handleInputChange}
                placeholder="Enter producer(s)"
                inputDisabled={
                  uploadStatus === "PROCESSING" || uploadStatus === "UPLOADING"
                }
              />
              <InputField
                label="Notable Cast"
                name="notable_cast"
                value={formData.notable_cast}
                onChange={handleInputChange}
                placeholder="Enter cast member(s)"
                inputDisabled={
                  uploadStatus === "PROCESSING" || uploadStatus === "UPLOADING"
                }
              />
            </div>
            {/* <p className="text-xs text-muted-foreground">
              Credits are optional
            </p> */}

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
              description={
                <div className="flex flex-col gap-1 items-center">
                  <span className="text-center">1080p H.264, 15–20 Mbps bitrate, Stereo AAC audio</span>
                  <span className="text-center font-medium">Optimized HD upload (recommended under 5GB)</span>
                </div>
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

        {/* Agreements & Signature Card */}
        <Card>
          <CardHeader>
            <CardTitle>Agreements & Signature</CardTitle>
            <CardDescription>
              Please confirm the following statements to proceed
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-start space-x-3">
              <Checkbox
                id="agreement-owner"
                checked={agreements.owner}
                onCheckedChange={(c) =>
                  setAgreements((prev) => ({ ...prev, owner: c }))
                }
                disabled={
                  uploadStatus === "PROCESSING" || uploadStatus === "UPLOADING"
                }
              />
              <Label
                htmlFor="agreement-owner"
                className="font-normal leading-tight cursor-pointer mb-0.5"
              >
                I hereby declare that I am the rightful owner of, or have been
                granted legal authorization to distribute, the uploaded work. *
              </Label>
            </div>

            <div className="flex items-start space-x-3">
              <Checkbox
                id="agreement-rights"
                checked={agreements.rights}
                onCheckedChange={(c) =>
                  setAgreements((prev) => ({ ...prev, rights: c }))
                }
                disabled={
                  uploadStatus === "PROCESSING" || uploadStatus === "UPLOADING"
                }
              />
              <Label
                htmlFor="agreement-rights"
                className="font-normal leading-tight cursor-pointer mb-1"
              >
                I understand that <span className="font-bold text-primary">JusB.io</span> reserves the right to suspend or
                remove the content and withhold pay deposits if ownership cannot
                be verified. *
              </Label>
            </div>

            <div className="flex items-start space-x-3">
              <Checkbox
                id="agreement-authority"
                checked={agreements.authority}
                onCheckedChange={(c) =>
                  setAgreements((prev) => ({ ...prev, authority: c }))
                }
                disabled={
                  uploadStatus === "PROCESSING" || uploadStatus === "UPLOADING"
                }
              />
              <Label
                htmlFor="agreement-authority"
                className="font-normal leading-tight cursor-pointer mb-0.5"
              >
                I confirm that the work does not infringe on any copyright,
                trademark, or other intellectual property rights, and that I
                have full authority to license and monetize it on <span className="font-bold text-primary">JusB.io</span>. *
              </Label>
            </div>

            <div className="space-y-3 pt-4 border-t">
              <Label htmlFor="signature" className="text-primary font-semibold">
                Signature *
              </Label>
              
              <div className="border rounded-md p-4 bg-muted/30">
                {/* Signature Tabs */}
                <div className="flex space-x-2 mb-4">
                  <Button
                    type="button"
                    variant={signatureTab === "type" ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleSignatureTabChange("type")}
                    className="flex-1 sm:flex-none"
                    disabled={uploadStatus === "PROCESSING" || uploadStatus === "UPLOADING"}

                  >
                    <Type className="w-4 h-4 mr-2" /> Type
                  </Button>
                  <Button
                    type="button"
                    variant={signatureTab === "draw" ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleSignatureTabChange("draw")}
                    className="flex-1 sm:flex-none"
                    disabled={uploadStatus === "PROCESSING" || uploadStatus === "UPLOADING"}
                  >
                    <PenTool className="w-4 h-4 mr-2" /> Draw
                  </Button>
                  <Button
                    type="button"
                    variant={signatureTab === "upload" ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleSignatureTabChange("upload")}
                    className="flex-1 sm:flex-none"
                    disabled={uploadStatus === "PROCESSING" || uploadStatus === "UPLOADING"}
                  >
                    <Upload className="w-4 h-4 mr-2" /> Upload
                  </Button>
                </div>

                {/* Type Mode */}
                {signatureTab === "type" && (
                  <div className="space-y-2">
                    <InputField
                      id="signature"
                      name="signature"
                      value={signature}
                      onChange={(e) => setSignature(e.target.value)}
                      placeholder="Type your full name"
                      label=""
                      className="font-dancing-script text-lg"
                      inputDisabled={
                        uploadStatus === "PROCESSING" ||
                        uploadStatus === "UPLOADING"
                      }
                    />
                    <p className="text-xs text-muted-foreground">
                      Type your full name as your digital signature.
                    </p>
                  </div>
                )}

                {/* Draw Mode */}
                {signatureTab === "draw" && (
                  <div className="space-y-2">
                    <div className="relative border-2 border-dashed border-input rounded-md bg-white overflow-hidden h-40 touch-none">
                      <canvas
                        ref={canvasRef}
                        width={600}
                        height={200}
                        className="w-full h-full cursor-crosshair block"
                        onMouseDown={startDrawing}
                        onMouseMove={draw}
                        onMouseUp={stopDrawing}
                        onMouseLeave={stopDrawing}
                        onTouchStart={startDrawing}
                        onTouchMove={draw}
                        onTouchEnd={stopDrawing}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute top-2 right-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                        onClick={clearCanvas}
                        disabled={uploadStatus === "PROCESSING" || uploadStatus === "UPLOADING"}
                      >
                        <Eraser className="w-4 h-4" />
                      </Button>
                      {!signature && !isDrawing && (
                         <div className="absolute inset-0 flex items-center justify-center pointer-events-none text-muted-foreground/30 text-2xl font-dancing-script">
                            Sign Here
                         </div>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Use your mouse or finger to draw your signature in the box.
                    </p>
                  </div>
                )}

                {/* Upload Mode */}
                {signatureTab === "upload" && (
                  <div className="space-y-2">
                    <div className="flex flex-col items-center justify-center border-2 border-dashed border-input rounded-md p-6 bg-background hover:bg-accent/5 transition-colors">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleSignatureUpload}
                        className="hidden"
                        id="signature-upload"
                        disabled={uploadStatus === "PROCESSING" || uploadStatus === "UPLOADING"}
                      />
                      <Label
                        htmlFor="signature-upload"
                        className="cursor-pointer flex flex-col items-center gap-3 w-full h-full"
                      >
                         {signature && signature.startsWith("data:image") ? (
                            <div className="relative group">
                              <img 
                                src={signature} 
                                alt="Signature Preview" 
                                className="h-20 max-w-full object-contain border rounded-md p-1 bg-white" 
                              />
                              <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-md text-white text-xs font-medium">
                                Change
                              </div>
                            </div>
                         ) : (
                            <>
                              <div className="p-3 bg-primary/10 rounded-full text-primary">
                                <Upload className="w-6 h-6" />
                              </div>
                              <div className="text-center">
                                <span className="text-sm font-medium text-primary">Click to upload</span>
                                <span className="text-sm text-muted-foreground block mt-1">
                                  or drag and drop your signature image
                                </span>
                              </div>
                            </>
                         )}
                      </Label>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Upload an image of your signature (PNG, JPG).
                    </p>
                  </div>
                )}
              </div>
            </div>
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
