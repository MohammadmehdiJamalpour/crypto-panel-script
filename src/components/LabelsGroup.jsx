import React from "react";
import LabelRow from "./LabelRow.jsx";

export default function LabelsGroup({ items = [], className = "" }) {
  return (
    <div className={["w-full space-y-2", className].join(" ")}>
      {items.map((it, i) => (
        <LabelRow
          key={i}
          icon={it.icon}
          label={it.label}
          value={it.value}
          // chevron = false → these are informational only
          chevron={false}
        />
      ))}
    </div>
  );
}
