// app\(roles)\(user)\distro\page.jsx
import QuickShare from "@/components/dashboard/user/distro/quick-share";
import DistroStats from "@/components/dashboard/user/distro/stats";
import YourPerformance from "@/components/dashboard/user/distro/your-performance";

export default function Distro() {
  return (
    <>
      <h2 className="text-3xl md:text-4xl font-medium">
        Turn Followers into Paydays
      </h2>
      <p className="text-secondary-foreground max-w-3xl">
        Pick. Share. Earn. <br />
        Choose a title, share your Distro link, or QR code and get paid. Cash
        out or transfer earnings into ReelBux to get more films, series, and AI
        Creator tools.
      </p>

      <DistroStats />
      <QuickShare />
      <YourPerformance />
    </>
  );
}
