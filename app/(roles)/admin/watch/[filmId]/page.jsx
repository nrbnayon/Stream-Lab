"use client";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import VideoPlayer from "@/components/video-player/video-player";
import {
  useGetFilmDetailsQuery,
  useApproveOrRejectFilmMutation,
  useDeleteFilmMutation,
} from "@/redux/store/api/adminApi";
import {
  PlayIcon,
  CheckCircleIcon,
  XCircleIcon,
  Trash2Icon,
  AlertCircle,
} from "lucide-react";
import CircularLoader from "@/components/ui/CircularLoader";
import { secondsToHMS } from "@/lib/utils";

export default function AdminWatchPage() {
  const params = useParams();
  const router = useRouter();
  const filmId = params.filmId;

  const [trailerOpen, setTrailerOpen] = useState(false);
  const [fullFilmOpen, setFullFilmOpen] = useState(false);
  const [confirmationDialog, setConfirmationDialog] = useState({
    open: false,
    type: null,
    title: "",
    description: "",
  });

  // RTK Query hooks
  const {
    data: filmResponse,
    isLoading,
    error,
    refetch,
  } = useGetFilmDetailsQuery(filmId, {
    skip: !filmId,
  });

  const [approveOrRejectFilm, { isLoading: isActionLoading }] =
    useApproveOrRejectFilmMutation();
  const [deleteFilm, { isLoading: isDeleting }] = useDeleteFilmMutation();

  const filmDetails = filmResponse?.film_details;

  console.log(filmDetails);

  const handleApproveOrReject = async (action) => {
    try {
      await approveOrRejectFilm({
        film_id: filmId,
        action: action,
      }).unwrap();

      setConfirmationDialog({
        open: false,
        type: null,
        title: "",
        description: "",
      });

      // Show success message or redirect
      console.log(`Film ${action.toLowerCase()}d successfully`);

      // Optionally redirect back to films list
      router.push("/admin/films");
    } catch (error) {
      console.error(`Failed to ${action.toLowerCase()} film:`, error);
    }
  };

  const handleDeleteFilm = async () => {
    try {
      await deleteFilm(filmId).unwrap();
      setConfirmationDialog({
        open: false,
        type: null,
        title: "",
        description: "",
      });
      console.log("Film deleted successfully");
      router.push("/admin/films");
    } catch (error) {
      console.error("Failed to delete film:", error);
    }
  };

  const openConfirmationDialog = (type, title, description) => {
    setConfirmationDialog({
      open: true,
      type,
      title,
      description,
    });
  };

  const handleConfirmAction = () => {
    const { type } = confirmationDialog;

    switch (type) {
      case "approve":
        handleApproveOrReject("Approve");
        break;
      case "reject":
        handleApproveOrReject("Reject");
        break;
      case "delete":
        handleDeleteFilm();
        break;
      default:
        break;
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <CircularLoader
          size={60}
          thickness={5}
          gap={4}
          message="Loading film details..."
          outerColor="border-primary"
          innerColor="border-red-500"
          textColor="text-blue-600"
          className="py-12"
        />
      </div>
    );
  }

  if (error) {
    const errorMessage =
      error?.data?.message || error?.message || "Failed to load film details";

    return (
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <AlertCircle className="w-12 h-12 text-red-600 mb-4" />
            <h2 className="text-2xl font-bold text-red-600 mb-4">
              Error Loading Film
            </h2>
            <p className="text-muted-foreground mb-6 text-center max-w-md">
              {errorMessage}
            </p>
            <div className="flex gap-4">
              <Button onClick={() => refetch()}>Try Again</Button>
              <Button
                variant="outline"
                onClick={() => router.push("/admin/films")}
              >
                Back to Films
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!filmDetails) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <h2 className="text-2xl font-bold mb-4">Film Not Found</h2>
            <p className="text-muted-foreground mb-6">
              The requested film could not be found.
            </p>
            <Button onClick={() => router.push("/admin/films")}>
              Back to Films
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const formatDuration = (minutes) => {
    if (!minutes) return "N/A";
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <Button
          variant="outline"
          onClick={() => router.push("/admin/films")}
          className="mb-4"
        >
          ← Back to Films
        </Button>
        {/* Only show action buttons if film is not published */}
        {filmDetails.status?.toLowerCase() !== "published" && (
          <div className="flex gap-3">
            <Button
              onClick={() =>
                openConfirmationDialog(
                  "approve",
                  "Approve Film",
                  `Are you sure you want to approve "${filmDetails.title}"? This will make it available to users.`
                )
              }
              disabled={isActionLoading}
              className="bg-green-600 hover:bg-green-700"
            >
              <CheckCircleIcon className="w-4 h-4 mr-2" />
              {isActionLoading ? "Processing..." : "Approve"}
            </Button>
            <Button
              variant="destructive"
              onClick={() =>
                openConfirmationDialog(
                  "reject",
                  "Reject Film",
                  `Are you sure you want to reject "${filmDetails.title}"? This action will prevent it from being published.`
                )
              }
              disabled={isActionLoading}
            >
              <XCircleIcon className="w-4 h-4 mr-2" />
              {isActionLoading ? "Processing..." : "Reject"}
            </Button>
            <Button
              variant="outline"
              onClick={() =>
                openConfirmationDialog(
                  "delete",
                  "Delete Film",
                  `Are you sure you want to permanently delete "${filmDetails.title}"? This action cannot be undone and will remove all film data from the server.`
                )
              }
              disabled={isDeleting}
              className="border-red-200 text-red-600 hover:bg-primary/50"
            >
              <Trash2Icon className="w-4 h-4 mr-2" />
              {isDeleting ? "Deleting..." : "Delete"}
            </Button>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Film Details */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-3xl">{filmDetails.title}</CardTitle>
              <CardDescription className="text-lg">
                {filmDetails.film_type} • {filmDetails.year}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Genre Tags */}
              <div className="flex flex-wrap gap-2">
                {filmDetails.genre?.map((g, index) => (
                  <Badge key={index} variant="secondary">
                    {g}
                  </Badge>
                ))}
              </div>

              {/* Logline */}
              <div>
                <h3 className="font-semibold text-lg mb-2">Synopsis</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {filmDetails.logline}
                </p>
              </div>

              <Separator />

              {/* Film Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-sm text-muted-foreground">
                      Duration
                    </h4>
                    <p className="font-semibold">
                      {secondsToHMS(filmDetails.full_film_duration)}
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium text-sm text-muted-foreground">
                      Type
                    </h4>
                    <p className="font-semibold">{filmDetails.film_type}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-sm text-muted-foreground">
                      Year
                    </h4>
                    <p className="font-semibold">{filmDetails.year}</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-sm text-muted-foreground">
                      Buy Price
                    </h4>
                    <p className="font-semibold text-green-600">
                      ${filmDetails.buy_price}
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium text-sm text-muted-foreground">
                      Rent Price
                    </h4>
                    <p className="font-semibold text-blue-600">
                      ${filmDetails.rent_price}
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium text-sm text-muted-foreground">
                      Film ID
                    </h4>
                    <p className="font-mono text-sm">{filmDetails.id}</p>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Action Buttons for Videos */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Dialog open={trailerOpen} onOpenChange={setTrailerOpen}>
                  <DialogTrigger asChild>
                    <Button
                      className="flex-1"
                      disabled={!filmDetails.trailer_hls_url}
                    >
                      <PlayIcon className="w-4 h-4 mr-2" />
                      Watch Trailer
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl w-full">
                    <DialogHeader>
                      <DialogTitle>{filmDetails.title} — Trailer</DialogTitle>
                      <DialogDescription>
                        Watch the official trailer
                      </DialogDescription>
                    </DialogHeader>
                    <div className="relative">
                      <VideoPlayer
                        src={filmDetails.trailer_hls_url}
                        autoPlay={trailerOpen}
                        controls={true}
                        muted={false}
                      />
                    </div>
                  </DialogContent>
                </Dialog>

                <Dialog open={fullFilmOpen} onOpenChange={setFullFilmOpen}>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      className="flex-1"
                      disabled={!filmDetails.film_hls_url}
                    >
                      <PlayIcon className="w-4 h-4 mr-2" />
                      Watch Full Film
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-5xl w-full">
                    <DialogHeader>
                      <DialogTitle>{filmDetails.title} — Full Film</DialogTitle>
                      <DialogDescription>
                        Admin review of the complete film
                      </DialogDescription>
                    </DialogHeader>
                    <div className="relative">
                      <VideoPlayer
                        src={filmDetails.film_hls_url}
                        autoPlay={fullFilmOpen}
                        controls={true}
                        muted={false}
                        filmId={filmDetails.id}
                        isFullFilm={true}
                      />
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Thumbnail and Quick Actions */}
        <div className="lg:col-span-1">
          <Card>
            <CardContent className="p-6">
              {/* Thumbnail */}
              <div className="relative aspect-[2/3] mb-6 rounded-lg overflow-hidden">
                <Image
                  src={filmDetails.thumbnail || "/placeholder-image.jpg"}
                  alt={filmDetails.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>

              {/* Quick Stats */}
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Quick Review</h3>

                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">
                      Has Trailer:
                    </span>
                    <Badge
                      variant={
                        filmDetails.trailer_hls_url ? "success" : "destructive"
                      }
                    >
                      {filmDetails.trailer_hls_url ? "Yes" : "No"}
                    </Badge>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">
                      Has Full Film:
                    </span>
                    <Badge
                      variant={
                        filmDetails.film_hls_url ? "success" : "destructive"
                      }
                    >
                      {filmDetails.film_hls_url ? "Yes" : "No"}
                    </Badge>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">
                      Has Thumbnail:
                    </span>
                    <Badge
                      variant={
                        filmDetails.thumbnail ? "success" : "destructive"
                      }
                    >
                      {filmDetails.thumbnail ? "Yes" : "No"}
                    </Badge>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">
                      Pricing Set:
                    </span>
                    <Badge
                      variant={
                        filmDetails.buy_price > 0 || filmDetails.rent_price > 0
                          ? "success"
                          : "secondary"
                      }
                    >
                      {filmDetails.buy_price > 0 || filmDetails.rent_price > 0
                        ? "Yes"
                        : "No"}
                    </Badge>
                  </div>
                </div>

                <Separator />

                {/* Quick Action Notes */}
                <div className="text-sm text-muted-foreground space-y-2">
                  <p>
                    <strong>Review Checklist:</strong>
                  </p>
                  <ul className="list-disc list-inside space-y-1 ml-2">
                    <li>Content quality and appropriateness</li>
                    <li>Technical quality (video/audio)</li>
                    <li>Metadata accuracy</li>
                    <li>Pricing reasonableness</li>
                    <li>Thumbnail appropriateness</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Confirmation Dialog */}
      <AlertDialog
        open={confirmationDialog.open}
        onOpenChange={(open) =>
          !open &&
          setConfirmationDialog({
            open: false,
            type: null,
            title: "",
            description: "",
          })
        }
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{confirmationDialog.title}</AlertDialogTitle>
            <AlertDialogDescription>
              {confirmationDialog.description}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isActionLoading || isDeleting}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmAction}
              disabled={isActionLoading || isDeleting}
              className={
                confirmationDialog.type === "delete" ||
                confirmationDialog.type === "reject"
                  ? "bg-primary hover:bg-primary/90"
                  : confirmationDialog.type === "approve"
                  ? "bg-green-600 hover:bg-green-700"
                  : ""
              }
            >
              {isActionLoading || isDeleting ? "Processing..." : "Confirm"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
