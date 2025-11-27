import React from "react";
import DetailLayout from "../ui/detail/DetailLayout.jsx";
import { InformationCircleIcon } from "@heroicons/react/24/outline";

export default function InfoDetailView({ title, info, onBack }) {
  const sections = info?.sections || [];

  return (
    <DetailLayout title={title} onBack={onBack}>
      <div className="space-y-4">
        {sections.map((section, idx) => (
          <div
            key={section.title || idx}
            className="rounded-2xl bg-white/5 ring-1 ring-white/10 px-4 py-3 space-y-2"
          >
            <div className="flex items-center gap-2 text-white/90 font-semibold">
              <InformationCircleIcon className="h-4 w-4 text-blue-200" />
              <span>{section.title || "Section"}</span>
            </div>
            <div className="space-y-1 text-sm text-white/75">
              {(section.items || []).map((item, i) => {
                const text = typeof item === "string" ? item : item?.text || item?.label || "Info";
                const value = typeof item === "object" ? item?.value : null;
                return (
                  <div key={i} className="leading-relaxed">
                    <p>{text}</p>
                    {value ? <p className="text-white/60 mt-0.5">{value}</p> : null}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </DetailLayout>
  );
}
