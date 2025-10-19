// src/components/atoms/PlusButton.jsx
import React from "react";

export default function PlusButton({
  onClick,
  ariaLabel = "Add",
  className = "",
  size = 28, // 28px -> ~ h-7 w-7
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      className={[
        "grid place-items-center rounded-2xl",
        "ring-1 ring-white/10 bg-white/10 text-white",
        "transition-all duration-200",
        "hover:bg-[rgb(var(--hover-start-rgb))] hover:ring-[rgb(var(--hover-start-rgb))]",
        "focus:outline-none focus:ring-2 focus:ring-blue-500/70",
        className,
      ].join(" ")}
      style={{ width: size, height: size }}
    >
      {/* You can swap this with @heroicons PlusIcon if you prefer */}
      <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
        <path
          fillRule="evenodd"
          d="M10 3.25a.75.75 0 01.75.75v5.25h5.25a.75.75 0 010 1.5H10.75v5.25a.75.75 0 01-1.5 0V10.75H4a.75.75 0 010-1.5h5.25V4a.75.75 0 01.75-.75z"
          clipRule="evenodd"
        />
      </svg>
    </button>
  );
}
