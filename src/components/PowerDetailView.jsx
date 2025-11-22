import React from "react";
import Label from "./Label.jsx";
import ViewDetailHeader from "./ViewDetailHeader.jsx";
import ProgressBar from "./ProgressBar.jsx";
import { PowerIcon, BoltIcon } from "@heroicons/react/24/outline";

export default function PowerDetailView({
  title,
  onBack,
  statusText,
  statusColor,
  powerUsage,
  capacity = 1000,
  overhead,
}) {
  const pct = Math.min(100, Math.max(0, Math.round((powerUsage / capacity) * 100)));

  return (
    <div className="space-y-3">
      <ViewDetailHeader title={title} onBack={onBack} />

      <Label
        icon={<PowerIcon className={`h-4 w-4 ${statusColor}`} />}
        label="Status"
        value={statusText}
      />
      <Label
        icon={<BoltIcon className="h-4 w-4 text-blue-200" />}
        label="Power Usage"
        value={`${powerUsage} W`}
        progress={pct}
      />
      <Label
        icon={<PowerIcon className="h-4 w-4 text-blue-200" />}
        label="Overhead Usage"
        value={`${overhead} W`}
      />
    </div>
  );
}
