import DistroPanel from "@/components/dashboard/user/distro/distro-panel";
import DistroStats from "@/components/dashboard/user/distro/stats";

export default function Distro() {
  return (
    <>
      <h2 className="text-4xl font-medium">Distro Panel</h2>
      <p className="text-secondary-foreground">
        Earn money by sharing films you love
      </p>

      <DistroStats />
      <DistroPanel />
    </>
  );
}
