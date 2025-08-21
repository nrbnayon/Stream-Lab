import FilmUploadForm from "@/components/dashboard/user/submit-film/film-upload-form";

export default function SubmitFilm() {
  return (
    <div>
      <h2 className="text-4xl font-medium">Submit New Film</h2>
      <p className="text-secondary-foreground">
        Share your creation with the world
      </p>

      <FilmUploadForm />
    </div>
  );
}
