import React, { useCallback, useMemo } from "react";
import cx from "./utils/cx";

const DEFAULT_PAD = {
  compact: "px-3 py-2.5",
  roomy: "px-3.5 py-3",
};
const BASE_SHELL = [
  "relative w-full",
  "group/row flex items-center gap-3 rounded-2xl overflow-hidden",
  "ring-1 ring-white/10 bg-white/[0.05] text-white/85 backdrop-blur-sm",
];
const HOVER_BG =
  "transition-all duration-300 hover:bg-white/[0.07] hover:ring-[rgb(var(--hover-start-rgb)/.55)] hover:shadow-[0_0_0_1px_rgba(var(--hover-start-rgb),0.45),0_6px_22px_rgba(var(--hover-start-rgb),0.18)]";
const CHIP_BASE = "relative z-10 grid place-items-center h-8 w-8 rounded-xl ring-1 ring-white/10 bg-white/10 text-white";
const CHIP_HOVER =
  "transition-all duration-300 group-hover/row:bg-[rgb(var(--hover-start-rgb))] group-hover/row:ring-[rgb(var(--hover-start-rgb))]";
const RIGHT_BTN_BASE = "grid place-items-center h-7 w-7 rounded-2xl ring-1 ring-white/10 bg-white/10";
const RIGHT_BTN_HOVER =
  "transition-all duration-300 hover:bg-[rgb(var(--hover-start-rgb))] hover:ring-[rgb(var(--hover-start-rgb))] focus:outline-none focus:ring-2 focus:ring-blue-500/70";
const TEXT_VALUE_HOVER =
  "transition-colors duration-300 text-white group-hover/text:text-[rgb(var(--hover-start-rgb))]";

/**
 * LabelRow – info pill with optional left chip, label/value, and right chevron/icon.
 * Only the chips/chevron are clickable by default. Pass `onClick` to make the whole row clickable.
 */
export default function LabelRow({
  icon = null,
  label = "",
  value = "",
  subtitle = "",
  chevron = false,
  chevronRotated = false,
  onChevronClick,
  rightIcon = null,
  onRightIconClick,
  onIconClick,
  hoverable = true,
  compact = true,
  autoHeight = false,
  onClick,
  className = "",
  as,
}) {
  const pad = compact ? DEFAULT_PAD.compact : DEFAULT_PAD.roomy;
  const heightCls = autoHeight ? "" : "h-14";
  const Component = as ?? (typeof onClick === "function" ? "button" : "div");

  const handleIconClick = useCallback(
    (e) => {
      e.stopPropagation();
      onIconClick?.(e);
    },
    [onIconClick]
  );

  const handleRightIconClick = useCallback(
    (e) => {
      e.stopPropagation();
      onRightIconClick?.(e);
    },
    [onRightIconClick]
  );

  const handleChevronClick = useCallback(
    (e) => {
      e.stopPropagation();
      onChevronClick?.(e);
    },
    [onChevronClick]
  );

  const textValueCls = hoverable ? TEXT_VALUE_HOVER : "text-white";

  const LeftChip = useMemo(() => {
    if (!icon) return <span className="h-8 w-8" aria-hidden />;

    const baseCls = cx(CHIP_BASE, hoverable && CHIP_HOVER);
    if (typeof onIconClick === "function") {
      return (
        <button
          type="button"
          onClick={handleIconClick}
          className={cx(baseCls, "focus:outline-none focus:ring-2 focus:ring-blue-500/70")}
          aria-label="action"
        >
          {icon}
        </button>
      );
    }
    return <span className={baseCls}>{icon}</span>;
  }, [handleIconClick, hoverable, icon, onIconClick]);

  const RightArea = useMemo(() => {
    if (!chevron && !rightIcon) return null;

    const rightBase = cx(RIGHT_BTN_BASE, "text-white", hoverable && CHIP_HOVER);
    const rightButtonBase = cx(RIGHT_BTN_BASE, hoverable && RIGHT_BTN_HOVER);

    return (
      <div className="relative z-10 flex items-center gap-2">
        {rightIcon
          ? typeof onRightIconClick === "function"
            ? (
              <button
                type="button"
                onClick={handleRightIconClick}
                className={rightButtonBase}
                aria-label="action"
              >
                {rightIcon}
              </button>
            )
            : <span className={rightBase}>{rightIcon}</span>
          : null}

        {chevron ? (
          <button
            type="button"
            onClick={handleChevronClick}
            className={rightButtonBase}
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
    );
  }, [chevron, chevronRotated, handleChevronClick, handleRightIconClick, hoverable, onRightIconClick, rightIcon]);

  return (
    <Component
      onClick={onClick}
      className={cx(
        BASE_SHELL,
        heightCls,
        pad,
        hoverable && HOVER_BG,
        className
      )}
      style={{ "--hover-alpha": 0.3 }}
    >
      {hoverable ? (
        <>
          <span
            aria-hidden
            className={cx(
              "pointer-events-none absolute left-1 right-1 -top-px h-px",
              "opacity-0 group-hover/row:opacity-100 transition-opacity duration-300",
              "bg-gradient-to-r from-[rgb(var(--hover-start-rgb)/.7)] via-[rgb(var(--hover-end-rgb)/.35)] to-transparent"
            )}
          />
          <span
            aria-hidden
            className={cx(
              "pointer-events-none absolute -inset-px rounded-2xl z-0",
              "opacity-0 group-hover/row:opacity-100 transition-opacity duration-300",
              "bg-[radial-gradient(120%_120%_at_10%_0%,rgba(var(--hover-start-rgb),var(--hover-alpha))_0,rgba(var(--hover-end-rgb),calc(var(--hover-alpha)*.7))_45%,transparent_65%)]"
            )}
          />
        </>
      ) : null}

      {LeftChip}

      <div className="relative z-10 flex-1 min-w-0 group/text">
        {label ? <div className="text-sm/5 text-white/70 truncate">{label}</div> : null}

        {(value || subtitle) ? (
          <div className="truncate">
            {value ? <div className={cx("text-base font-semibold truncate", textValueCls)}>{value}</div> : null}
            {subtitle ? <div className="text-xs text-white/60 truncate">{subtitle}</div> : null}
          </div>
        ) : null}
      </div>

      {RightArea}
    </Component>
  );
}
