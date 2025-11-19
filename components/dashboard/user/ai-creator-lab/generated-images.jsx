import ImageCard from "./image-card";

export default function GeneratedImages({ images = [] }) {
  return images.length ? (
    <div className="my-5 flex gap-5 flex-wrap">
      {images.map((image, i) => (
        <ImageCard key={image?.id ?? i} image={image} />
      ))}
    </div>
  ) : (
    <p className="text-destructive text-center my-5">
      You have&apos;nt generated any image yet
    </p>
  );
}
