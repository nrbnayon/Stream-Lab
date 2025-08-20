import VideoCard from "./video-card";

export default function GeneratedVideos({ videos = [0, 1, 2] }) {
  return videos.length ? (
    <div className="my-5 flex gap-5 flex-wrap">
      {videos.map((video, i) => (
        <VideoCard key={i} />
      ))}
    </div>
  ) : (
    <p className="text-destructive text-center my-5">
      You have&apos;nt generated any video yet
    </p>
  );
}
