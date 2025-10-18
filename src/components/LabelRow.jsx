import React from "react";

function cx(...parts) {
  return parts.flat().filter(Boolean).join(" ");
}

/**
 * LabelRow – info pill with optional left chip, label/value, and right chevron/icon.
 * Only the chips/chevron are clickable by default. Pass `onClick` to make the whole row clickable.
 */
export default function LabelRow({
  // content
  icon = null,
  label = "",
  value = "",
  subtitle = "",

  // right side
  chevron = false,
  chevronRotated = false,
  onChevronClick,            // click handler for chevron only
  rightIcon = null,
  onRightIconClick,          // click handler for right icon only

  // left chip click
  onIconClick,               // click handler for left icon only

  // behavior + style
  hoverable = true,
  compact = true,
  autoHeight = false,        // false => fixed h-14; true => let content define height
  onClick,                   // optional: click whole row
  className = "",
  as,                        // force element type: 'div' | 'button'; otherwise inferred from onClick
}) {
  const pad = compact ? "px-3 py-2.5" : "px-3.5 py-3";
  const heightCls = autoHeight ? "" : "h-14";
  const Component = as ?? (typeof onClick === "function" ? "button" : "div");

  const hoverShellCls = hoverable
    ? "transition-all duration-300 hover:bg-white/[0.07] hover:ring-[rgb(var(--hover-start-rgb)/.55)] hover:shadow-[0_0_0_1px_rgba(var(--hover-start-rgb),0.45),0_6px_22px_rgba(var(--hover-start-rgb),0.18)]"
    : "";

  const textValueCls = hoverable
    ? "transition-colors duration-300 text-white group-hover/text:text-[rgb(var(--hover-start-rgb))]"
    : "text-white";

  // Left chip: button if onIconClick, else span
  const LeftChip = icon ? (
    typeof onIconClick === "function" ? (
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onIconClick?.(e);
        }}
        className={cx(
          "relative z-10 grid place-items-center h-8 w-8 rounded-xl",
          "ring-1 ring-white/10 bg-white/10 text-white",
          hoverable &&
            "transition-all duration-300 group-hover/row:bg-[rgb(var(--hover-start-rgb))] group-hover/row:ring-[rgb(var(--hover-start-rgb))] focus:outline-none focus:ring-2 focus:ring-blue-500/70"
        )}
        aria-label="action"
      >
        {icon}
      </button>
    ) : (
      <span
        className={cx(
          "relative z-10 grid place-items-center h-8 w-8 rounded-xl",
          "ring-1 ring-white/10 bg-white/10 text-white",
          hoverable &&
            "transition-all duration-300 group-hover/row:bg-[rgb(var(--hover-start-rgb))] group-hover/row:ring-[rgb(var(--hover-start-rgb))]"
        )}
      >
        {icon}
      </span>
    )
  ) : (
    <span className="h-8 w-8" aria-hidden />
  );

  // Right chevron/icon area: each gets its own target
  const RightArea =
    chevron || rightIcon ? (
      <div className="relative z-10 flex items-center gap-2">
        {rightIcon ? (
          typeof onRightIconClick === "function" ? (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onRightIconClick?.(e);
              }}
              className={cx(
                "grid place-items-center h-7 w-7 rounded-2xl",
                "ring-1 ring-white/10 bg-white/10 text-white",
                hoverable &&
                  "transition-all duration-300 hover:bg-[rgb(var(--hover-start-rgb))] hover:ring-[rgb(var(--hover-start-rgb))] focus:outline-none focus:ring-2 focus:ring-blue-500/70"
              )}
              aria-label="action"
            >
              {rightIcon}
            </button>
          ) : (
            <span
              className={cx(
                "grid place-items-center h-7 w-7 rounded-2xl",
                "ring-1 ring-white/10 bg-white/10 text-white",
                hoverable &&
                  "transition-all duration-300 group-hover/row:bg-[rgb(var(--hover-start-rgb))] group-hover/row:ring-[rgb(var(--hover-start-rgb))]"
              )}
            >
              {rightIcon}
            </span>
          )
        ) : null}

        {chevron ? (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onChevronClick?.(e);
            }}
            className={cx(
              "grid place-items-center h-7 w-7 rounded-2xl",
              "ring-1 ring-white/10 bg-white/10",
              hoverable &&
                "transition-all duration-300 hover:bg-[rgb(var(--hover-start-rgb))] hover:ring-[rgb(var(--hover-start-rgb))] focus:outline-none focus:ring-2 focus:ring-blue-500/70"
            )}
            aria-label={chevronRotated ? "collapse" : "expand"}
          >
            <svg
              className={cx(
                "h-4 w-4 text-white transition-transform duration-200",
                chevronRotated && "rotate-180"
              )}
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden
            >
              <path d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z" />
            </svg>
          </button>
        ) : null}
      </div>
    ) : null;

  return (
    <Component
      onClick={onClick}
      className={cx(
        "relative w-full",
        heightCls,
        "group/row flex items-center gap-3 rounded-2xl overflow-hidden",
        "ring-1 ring-white/10 bg-white/[0.05] text-white/85 backdrop-blur-sm",
        pad,
        hoverShellCls,
        className
      )}
      // default hover alpha for radial bg
      style={{ "--hover-alpha": 0.3 }}
    >
      {/* Top blue highlight line */}
      {hoverable && (
        <span
          aria-hidden
          className={cx(
            "pointer-events-none absolute left-1 right-1 -top-px h-px",
            "opacity-0 group-hover/row:opacity-100 transition-opacity duration-300",
            "bg-gradient-to-r from-[rgb(var(--hover-start-rgb)/.7)] via-[rgb(var(--hover-end-rgb)/.35)] to-transparent"
          )}
        />
      )}

      {/* Radial blue glow background */}
      {hoverable && (
        <span
          aria-hidden
          className={cx(
            "pointer-events-none absolute -inset-px rounded-2xl z-0",
            "opacity-0 group-hover/row:opacity-100 transition-opacity duration-300",
            // arbitrary value with CSS vars supported by Tailwind JIT
            "bg-[radial-gradient(120%_120%_at_10%_0%,rgba(var(--hover-start-rgb),var(--hover-alpha))_0,rgba(var(--hover-end-rgb),calc(var(--hover-alpha)*.7))_45%,transparent_65%)]"
          )}
        />
      )}

      {/* Left icon */}
      {LeftChip}

      {/* Text block */}
      <div className="relative z-10 flex-1 min-w-0 group/text">
        {label ? (
          <div className="text-sm/5 text-white/70 truncate">{label}</div>
        ) : null}

        {(value || subtitle) && (
          <div className="truncate">
            {value ? <div className={cx("text-base font-semibold truncate", textValueCls)}>{value}</div> : null}
            {subtitle ? <div className="text-xs text-white/60 truncate">{subtitle}</div> : null}
          </div>
        )}
      </div>

      {/* Right side actions */}
      {RightArea}
    </Component>
  );
}
