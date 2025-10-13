// src/components/LabelRow.jsx
import React from "react";

export default function LabelRow({
  icon = null,
  label = "",
  value = "",
  className = "",
  compact = true,
  chevron = false,
  chevronRotated = false,
  hoverable = true,
}) {
  const pad = compact ? "px-3 py-2.5" : "px-3.5 py-3";

  return (
    <div
      className={[
        "relative w-full h-14",
        "group flex items-center gap-3 rounded-2xl",
        "ring-1 ring-white/10 bg-white/[0.05] text-white/85 backdrop-blur-sm",
        pad,
        hoverable
          ? [
              "transition-all duration-300",
              "hover:bg-white/[0.07] hover:ring-blue-500/30",
              "hover:[box-shadow:0_0_0_1px_rgb(96_165_250_/_0.15),0_6px_24px_-12px_rgb(0_0_0_/_0.5)]",
            ].join(" ")
          : "",
        className,
      ].join(" ")}
    >
      {/* Radial blue glow (uses variables & tailwind bg) */}
      {hoverable && (
        <span
          aria-hidden
          className={[
            "pointer-events-none absolute -inset-px rounded-2xl z-0",
            "opacity-0 group-hover:opacity-100 transition-opacity duration-300",
            "bg-hover-radial",         // <— from tailwind.config.js
            "hover-alpha-30",          // default 30% (or inline: [--hover-alpha:0.30])
          ].join(" ")}
        />
      )}

      {/* icon bubble */}
      <span
        className={[
          "relative z-10",
          "shrink-0 grid place-items-center h-8 w-8 rounded-xl",
          "ring-1 ring-white/10 bg-white/10",
          hoverable ? "transition-colors duration-300 group-hover:bg-hover-start/20" : "",
        ].join(" ")}
      >
        {icon ?? <span className="h-1.5 w-1.5 rounded-full bg-white/60" />}
      </span>

      {/* text */}
      <div className="relative z-10 flex-1 min-w-0">
        <div className="text-sm/5 text-white/70 truncate">{label}</div>
        {value ? (
          <div
            className={[
              "text-base font-semibold truncate",
              hoverable ? "transition-colors duration-300 text-white group-hover:text-hover-start/90" : "text-white",
            ].join(" ")}
          >
            {value}
          </div>
        ) : null}
      </div>

      {/* optional chevron for accordion headers */}
      {chevron ? (
        <svg
          className={[
            "relative z-10 h-4 w-4 transition-transform duration-200",
            hoverable ? "text-white/80 group-hover:text-hover-start/90" : "text-white/80",
            chevronRotated ? "rotate-180" : "",
          ].join(" ")}
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden
        >
          <path d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z" />
        </svg>
      ) : null}
    </div>
  );
}
