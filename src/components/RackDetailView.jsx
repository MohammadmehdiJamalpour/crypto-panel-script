import React from "react";
import Label from "./Label.jsx";
import DetailLayout from "./DetailLayout.jsx";
import { WrenchIcon } from "@heroicons/react/24/outline";

export default function RackDetailView({ title, onBack, rackSection }) {
  const racks = rackSection?.racks || [];
  const total = racks.length;
  const online = racks.filter((r) => r.rackStatus === "online").length;
  const critical = racks.filter((r) => r.overallMinersHealth === "critical").length;

  const items = [
    { icon: <WrenchIcon className="h-4 w-4 text-blue-200" />, label: "Total Racks", value: `${total}` },
    { icon: <WrenchIcon className="h-4 w-4 text-blue-200" />, label: "Online", value: `${online}` },
    { icon: <WrenchIcon className="h-4 w-4 text-blue-200" />, label: "Critical Health", value: `${critical}` },
  ];

  return (
    <DetailLayout title={title} onBack={onBack}>
      <Label items={items} />
    </DetailLayout>
  );
}
