import React, { forwardRef } from "react";
import cx from "../utils/cx";

/** Wraps a row with the item hover aura. */
const RowShell = forwardRef(function RowShell(
  { as: Comp = "div", className = "", children, style, onClick, ...rest },
  ref
) {
  return (
    <Comp
      ref={ref}
      onClick={onClick}
      style={style}
      className={cx(
        "relative w-full rounded-3xl group/row overflow-hidden ring-1 ring-white/10",
        "transition-all duration-200 hover:bg-white/[0.07]",
        "hover:ring-[rgb(var(--hover-start-rgb)/.55)]",
        "hover:shadow-[0_0_0_1px_rgba(var(--hover-start-rgb),0.45),0_6px_22px_rgba(var(--hover-start-rgb),0.18)]",
        className
      )}
      {...rest}
    >
      {children}
    </Comp>
  );
});

export default RowShell;
