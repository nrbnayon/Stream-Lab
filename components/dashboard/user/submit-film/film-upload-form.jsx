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
// import { useUploadFilmMutation } from "@/redux/store/api/filmsApi";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useGetMeQuery } from "@/redux/store/api/usersApi";
import axios from "axios";
import Cookies from "js-cookie";
import { Progress } from "@/components/ui/progress";

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

  // Upload Progress State
  const [uploadStatus, setUploadStatus] = useState("IDLE"); // IDLE, UPLOADING, PROCESSING, COMPLETED, ERROR
  const [uploadProgress, setUploadProgress] = useState(0);
  const [processingProgress, setProcessingProgress] = useState(0);

  const [formData, setFormData] = useState({
    user_name: "",
    user_email: "",
    title: "",
    logline: "",
    year: new Date().getFullYear(),
    rent_price: "",
    buy_price: "",
  });

  // const [uploadFilm, { isLoading: isUploading }] = useUploadFilmMutation();
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

  // Check for ongoing upload task on component mount
  useEffect(() => {
    let pollInterval;
    
    const checkOngoingTask = async () => {
      const storedTaskId = localStorage.getItem("film_upload_task_id");
      if (storedTaskId) {
        const token = Cookies.get("accessToken");
        if (token) {
          // Resume polling for the stored task
          setUploadStatus("PROCESSING");
          setProcessingProgress(0);
          
          // Start polling immediately
          pollInterval = setInterval(async () => {
            try {
              const statusResponse = await axios.get(
                `${process.env.NEXT_PUBLIC_API_BASE_URL}/flims/task-status?task_id=${storedTaskId}`,
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                }
              );

              const { status, progress } = statusResponse.data;
              setProcessingProgress(progress || 0);

              if (status === "SUCCESS" || status === "COMPLETED") {
                clearInterval(pollInterval);
                setProcessingProgress(100);
                localStorage.removeItem("film_upload_task_id");
                handleUploadSuccess();
              } else if (status === "FAILURE" || status === "REVOKED") {
                clearInterval(pollInterval);
                setUploadStatus("ERROR");
                localStorage.removeItem("film_upload_task_id");
                toast.error("Processing failed. Please try again.");
              }
            } catch (error) {
              clearInterval(pollInterval);
              setUploadStatus("ERROR");
              localStorage.removeItem("film_upload_task_id");
              console.error("Polling error:", error);
              toast.error("Error checking upload status.");
            }
          }, 2000);
        }
      }
    };

    checkOngoingTask();
    
    // Cleanup on unmount
    return () => {
      if (pollInterval) {
        clearInterval(pollInterval);
      }
    };
  }, []);

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
      // const result = await uploadFilm(uploadFormData).unwrap();

      try {
        setUploadStatus("UPLOADING");
        const token = Cookies.get("accessToken");

        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/flims/upload`,
          uploadFormData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
            onUploadProgress: (progressEvent) => {
              const percentCompleted = Math.round(
                (progressEvent.loaded * 100) / progressEvent.total
              );
              setUploadProgress(percentCompleted);
            },
          }
        );

        // Brief delay to show 100% completion, then transition
        await new Promise(resolve => setTimeout(resolve, 500));

        // Check for task_id for background processing
        const taskId = response.data?.task_id;

        if (taskId) {
          setUploadStatus("PROCESSING");
          // Poll for task status
          await pollTaskStatus(taskId, token);
        } else {
          handleUploadSuccess();
        }
      } catch (error) {
        setUploadStatus("ERROR");
        console.error("Error uploading film:", error);
        if (error.response?.data?.message) {
          toast.error(error.response.data.message);
        } else {
          toast.error("Failed to upload film. Please try again.");
        }
      }
    } catch (error) {
       // Validation error catch or other synchronous errors
       console.error("Form error:", error);
    }
  };

  const pollTaskStatus = async (taskId, token) => {
    // Store task_id in localStorage for persistence
    localStorage.setItem("film_upload_task_id", taskId);
    
    // Set status to processing and stay on the page
    setUploadStatus("PROCESSING");
    setProcessingProgress(0);

    const pollInterval = setInterval(async () => {
      try {
        const statusResponse = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/flims/task-status?task_id=${taskId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const { status, progress } = statusResponse.data;
        setProcessingProgress(progress || 0);

        if (status === "SUCCESS" || status === "COMPLETED") {
          clearInterval(pollInterval);
          setProcessingProgress(100);
          // Clear task_id from localStorage
          localStorage.removeItem("film_upload_task_id");
          handleUploadSuccess();
        } else if (status === "FAILURE" || status === "REVOKED") {
          clearInterval(pollInterval);
          setUploadStatus("ERROR");
          // Clear task_id from localStorage
          localStorage.removeItem("film_upload_task_id");
          toast.error("Processing failed. Please try again.");
        }
      } catch (error) {
        clearInterval(pollInterval);
        setUploadStatus("ERROR");
        // Clear task_id from localStorage
        localStorage.removeItem("film_upload_task_id");
        console.error("Polling error:", error);
        toast.error("Error checking upload status.");
      }
    }, 2000); // Check every 2 seconds
  };

  const handleUploadSuccess = () => {
    setUploadStatus("COMPLETED");
    toast.success("Film uploaded successfully! It's now under review.");

    // Reset form after a short delay
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
      setProcessingProgress(0);
      setUploadProgress(0);
    }, 2000);
  };

  return (
    <>
      {/* Processing Progress Banner - Shows on this page only */}
      {uploadStatus === "PROCESSING" && (
        <Card className="mb-5 border-primary/50 bg-primary/5">
          <CardContent className="pt-6">
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold">Processing Your Film</h3>
                  <p className="text-sm text-muted-foreground">
                    Please wait while we optimize and process your video. This may take several minutes.
                  </p>
                </div>
                <div className="text-2xl font-bold text-primary">
                  {processingProgress}%
                </div>
              </div>
              <Progress value={processingProgress} className="h-2" />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Upload Progress Overlay - Only show during actual file upload */}
      {uploadStatus === "UPLOADING" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
          <Card className="w-full max-w-md p-6 shadow-lg border-primary/20">
             <div className="flex flex-col items-center gap-4 text-center">
              <div className="relative">
                 <div className="absolute inset-0 flex items-center justify-center">
                   <span className="text-xl font-bold">{uploadProgress}%</span>
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
                     strokeDashoffset={276 - (uploadProgress / 100) * 276}
                     strokeLinecap="round"
                     stroke="currentColor"
                     fill="transparent"
                     r="44"
                     cx="48"
                     cy="48"
                   />
                 </svg>
              </div>
              
              <div className="space-y-2">
                 <h3 className="text-xl font-semibold">Uploading Files...</h3>
                 <p className="text-sm text-muted-foreground">
                   Please wait while we upload your film content to our servers.
                 </p>
              </div>

              <div className="w-full space-y-1">
                <Progress value={uploadProgress} className="h-2" />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>0%</span>
                  <span>100%</span>
                </div>
              </div>
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
            inputDisabled={uploadStatus === "PROCESSING" || uploadStatus === "UPLOADING"}
          />
          <InputField
            label="User Email"
            name="user_email"
            value={formData.user_email}
            onChange={handleInputChange}
            placeholder="Enter your email"
            type="email"
            required
            inputDisabled={uploadStatus === "PROCESSING" || uploadStatus === "UPLOADING"}
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
            inputDisabled={uploadStatus === "PROCESSING" || uploadStatus === "UPLOADING"}
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
              disabled={uploadStatus === "PROCESSING" || uploadStatus === "UPLOADING"}
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
              inputDisabled={uploadStatus === "PROCESSING" || uploadStatus === "UPLOADING"}
            />

            {/* type */}
            <div>
              <Label>Film Type *</Label>
              <Select value={selectedType} onValueChange={setSelectedType} disabled={uploadStatus === "PROCESSING" || uploadStatus === "UPLOADING"}>
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
                disabled={uploadStatus === "PROCESSING" || uploadStatus === "UPLOADING"}
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
            disabled={uploadStatus === "PROCESSING" || uploadStatus === "UPLOADING"}
          />

          {/* Upload Trailer */}
          <UploadContent
            content={trailer}
            maxSize={500}
            accept={{ "video/*": [] }}
            label="Trailer *"
            title="Upload your film trailer"
            setContent={setTrailer}
            disabled={uploadStatus === "PROCESSING" || uploadStatus === "UPLOADING"}
          />

          {/* Upload full film */}
          <UploadContent
            content={fullFilm}
            maxSize={20000}
            accept={{ "video/*": [] }}
            label="Full Film *"
            title="Upload your full film"
            setContent={setFullFilm}
            disabled={uploadStatus === "PROCESSING" || uploadStatus === "UPLOADING"}
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
            inputDisabled={uploadStatus === "PROCESSING" || uploadStatus === "UPLOADING"}
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
            inputDisabled={uploadStatus === "PROCESSING" || uploadStatus === "UPLOADING"}
          />
        </CardContent>
      </Card>

      {/* Submit Btn */}
      <div className="text-center">
        <Button
          type="submit"
          disabled={uploadStatus === "UPLOADING" || uploadStatus === "PROCESSING"}
          className="w-full active:scale-[0.99]"
        >
          {uploadStatus === "UPLOADING"
            ? "Uploading..."
            : uploadStatus === "PROCESSING"
            ? "Processing..."
            : "Submit for review"}
        </Button>
      </div>
    </form>
    </>
  );
}
