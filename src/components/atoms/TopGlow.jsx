import React from "react";
import cx from "../utils/cx";

/** Thin top blue highlight shown on hover (expects parent .group-hover/row). */
export default function TopGlow({ className = "" }) {
  return (
    <span
      aria-hidden
      className={cx(
        "pointer-events-none absolute left-1 right-1 -top-px h-px opacity-0",
        "group-hover/row:opacity-100 transition-opacity",
        "bg-gradient-to-r from-[rgb(var(--hover-start-rgb)/.7)] via-[rgb(var(--hover-end-rgb)/.35)] to-transparent",
        className
      )}
    />
  );
}
