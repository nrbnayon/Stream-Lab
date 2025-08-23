export default function MyLibraryStats() {
  return (
    <div className="grid grid-cols-2 gap-5 my-5">
      <div className="bg-secondary text-center py-5 md:py-10 rounded-md px-5 space-y-1">
        <h4 className="text-lg md:text-2xl font-medium text-secondary-foreground">
          Purchased
        </h4>
        <h2 className="text-3xl md:text-4xl font-black">13</h2>
      </div>
      <div className="bg-secondary text-center py-5 md:py-10 rounded-md px-2 space-y-1">
        <h4 className="text-lg md:text-2xl font-medium text-secondary-foreground">
          Rented
        </h4>
        <h2 className="text-3xl md:text-4xl font-black">41</h2>
      </div>
    </div>
  );
}
