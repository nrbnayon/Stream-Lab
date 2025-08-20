import PurchasedMovies from "@/components/dashboard/user/my-library/purchased-movies";
import MyLibraryStats from "@/components/dashboard/user/my-library/stats";

export default function MyLibrary() {
  return (
    <>
      <h2 className="text-4xl font-medium">My Library</h2>
      <p className="text-secondary-foreground">
        Your purchased and rented films
      </p>
      <MyLibraryStats />

      {/* TODO: fetch and pass data as para */}
      <PurchasedMovies />
    </>
  );
}
