import React from "react";

/** Thin top blue highlight shown on hover (expects parent .group-hover/row). */
export default function TopGlow({ className = "" }) {
  return (
    <span
      aria-hidden
      className={[
        "pointer-events-none absolute left-1 right-1 -top-px h-px opacity-0",
        "group-hover/row:opacity-100 transition-opacity",
        "bg-white/30",
        className,
      ].filter(Boolean).join(" ")}
    />
  );
}
