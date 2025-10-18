import React from "react";
import cx from "../utils/cx";

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
    "hover:bg-[rgb(var(--hover-start-rgb))] " +
    "hover:ring-[rgb(var(--hover-start-rgb))]";

  const groupHover =
    `group-hover/${groupName}:bg-[rgb(var(--hover-start-rgb))] ` +
    `group-hover/${groupName}:ring-[rgb(var(--hover-start-rgb))]`;

  // lock size so callers can't change it
  const sizeLock = "h-7 w-7";

  const cls = cx(
    base,
    hoverMode === "group" ? groupHover : selfHover,
    className,
    sizeLock
  );

  if (typeof onClick === "function") {
    return (
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onClick?.(e);
        }}
        className={cx(
          cls,
          "focus:outline-none focus:ring-2 focus:ring-blue-500/70"
        )}
        aria-label={ariaLabel}
      >
        {node}
      </button>
    );
  }

  return <span className={cls}>{node}</span>;
}
