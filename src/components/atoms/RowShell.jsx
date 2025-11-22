import React, { forwardRef } from "react";

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
      className={[
        "relative w-full rounded-3xl group/row overflow-hidden ring-1 ring-white/10",
        "transition-all duration-200 hover:bg-white/[0.1]",
        "hover:ring-white/30",
        className,
      ].filter(Boolean).join(" ")}
      {...rest}
    >
      {children}
    </Comp>
  );
});

export default RowShell;
