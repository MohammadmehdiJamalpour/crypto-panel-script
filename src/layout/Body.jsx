import React from "react";
import Label from "../components/Label.jsx";

import PowerDetailView from "../components/PowerDetailView.jsx";
import { data } from "../data.js";
import { PowerIcon, BoltIcon } from "@heroicons/react/24/outline";

export default function Body({ className = "" }) {
  const [activeItem, setActiveItem] = React.useState(null);

  return (
    <section className={`relative flex-1 px-4 py-6 ${className}`}>
      <div className="mx-auto max-w-md ">
        {activeItem ? (
          <DetailView item={activeItem} onBack={() => setActiveItem(null)} />
        ) : (
          <MainList
            onOpen={(item) => item?.key === "powerUsage" && setActiveItem(item)}
          />
        )}
      </div>
    </section>
  );
}

function MainList({ onOpen }) {
  const statusIsOnline = data.status?.toLowerCase?.() === "online";
  const statusText = statusIsOnline ? "Online" : "Offline";
  const statusColor = statusIsOnline ? "text-emerald-300" : "text-red-300";
  const capacity = data.powerUsage?.capacity ?? 1000;
  const currentPower = data.powerUsage?.powerUsage ?? 0;
  const powerPct = Math.min(100, Math.max(0, Math.round((currentPower / capacity) * 100)));

  const items = [
    {
      key: "status",
      icon: <PowerIcon className={`h-4 w-4 ${statusColor}`} />,
      label: "Status",
      value: statusText,
      chevron: false,
    },
    {
      key: "powerUsage",
      icon: <BoltIcon className="h-4 w-4 text-blue-200" />,
      label: "Power Usage",
      value: `[${currentPower}/${capacity}] KW/h`,
      chevron: true,
      progress: powerPct,
      onClick: () => onOpen({ key: "powerUsage", title: "Power Usage" }),
      onChevronClick: () => onOpen({ key: "powerUsage", title: "Power Usage" }),
    },
    {
      key: "overhead",
      icon: <PowerIcon className="h-4 w-4 text-blue-200" />,
      label: "Overhead Usage",
      value: `${data.powerUsage?.overheadUsage?.RackA1 ?? 0} W`,
      chevron: false,
    },
  ];

  return (
    <div className="space-y-3">
      <Label items={items} />
    </div>
  );
}

function DetailView({ item, onBack }) {
  const statusIsOnline = data.status?.toLowerCase?.() === "online";
  const statusColor = statusIsOnline ? "text-emerald-300" : "text-red-300";
  const powerUsage = data.powerUsage?.powerUsage ?? 0;
  const capacity = data.powerUsage?.capacity ?? 1000;
  const overhead = data.powerUsage?.overheadUsage?.RackA1 ?? 0;

  if (item.key !== "powerUsage") {
    onBack();
    return null;
  }

  return (
    <PowerDetailView
      title={item.title}
      onBack={onBack}
      statusColor={statusColor}
      statusText={statusIsOnline ? "Online" : "Offline"}
      powerUsage={powerUsage}
      capacity={capacity}
      overhead={overhead}
    />
  );
}
