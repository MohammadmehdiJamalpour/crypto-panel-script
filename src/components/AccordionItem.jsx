import React, { forwardRef, useMemo } from "react";
import RowShell from "./atoms/RowShell";
import IconChip from "./atoms/IconChip";
import TopGlow from "./atoms/TopGlow";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";

const DEFAULT_HEIGHT = 55;
const DEFAULT_PADDING = "px-3";

/* fixed-height item with optional centered label and side icons */
const AccordionItem = forwardRef(function AccordionItem(
  {
    children,
    className = "",
    decorated = true,
    padding, // optional override
    bgClass = "bg-white/[0.05]",
    baseRingClass = "ring-1 ring-white/10",

    // standardized row API:
    label,
    value,
    leftIcon,
    rightIcon,
    chevron = false,
    chevronRotated = false,
    chevronDirection = "right", // "left" | "right"
    onLeftIconClick,
    onRightIconClick,
    onChevronClick,

    // optional: click whole row
    onClick,

    // For scroll-back targeting
    itemId,

    _open = false,
  },
  ref
) {
  const padCls = padding ?? DEFAULT_PADDING;
  const borderCls = _open ? "border border-[color:var(--rail)]" : "border-0";
  const asButton = typeof onClick === "function";
  const Comp = asButton ? "button" : "div";

  const showStandard = label != null || leftIcon != null || rightIcon != null || chevron;

  const inner = useMemo(
    () =>
      showStandard ? (
        <div className="relative h-full  w-full pl-10 pr-6">
          <TopGlow />

          <div className="absolute inset-y-0 left-0 flex items-center ">
            {leftIcon ? (
              <IconChip node={leftIcon} onClick={onLeftIconClick} ariaLabel="left action" />
            ) : null}
          </div>

          <div className="flex items-center h-full">
            <div className="flex flex-col items-start  gap-1 select-none">
              {label ? (
                <div className="text-white/90 font-medium truncate text-sm">{label}</div>
              ) : null}
              {value ? (
                <div className="text-xs text-white/70 truncate">{value}</div>
              ) : null}
            </div>
          </div>

          <div className="absolute inset-y-0 right-0 flex items-center pr-1.5">
            {rightIcon ? (
              <IconChip node={rightIcon} onClick={onRightIconClick} ariaLabel="right action" />
            ) : chevron ? (
              <IconChip
                hoverMode="self"
                node={
                  chevronDirection === "left" ? (
                    <ChevronLeftIcon
                      className={`h-4 w-4 transition-transform duration-200 ${chevronRotated ? "-rotate-180" : ""}`}
                    />
                  ) : (
                    <ChevronRightIcon
                      className={`h-4 w-4 transition-transform duration-200 ${chevronRotated ? "rotate-180" : ""}`}
                    />
                  )
                }
                onClick={(e) => {
                  e.stopPropagation();
                  onChevronClick?.(e);
                }}
                ariaLabel={chevronRotated ? "collapse" : "expand"}
              />
            ) : null}
          </div>
        </div>
      ) : (
        children
      ),
    [chevron, chevronDirection, chevronRotated, children, label, leftIcon, onChevronClick, onLeftIconClick, onRightIconClick, rightIcon, showStandard]
  );

  const sharedProps = {
    as: Comp,
    ref,
    onClick,
    style: { height: DEFAULT_HEIGHT },
    className: [padCls, className].filter(Boolean).join(" "),
    "data-item": itemId || undefined,
  };

  if (!decorated) {
    return <RowShell {...sharedProps}>{inner}</RowShell>;
  }

  return (
    <RowShell
      {...sharedProps}
      className={[bgClass, baseRingClass, borderCls, padCls, className].filter(Boolean).join(" ")}
    >
      {inner}
    </RowShell>
  );
});

export default AccordionItem;
