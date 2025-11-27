import React, { useCallback } from "react";
import { ChevronRightIcon } from "@heroicons/react/20/solid";

const DEFAULT_PAD = {
  compact: "px-3 py-2.5",
  roomy: "px-3.5 py-3",
};
const BASE_SHELL = [
  "relative w-full",
  "group/row flex items-center gap-3 rounded-2xl overflow-hidden",
  "ring-1 ring-white/10 bg-white/[0.05] text-white/85 backdrop-blur-sm",
];
const HOVER_BG = "transition-all duration-200 hover:bg-white/10 hover:ring-white/30";
const CHIP_BASE = "relative z-10 grid place-items-center h-8 w-8 rounded-xl ring-1 ring-white/10 bg-white/10 text-white";
const CHIP_HOVER =
  "transition-all duration-200 group-hover/row:bg-blue-500/20 group-hover/row:ring-blue-500/40 group-hover/row:text-blue-200";
const RIGHT_BTN_BASE = "grid place-items-center h-7 w-7 rounded-2xl ring-1 ring-white/10 bg-white/10";
const RIGHT_BTN_HOVER = "transition-all duration-200 hover:bg-white/10 hover:ring-white/30 focus:outline-none focus:ring-2 focus:ring-blue-500/70";
const TEXT_VALUE_HOVER = "transition-colors duration-200 text-white group-hover/text:text-white";

function cx(...parts) {
  return parts.flat().filter(Boolean).join(" ");
}

function InlineLabelRow({
  icon = null,
  label = "",
  value = "",
  subtitle = "",
  progress = null, // optional number 0-100 to render a progress bar
  chevron = false,
  chevronRotated = false,
  chevronIcon,
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
  disabled = false,
}) {
  const pad = compact ? DEFAULT_PAD.compact : DEFAULT_PAD.roomy;
  const heightCls = autoHeight ? "" : "h-14";
  const Component = as ?? "div";
  const clickable = typeof onClick === "function" && !disabled;

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

  const baseShell = cx(
    BASE_SHELL,
    heightCls,
    pad,
    hoverable && !disabled && HOVER_BG,
    clickable && "cursor-pointer",
    disabled && "opacity-60 cursor-not-allowed",
    className
  );

  const chipCls = cx(CHIP_BASE, hoverable && CHIP_HOVER);
  const rightBase = cx(RIGHT_BTN_BASE, "text-white", hoverable && CHIP_HOVER);
  const rightButtonBase = cx(RIGHT_BTN_BASE, hoverable && RIGHT_BTN_HOVER);

  const LeftChip = () => {
    if (!icon) return <span className="h-8 w-8" aria-hidden />;
    if (typeof onIconClick === "function") {
      return (
        <button
          type="button"
          onClick={handleIconClick}
          className={cx(chipCls, "focus:outline-none focus:ring-2 focus:ring-blue-500/70")}
          aria-label="action"
        >
          {icon}
        </button>
      );
    }
    return <span className={chipCls}>{icon}</span>;
  };

  const RightArea = () => {
    if (!chevron && !rightIcon) return null;

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
            {chevronIcon ? (
              chevronIcon
            ) : (
              <ChevronRightIcon
                className={cx(
                  "h-4 w-4 text-white transition-transform duration-200",
                  chevronRotated && "rotate-180"
                )}
              />
            )}
          </button>
        ) : null}
      </div>
    );
  };

  const minHeight = !autoHeight && value && typeof progress === "number" ? "calc(3.5rem + 20px)" : undefined;

  return (
    <Component
      onClick={onClick}
      className={baseShell}
      role={clickable ? "button" : undefined}
      tabIndex={clickable ? 0 : undefined}
      style={{ "--hover-alpha": 0.3, minHeight }}
    >
      {hoverable ? (
        <span
          aria-hidden
          className={cx(
            "pointer-events-none absolute inset-0 rounded-2xl z-0",
            "opacity-0 group-hover/row:opacity-100 transition-opacity duration-200",
            "bg-white/5"
          )}
        />
      ) : null}

      <LeftChip />

      <div className="relative z-10 flex-1 min-w-0 group/text">
        {label ? (
          <div className="text-sm/5 flex text-white/70 truncate transition-colors duration-200 group-hover/row:text-blue-100">
            {label}
          </div>
        ) : null}

        {(value || subtitle) ? (
          <div className="truncate mx-auto flex ">
            {value ? (
              <div className={cx("text-base font-semibold truncate text-white/85 transition-colors duration-200 group-hover/text:text-blue-100", textValueCls)}>
                {value}
              </div>
            ) : null}
            {subtitle ? (
              <div className="text-xs text-white/60 truncate transition-colors duration-200 group-hover/text:text-blue-200">
                {subtitle}
              </div>
            ) : null}
          </div>
        ) : null}

        {typeof progress === "number" ? (
          <div className="mt-2 w-full">
            <div className="w-full rounded-full bg-white/10 ring-1 ring-white/10 overflow-hidden h-2">
              <div
                className="h-full rounded-full transition-[width] duration-300 ease-out bg-green-500"
                style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
              />
            </div>
          </div>
        ) : null}
      </div>

      <RightArea />
    </Component>
  );
}

/**
 * Unified label component.
 * - Render a single label via props, or multiple labels via `items`.
 * - Each item supports all LabelRow options (icon, value, subtitle, chevron, rightIcon, etc).
 */
export default function Label({
  items,
  className = "",
  itemClassName = "",
  ...singleProps
}) {
  const list = Array.isArray(items) && items.length > 0 ? items : [singleProps];

  return (
    <div className={cx("space-y-2", className)}>
      {list.map((item, idx) => {
        const { key, ...rest } = item || {};
        return (
          <InlineLabelRow
            key={key ?? idx}
            className={cx(itemClassName, item?.className)}
            {...rest}
          />
        );
      })}
    </div>
  );
}
