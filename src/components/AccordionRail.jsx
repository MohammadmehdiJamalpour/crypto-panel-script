import React, { forwardRef, useId, useState } from "react";
import AccordionItemsBody from "./AccordionItemsBody.jsx";

/* tiny classnames helper */
function cx(...parts) {
  return parts.flat().filter(Boolean).join(" ");
}

/* Smooth height (0 <-> auto) */
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

/* ----------------------------------------------------------
   AccordionItem (ONE MODE: fixed height, full width)
----------------------------------------------------------- */
export const AccordionItem = forwardRef(function AccordionItem(
  {
    children,
    className = "",
    decorated = true,
    padding,                    // optional override
    bgClass = "bg-white/[0.05]",
    baseRingClass = "ring-1 ring-white/10",
    _open = false,
  },
  ref
) {
  const DEFAULT_HEIGHT = 60;
  const DEFAULT_PADDING = "p-1";

  const mergedStyle = { height: DEFAULT_HEIGHT };
  const padCls = padding ?? DEFAULT_PADDING;
  const borderCls = _open ? "border border-[color:var(--rail)]" : "border-0";

  if (!decorated) {
    return (
      <div
        ref={ref}
        className={cx("relative w-full rounded-3xl", bgClass, borderCls, padCls, className)}
        style={mergedStyle}
      >
        {children}
      </div>
    );
  }

  return (
    <div
      ref={ref}
      className={cx(
        "relative w-full rounded-3xl",
        bgClass,
        baseRingClass,
        borderCls,
        padCls,
        className
      )}
      style={mergedStyle}
    >
      {children}
    </div>
  );
});

/**
 * AccordionSection
 * - gap is STATIC (no prop)
 */
export function AccordionSection({
  title = "Section",
  icon,
  children,
  defaultOpen = false,
  onToggle,
  size = "md",

  // --- Rail/connector tuning (kept configurable) ---
  railOffset = 12,
  elbowLen = 24,
  elbowRadius = 10,
  railStroke = 1.5,

  // Accent for rail + open borders
  accentColor = "rgb(96 165 250 / 0.35)",

  // header visuals
  highlightHeaderOnOpen = true,
  decorateChildrenByDefault = true,
  openHeaderBgClass = "bg-blue-500/[0.08] hover:bg-blue-500/[0.12]",

  // custom header renderer
  renderHeader,
}) {
  const uid = useId();
  const [open, setOpen] = useState(defaultOpen);

  // STATIC item stack gap (px)
  const STACK_GAP = 6;

  // compact header tokens to match your design
  const sizes = {
    sm: { pad: "px-3 py-3", bubble: "h-8 w-8", title: "text-sm" },
    md: { pad: "px-3 py-3", bubble: "h-8 w-8", title: "text-sm" },
  }[size];

  const overlayProps = {
    open,
    gap: STACK_GAP,            // <- static gap
    railOffset,
    elbowLen,
    elbowRadius,
    railStroke,
    decorateChildrenByDefault,
  };

  const closedHeaderBgClass = "bg-white/[0.05] hover:bg-white/[0.07]";
  const headerBgClass =
    open && highlightHeaderOnOpen ? openHeaderBgClass : closedHeaderBgClass;

  const headerBorderCls = open ? "border border-[color:var(--rail)]" : "border-0";

  const DefaultHeader = () => (
    <>
      <span
        className={cx(
          "shrink-0 grid place-items-center rounded-3xl bg-white/10 ring-1 ring-white/10",
          sizes.bubble
        )}
      >
        {icon ?? <span className="h-1.5 w-1.5 rounded-3ull bg-white/70" />}
      </span>
      <span className={cx("flex-1 text-left font-medium", sizes.title)}>
        {title}
      </span>
      <span
        className={cx(
          "shrink-0 grid place-items-center rounded-3xl bg-white/10 ring-1 ring-white/10",
          sizes.bubble
        )}
      >
        <svg
          className={cx(
            "h-4 w-4 text-white/80 transition-transform duration-200",
            open && "rotate-180"
          )}
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z" />
        </svg>
      </span>
    </>
  );

  const headerInner = renderHeader ? renderHeader({ open }) : <DefaultHeader />;

  return (
    <section className="w-full" style={{ "--rail": accentColor }}>
      <button
        type="button"
        aria-expanded={open}
        aria-controls={`${uid}-panel`}
        onClick={() => {
          setOpen((v) => {
            onToggle?.(!v);
            return !v;
          });
        }}
        className={cx(
          "w-full flex items-center gap-3 rounded-3xl",
          headerBgClass,
          "py-3 text-white/90",
          "ring-1 duration-300 transition-all ring-blue-600/30 focus:outline-none focus:ring-1 focus:ring-blue-500/80",
          sizes.pad,
          headerBorderCls
        )}
      >
        {headerInner}
      </button>

      <SmoothCollapse open={open} className="mt-1.5" aria-hidden={!open}>
        <div id={`${uid}-panel`} role="region" aria-label={`${title} details`}>
          <AccordionItemsBody {...overlayProps}>{children}</AccordionItemsBody>
        </div>
      </SmoothCollapse>
    </section>
  );
}

/* Container for multiple sections — STATIC spacing between sections */
export default function Accordion({ children, className = "" }) {
  return <div className={cx("space-y-2", className)}>{children}</div>;
}
