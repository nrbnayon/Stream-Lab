import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function TopEarningDistro() {
  return (
    <Card className="my-5">
      <CardHeader>
        <CardTitle>Top Earning Distro</CardTitle>
        <CardDescription>Hight earning Distro this month</CardDescription>
      </CardHeader>
      <CardContent className="grid lg:grid-cols-2 xl:grid-cols-3 gap-2 md:gap-3 lg:gap-5">
        {/* 1 */}
        <div className="flex justify-between items-center px-5 py-3 border border-white/25  rounded-md">
          <p className="flex gap-3 items-center">
            <span className="w-7 md:w-10 aspect-square bg-secondary-foreground text-card text-lg md:text-2xl grid place-items-center rounded-full font-bold">
              1
            </span>
            <span className="text-lg md:text-xl font-medium">John Doe</span>
          </p>
          <p className="text-base md:text-lg font-medium text-secondary-foreground">
            $1252.26
          </p>
        </div>
        {/* 2 */}
        <div className="flex justify-between items-center px-5 py-3 border border-white/25  rounded-md">
          <p className="flex gap-3 items-center">
            <span className="w-7 md:w-10 aspect-square bg-secondary-foreground text-card text-lg md:text-2xl grid place-items-center rounded-full font-bold">
              2
            </span>
            <span className="text-lg md:text-xl font-medium">John Doe</span>
          </p>
          <p className="text-base md:text-lg font-medium text-secondary-foreground">
            $1252.26
          </p>
        </div>
        {/* 3 */}
        <div className="flex justify-between items-center px-5 py-3 border border-white/25  rounded-md">
          <p className="flex gap-3 items-center">
            <span className="w-7 md:w-10 aspect-square bg-secondary-foreground text-card text-lg md:text-2xl grid place-items-center rounded-full font-bold">
              3
            </span>
            <span className="text-lg md:text-xl font-medium">John Doe</span>
          </p>
          <p className="text-base md:text-lg font-medium text-secondary-foreground">
            $1252.26
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
