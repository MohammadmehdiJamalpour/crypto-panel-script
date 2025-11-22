import React, { forwardRef, useMemo } from "react";
import cx from "./utils/cx";
import RowShell from "./atoms/RowShell";
import IconChip from "./atoms/IconChip";
import TopGlow from "./atoms/TopGlow";

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
    leftIcon,
    rightIcon,
    onLeftIconClick,
    onRightIconClick,

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

  const showStandard = label != null || leftIcon != null || rightIcon != null;

  const inner = useMemo(
    () =>
      showStandard ? (
        <div className="relative h-full w-full">
          <TopGlow />

          {leftIcon ? (
            <div className="absolute inset-y-0 left-0 flex items-center pl-1.5">
              <IconChip node={leftIcon} onClick={onLeftIconClick} ariaLabel="left action" />
            </div>
          ) : null}

          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="text-white/90 font-medium select-none truncate max-w-[75%] text-sm">
              {label}
            </div>
          </div>

          {rightIcon ? (
            <div className="absolute inset-y-0 right-0 flex items-center pr-1.5">
              <IconChip node={rightIcon} onClick={onRightIconClick} ariaLabel="right action" />
            </div>
          ) : null}
        </div>
      ) : (
        children
      ),
    [children, label, leftIcon, onLeftIconClick, onRightIconClick, rightIcon, showStandard]
  );

  const sharedProps = {
    as: Comp,
    ref,
    onClick,
    style: { height: DEFAULT_HEIGHT },
    className: cx(padCls, className),
    "data-item": itemId || undefined,
  };

  if (!decorated) {
    return <RowShell {...sharedProps}>{inner}</RowShell>;
  }

  return (
    <RowShell
      {...sharedProps}
      className={cx(bgClass, baseRingClass, borderCls, padCls, className)}
    >
      {inner}
    </RowShell>
  );
});

export default AccordionItem;
