import React from "react";
import ViewDetailHeader from "./ViewDetailHeader.jsx";

export default function DetailLayout({ title, onBack, children }) {
  return (
    <div className="space-y-3">
      <ViewDetailHeader title={title} onBack={onBack} />
      {children}
    </div>
  );
}
