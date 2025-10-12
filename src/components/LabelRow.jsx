import React from "react";

export default function LabelRow({
  icon = null,
  label = "",
  value = "",
  className = "",
  compact = true,
  chevron = false,
  chevronRotated = false, // rotate when the parent (e.g., accordion) is open
}) {
  const pad = compact ? "px-3 py-2.5" : "px-3.5 py-3";
  return (
    <div
      className={[
        "w-full h-14", // fixed height for consistency
        "flex items-center gap-3 rounded-2xl",
        "bg-white/[0.05] ring-1 ring-white/10 backdrop-blur-sm",
        "text-white/85",
        pad,
        className,
      ].join(" ")}
    >
      {/* icon bubble */}
      <span className="shrink-0 grid place-items-center h-8 w-8 rounded-xl bg-white/10 ring-1 ring-white/10">
        {icon ?? <span className="h-1.5 w-1.5 rounded-full bg-white/60" />}
      </span>

      {/* text */}
      <div className="flex-1 min-w-0">
        <div className="text-sm/5 text-white/70 truncate">{label}</div>
        {value ? (
          <div className="text-base font-semibold text-white truncate">
            {value}
          </div>
        ) : null}
      </div>

      {/* optional chevron (visual only; the click is handled by parent) */}
      {chevron ? (
        <svg
          className={[
            "h-4 w-4 text-white/80 transition-transform duration-200",
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
