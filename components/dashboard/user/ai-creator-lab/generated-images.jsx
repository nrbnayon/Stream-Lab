import ImageCard from "./image-card";

export default function GeneratedImages({ images = [0, 1, 2, 3] }) {
  return images.length ? (
    <div className="my-5 flex gap-5 flex-wrap">
      {images.map((image, i) => (
        <ImageCard key={i} />
      ))}
    </div>
  ) : (
    <p className="text-destructive text-center my-5">
      You have&apos;nt generated any image yet
    </p>
  );
}
