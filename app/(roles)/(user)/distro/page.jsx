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
        Turn Your Audience into Revenue <br />
        Share titles you believe in. Get paid for every purchase.
      </p>

      <DistroStats />
      <QuickShare />
      <YourPerformance />
    </>
  );
}
