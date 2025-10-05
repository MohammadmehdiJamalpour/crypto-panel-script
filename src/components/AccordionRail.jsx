import React, {
  Children,
  cloneElement,
  forwardRef,
  useId,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";

/**
 * DUMMY DATA SHAPE (no heights here)
 * ----------------------------------------------------------
 * const SECTIONS = [
 *   {
 *     id: "power",
 *     title: "Power Usage",
 *     icon: <BoltIcon />,
 *     defaultOpen: true,
 *     items: [
 *       { id: "status" },
 *       { id: "usage" },
 *       { id: "overhead" },
 *     ],
 *   },
 *   {
 *     id: "security",
 *     title: "Open Security Measures",
 *     icon: <LockClosedIcon />,
 *     items: [{ id: "rules" }, { id: "alerts" }],
 *   },
 *   {
 *     id: "password",
 *     title: "Set a New Password",
 *     icon: <KeyIcon />,
 *     items: [{ id: "form" }],
 *   },
 * ];
 * ----------------------------------------------------------
 */

/* ---------- tiny classnames helper ---------- */
function cx(...parts) {
  return parts.flat().filter(Boolean).join(" ");
}

/* ---------- Smooth height (0 <-> auto) ---------- */
const SmoothCollapse = forwardRef(function SmoothCollapse(
  { open, children, duration = 200, easing = "ease-out", className = "" },
  ref
) {
  const innerRef = useRef(null);
  const [h, setH] = useState(open ? "auto" : 0);
  const [auto, setAuto] = useState(open);

  useLayoutEffect(() => {
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

/* ---------- Item wrapper (fixed default height here) ---------- */
export const AccordionItem = forwardRef(function AccordionItem(
  {
    children,
    className = "",
    decorated = true,
    padding = "0",
    bgClass = "bg-white/[0.05]",
    baseRingClass = "ring-1 ring-white/10",
    /** you can override, but by default each option is 68px tall */
    optionHeight = 68,
    /** optional overrides if ever needed */
    height,
    minHeight,
    width,
    style,
    /** internal */
    _open = false,
  },
  ref
) {
  const mergedStyle = {
    // fixed height unless you explicitly override:
    ...(height == null && minHeight == null ? { height: optionHeight } : null),
    ...(width != null ? { width } : null),
    ...(height != null ? { height } : null),
    ...(minHeight != null ? { minHeight } : null),
    ...style,
    ...(_open ? { borderColor: "var(--rail)" } : null),
  };

  if (!decorated) {
    return (
      <div ref={ref} className={cx("relative", className)} style={mergedStyle}>
        {children}
      </div>
    );
  }

  return (
    <div
      ref={ref}
      className={cx(
        "relative rounded-2xl",
        bgClass,
        padding,
        baseRingClass,
        className,
        _open && "border"
      )}
      style={mergedStyle}
    >
      {children}
    </div>
  );
});

/* ---------- measure stack geometry for rail/elbows ---------- */
function useRailGeometry({ bodyRef, stackRef, itemRefs, open }) {
  const [stackTop, setStackTop] = useState(0);
  const [stackH, setStackH] = useState(0);
  const [midYs, setMidYs] = useState([]);

  useLayoutEffect(() => {
    let frame;
    const measure = () => {
      if (!bodyRef.current || !stackRef.current) return;
      const bodyRect = bodyRef.current.getBoundingClientRect();
      const stackRect = stackRef.current.getBoundingClientRect();

      setStackTop(stackRect.top - bodyRect.top);
      setStackH(stackRect.height);

      const mids = itemRefs.current.map((r) => {
        const el = r.current;
        if (!el) return 0;
        const rect = el.getBoundingClientRect();
        return rect.top - stackRect.top + rect.height / 2;
      });
      setMidYs(mids);
    };

    const schedule = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(measure);
    };

    schedule();

    const ro = new ResizeObserver(schedule);
    if (bodyRef.current) ro.observe(bodyRef.current);
    if (stackRef.current) ro.observe(stackRef.current);
    itemRefs.current.forEach((r) => r.current && ro.observe(r.current));
    window.addEventListener("resize", schedule);

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", schedule);
      cancelAnimationFrame(frame);
    };
  }, [open, bodyRef, stackRef, itemRefs]);

  return { stackTop, stackH, midYs };
}

/* ---------- Single section with rail body ---------- */
export function AccordionSection({
  title = "Section",
  icon,
  children,                       // <AccordionItem>...</AccordionItem>[]
  defaultOpen = false,
  onToggle,
  size = "md",                    // "sm" | "md"

  // Rail/connector tuning
  gap = 12,
  railOffset = 12,
  elbowLen = 24,
  elbowRadius = 10,
  railStroke = 1.5,               // ≈ 1/5

  // Single source of truth for accent color (rail + open borders)
  accentColor = "rgb(96 165 250 / 0.35)",

  // Behavior
  highlightHeaderOnOpen = true,
  decorateChildrenByDefault = true,
}) {
  const uid = useId();
  const [open, setOpen] = useState(defaultOpen);

  const sizes = {
    sm: { pad: "px-3 py-3", bubble: "h-8 w-8", title: "text-sm" },
    md: { pad: "px-4 py-4", bubble: "h-8 w-8", title: "text-base" },
  }[size];

  const bodyRef = useRef(null);
  const stackRef = useRef(null);

  const itemsArr = useMemo(() => Children.toArray(children), [children]);
  const itemRefs = useRef([]);
  if (itemRefs.current.length !== itemsArr.length) {
    itemRefs.current = itemsArr.map((_, i) => itemRefs.current[i] ?? React.createRef());
  }

  const { stackTop, stackH, midYs } = useRailGeometry({
    bodyRef,
    stackRef,
    itemRefs,
    open,
  });

  const overlayW = railOffset + elbowLen;
  const padLeft = overlayW + 8;

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
          "bg-white/[0.05] hover:bg-white/[0.07] py-4 text-white/90",
          "ring-1 duration-300 transition-all ring-blue-600/30 focus:outline-none focus:ring-1 focus:ring-blue-500/80",
          sizes.pad,
          open && highlightHeaderOnOpen && "border"
        )}
        style={open && highlightHeaderOnOpen ? { borderColor: "var(--rail)" } : undefined}
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

      {/* Body (overlay clipped to the stack only) */}
      <SmoothCollapse open={open} className="mt-3" aria-hidden={!open}>
        <div
          ref={bodyRef}
          className="relative"
          id={`${uid}-panel`}
          role="region"
          aria-label={`${title} details`}
        >
          {/* Items stack */}
          <div
            ref={stackRef}
            className="flex flex-col"
            style={{ gap, paddingLeft: padLeft }}
          >
            {itemsArr.map((child, i) =>
              cloneElement(child, {
                ref: itemRefs.current[i],
                _open: open,
                ...(child.props.decorated === undefined && decorateChildrenByDefault
                  ? { decorated: true }
                  : null),
              })
            )}
          </div>

          {/* Overlay: rail + elbows (stack area only) */}
          <svg
            aria-hidden
            className="pointer-events-none absolute"
            style={{ left: 0, top: stackTop, width: overlayW, height: Math.max(stackH, 1) }}
            viewBox={`0 0 ${overlayW} ${Math.max(stackH, 1)}`}
          >
            {(() => {
              const H = Math.max(stackH, 1);
              const R = elbowRadius;

              // rail ends at the start of the last elbow (no tail)
              let railEndY = H;
              if (midYs.length > 0) {
                const last = midYs[midYs.length - 1];
                const lastCy = Math.max(R, Math.min(H - R, last));
                railEndY = Math.max(0, Math.min(H, lastCy - R));
              }

              return (
                <>
                  {/* vertical rail */}
                  <path
                    d={`M ${railOffset} 0 V ${railEndY}`}
                    fill="none"
                    stroke="var(--rail)"
                    strokeWidth={railStroke}
                    strokeLinecap="round"
                    vectorEffect="non-scaling-stroke"
                  />
                  {/* elbows (no overlap with rail) */}
                  {midYs.map((y, idx) => {
                    const cy = Math.max(R, Math.min(H - R, y));
                    const d = [
                      `M ${railOffset} ${cy - R}`,
                      `a ${R} ${R} 0 0 0 ${R} ${R}`,
                      `h ${Math.max(0, elbowLen - R)}`,
                    ].join(" ");
                    return (
                      <path
                        key={idx}
                        d={d}
                        fill="none"
                        stroke="var(--rail)"
                        strokeWidth={railStroke}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        vectorEffect="non-scaling-stroke"
                      />
                    );
                  })}
                </>
              );
            })()}
          </svg>
        </div>
      </SmoothCollapse>
    </section>
  );
}

/* ---------- Container for multiple sections ---------- */
export default function Accordion({ children, className = "", gap = "md" }) {
  const gapCls = gap === "sm" ? "space-y-2" : gap === "md" ? "space-y-3" : "space-y-0";
  return <div className={cx(gapCls, className)}>{children}</div>;
}
