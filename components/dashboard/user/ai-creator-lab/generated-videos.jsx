import VideoCard from "./video-card";

export default function GeneratedVideos({ videos = [] }) {
  return videos.length ? (
    <div className="my-5 flex gap-5 flex-wrap">
      {videos.map((video, i) => (
        <VideoCard key={video?.id ?? i} video={video} />
      ))}
    </div>
  ) : (
    <p className="text-destructive text-center my-5">
      You have&apos;nt generated any video yet
    </p>
  );
}
