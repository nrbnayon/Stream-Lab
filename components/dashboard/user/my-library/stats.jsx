export default function MyLibraryStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-10">
      <div className="bg-secondary text-center py-10 rounded-md px-2 space-y-1">
        <h4 className="text-2xl font-medium text-secondary-foreground">
          Purchased
        </h4>
        <h2 className="text-4xl font-black">13</h2>
      </div>
      <div className="bg-secondary text-center py-10 rounded-md px-2 space-y-1">
        <h4 className="text-2xl font-medium text-secondary-foreground">
          Rented
        </h4>
        <h2 className="text-4xl font-black">41</h2>
      </div>
    </div>
  );
}
