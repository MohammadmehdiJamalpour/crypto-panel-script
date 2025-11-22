import React from "react";

/**
 * IconChip
 * - Fixed size: h-7 w-7 (locked)
 * - Hover behavior:
 *   - hoverMode="self"  → only when the chip is hovered
 *   - hoverMode="group" → when the parent with class `group/<groupName>` is hovered
 */
export default function IconChip({
  node,
  onClick,                 // optional
  ariaLabel,
  className = "",
  hoverMode = "self",      // "self" | "group"
  groupName = "row",       // used only when hoverMode="group"
}) {
  const base =
    "grid place-items-center rounded-2xl " +
    "bg-white/10 ring-1 ring-white/10 text-white " +
    "transition-colors duration-200";

  const selfHover =
    "hover:bg-blue-500/20 " +
    "hover:ring-blue-500/40 " +
    "hover:text-blue-200";

  const groupHover =
    `group-hover/${groupName}:bg-blue-500/20 ` +
    `group-hover/${groupName}:ring-blue-500/40 ` +
    `group-hover/${groupName}:text-blue-200`;

  // lock size so callers can't change it
  const sizeLock = "h-7 w-7";

  const cls = [base, hoverMode === "group" ? groupHover : selfHover, className, sizeLock]
    .filter(Boolean)
    .join(" ");

  if (typeof onClick === "function") {
    return (
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onClick?.(e);
        }}
        className={[cls, "focus:outline-none focus:ring-2 focus:ring-blue-500/70"].join(" ")}
        aria-label={ariaLabel}
      >
        {node}
      </button>
    );
  }

  return <span className={cls}>{node}</span>;
}
