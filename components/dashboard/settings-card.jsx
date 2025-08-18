import { HugeiconsIcon } from "@hugeicons/react";

export default function SettingsCard({ title, description, icon }) {
  return (
    <div className="bg-secondary p-4 rounded-md flex items-center gap-5">
      <HugeiconsIcon icon={icon} size={40} />
      <div className="text-left">
        <h4 className="text-lg font-semibold">{title}</h4>
        <p className="text-secondary-foreground">{description}</p>
      </div>
    </div>
  );
}
