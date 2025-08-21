export default function MyTitlesStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 my-5">
      <div className="bg-secondary text-center py-10 rounded-md px-2 space-y-1">
        <h4 className="text-2xl font-medium text-secondary-foreground">
          Total Films
        </h4>
        <h2 className="text-4xl font-black">7</h2>
      </div>
      <div className="bg-secondary text-center py-10 rounded-md px-2 space-y-1">
        <h4 className="text-2xl font-medium text-secondary-foreground">
          Published
        </h4>
        <h2 className="text-4xl font-black">4</h2>
      </div>
      <div className="bg-secondary text-center py-10 rounded-md px-2 space-y-1">
        <h4 className="text-2xl font-medium text-secondary-foreground">
          Total Views
        </h4>
        <h2 className="text-4xl font-black">4000</h2>
      </div>
      <div className="bg-secondary text-center py-10 rounded-md px-2 space-y-1">
        <h4 className="text-2xl font-medium text-secondary-foreground">
          Total Earning
        </h4>
        <h2 className="text-4xl font-black text-green-500">$40</h2>
      </div>
    </div>
  );
}
