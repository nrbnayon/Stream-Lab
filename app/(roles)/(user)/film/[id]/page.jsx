import RelatedMovies from "@/components/dashboard/user/film-details/related-movies";
import VideoPlayerClient from "@/components/dashboard/user/film-details/video-player-client";
import TrailerPopup from "@/components/trailer-popup";
import { Button } from "@/components/ui/button";
import WebShare from "@/components/web-share";

export default async function FilmDetails({ params }) {
  const { id } = params;

  return (
    <div className="grid gap-5">
      <VideoPlayerClient />

      {/* Details section */}
      <section className="my-5 space-y-5">
        <h2 className="text-4xl font-medium">Movie Title</h2>

        {/* Details */}
        <div className="table text-lg text-muted-foreground">
          <div className="table-row">
            <div className="table-cell font-medium pr-12">Year:</div>
            <div className="table-cell">2024</div>
          </div>
          <div className="table-row">
            <div className="table-cell font-medium pr-12">Genre:</div>
            <div className="table-cell">Action, Sci-Fi</div>
          </div>
          <div className="table-row">
            <div className="table-cell font-medium pr-12">Type:</div>
            <div className="table-cell">Movie</div>
          </div>
          <div className="table-row">
            <div className="table-cell font-medium pr-12">Duration:</div>
            <div className="table-cell">2h 15m</div>
          </div>
          <div className="table-row">
            <div className="table-cell font-medium pr-12">Description:</div>
            <div className="table-cell">
              Avengers: Infinity War is the third Avengers film in the Marvel
              Cinematic Universe (MCU) and one of the most ambitious crossover
              movies in cinematic history.
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="space-x-2">
          <TrailerPopup absolute={false} />
          <WebShare url="url" title="Title" />
        </div>
      </section>

      {/* Related Videos */}
      <RelatedMovies />
    </div>
  );
}
