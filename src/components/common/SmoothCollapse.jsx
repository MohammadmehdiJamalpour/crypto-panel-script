import React, { forwardRef, useState } from "react";

const SmoothCollapse = forwardRef(function SmoothCollapse(
  { open, children, duration = 200, easing = "ease-out", className = "" },
  ref
) {
  const innerRef = React.useRef(null);
  const [h, setH] = useState(open ? "auto" : 0);
  const [auto, setAuto] = useState(open);

  React.useLayoutEffect(() => {
    const el = innerRef.current;
    if (!el) return;
    let frame;

    if (open) {
      const target = el.scrollHeight;
      setAuto(false);
      frame = requestAnimationFrame(() => setH(target));
      const done = () => {
        setAuto(true);
        el.removeEventListener("transitionend", done);
      };
      el.addEventListener("transitionend", done);
      return () => {
        cancelAnimationFrame(frame);
        el.removeEventListener("transitionend", done);
      };
    } else {
      const current = el.scrollHeight;
      setAuto(false);
      setH(current);
      frame = requestAnimationFrame(() => setH(0));
      return () => cancelAnimationFrame(frame);
    }
  }, [open, children]);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        height: auto ? "auto" : h,
        overflow: "hidden",
        transition: `height ${duration}ms ${easing}`,
      }}
    >
      <div ref={innerRef}>{children}</div>
    </div>
  );
});

export default SmoothCollapse;
