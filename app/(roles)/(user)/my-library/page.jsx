import PurchasedMovies from "@/components/dashboard/user/my-library/purchased-movies";
import MyLibraryStats from "@/components/dashboard/user/my-library/stats";

export default function MyLibrary() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl md:text-4xl font-medium">My Library</h2>
        <p className="text-secondary-foreground">
          Your purchased and rented films
        </p>
      </div>

      {/* <MyLibraryStats /> */}
      <PurchasedMovies />
    </div>
  );
}
