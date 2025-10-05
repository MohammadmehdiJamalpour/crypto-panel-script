import React, {
  forwardRef,
  useId,
  useState,
} from "react";
import AccordionItemsBody from "./AccordionItemsBody.jsx";

/**
 * DUMMY DATA SHAPE (no heights here)
 * ----------------------------------------------------------
 * const SECTIONS = [
 *   { id: "power", title: "Power Usage", icon: <BoltIcon/>, defaultOpen: true,
 *     items: [{ id: "status" }, { id: "usage" }, { id: "overhead" }] },
 *   { id: "security", title: "Open Security Measures", icon: <LockClosedIcon/>,
 *     items: [{ id: "rules" }, { id: "alerts" }] },
 *   { id: "password", title: "Set a New Password", icon: <KeyIcon/>,
 *     items: [{ id: "form" }] },
 * ];
 * ----------------------------------------------------------
 */

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

/* Item wrapper (fixed default height 68px; NO blue bg on items) */
export const AccordionItem = forwardRef(function AccordionItem(
  {
    children,
    className = "",
    decorated = true,
    padding = "0",
    // neutral background always (items never switch to blue)
    bgClass = "bg-white/[0.05]",
    baseRingClass = "ring-1 ring-white/10",
    optionHeight = 68,   // default fixed height
    height,
    minHeight,
    width,
    style,
    _open = false,       // internal
  },
  ref
) {
  const mergedStyle = {
    ...(height == null && minHeight == null ? { height: optionHeight } : null),
    ...(width != null ? { width } : null),
    ...(height != null ? { height } : null),
    ...(minHeight != null ? { minHeight } : null),
    ...style,
  };

  const borderCls = _open
    ? "border border-[color:var(--rail)]"
    : "border-0";

  if (!decorated) {
    return (
      <div
        ref={ref}
        className={cx("relative rounded-2xl", bgClass, borderCls, className)}
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
        "relative rounded-2xl",
        bgClass,            // <-- stays neutral whether open or closed
        padding,
        baseRingClass,
        borderCls,
        className
      )}
      style={mergedStyle}
    >
      {children}
    </div>
  );
});

/* Single section (HEADER gets blue-ish bg when open; items do NOT) */
export function AccordionSection({
  title = "Section",
  icon,
  children,                       // <AccordionItem>...</AccordionItem>[]
  defaultOpen = false,
  onToggle,
  size = "md",                    // "sm" | "md"

  // Rail/connector tuning (unchanged defaults)
  gap = 12,
  railOffset = 12,
  elbowLen = 24,
  elbowRadius = 10,
  railStroke = 1.5,               // ~1/5

  // Single source of truth for accent color (rail + open borders)
  accentColor = "rgb(96 165 250 / 0.35)",

  // Behavior
  highlightHeaderOnOpen = true,
  decorateChildrenByDefault = true,

  // blue-ish header bg ONLY when open
  openHeaderBgClass = "bg-blue-500/[0.08] hover:bg-blue-500/[0.12]",
}) {
  const uid = useId();
  const [open, setOpen] = useState(defaultOpen);

  const sizes = {
    sm: { pad: "px-3 py-3", bubble: "h-8 w-8", title: "text-sm" },
    md: { pad: "px-4 py-4", bubble: "h-8 w-8", title: "text-base" },
  }[size];

  const overlayProps = {
    open,
    gap,
    railOffset,
    elbowLen,
    elbowRadius,
    railStroke,
    decorateChildrenByDefault,
  };

  const closedHeaderBgClass = "bg-white/[0.05] hover:bg-white/[0.07]";
  const headerBgClass = open ? openHeaderBgClass : closedHeaderBgClass;

  const headerBorderCls = open
    ? "border border-[color:var(--rail)]"
    : "border-0";

  return (
    <section className="w-full" style={{ "--rail": accentColor }}>
      {/* Header */}
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
          "w-full flex items-center gap-3 rounded-2xl",
          headerBgClass, // <-- blue-ish when open
          "py-4 text-white/90",
          "ring-1 duration-300 transition-all ring-blue-600/30 focus:outline-none focus:ring-1 focus:ring-blue-500/80",
          sizes.pad,
          headerBorderCls // <-- border persists while open
        )}
      >
        <span className={cx("shrink-0 grid place-items-center rounded-2xl bg-white/10 ring-1 ring-white/10", sizes.bubble)}>
          {icon ?? <span className="h-1.5 w-1.5 rounded-full bg-white/70" />}
        </span>

        <span className={cx("flex-1 text-left font-medium", sizes.title)}>{title}</span>

        <span className={cx("shrink-0 grid place-items-center rounded-2xl bg-white/10 ring-1 ring-white/10", sizes.bubble)}>
          <svg
            className={cx("h-4 w-4 text-white/80 transition-transform duration-200", open && "rotate-180")}
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z" />
          </svg>
        </span>
      </button>

      {/* Body (smooth collapse) */}
      <SmoothCollapse open={open} className="mt-3" aria-hidden={!open}>
        <div id={`${uid}-panel`} role="region" aria-label={`${title} details`}>
          <AccordionItemsBody {...overlayProps}>{children}</AccordionItemsBody>
        </div>
      </SmoothCollapse>
    </section>
  );
}

/* Container for multiple sections */
export default function Accordion({ children, className = "", gap = "md" }) {
  const gapCls = gap === "sm" ? "space-y-2" : gap === "md" ? "space-y-3" : "space-y-0";
  return <div className={cx(gapCls, className)}>{children}</div>;
}
