import React, {
  Children,
  cloneElement,
  createRef,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
function cx(...parts) {
  return parts.flat().filter(Boolean).join(" ");
}

const STACK_GAP = 8;
const LEFT_PAD_BUFFER = 8;

/* measure stack geometry for rail & elbows */
function useRailGeometry({ bodyRef, stackRef, itemRefs, deps = [] }) {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return { stackTop, stackH, midYs };
}

function buildRailElements({ midYs, stackH, elbowLen, elbowRadius, railOffset, railStroke }) {
  const H = Math.max(stackH, 1);
  const R = elbowRadius;

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
      {/* elbows (quarter arc + horizontal, no overlap with rail) */}
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
}

/**
 * AccordionItemsBody
 * - Renders the items stack with left padding for elbows
 * - Draws the vertical rail + rounded elbows
 * - Clones children to pass refs and the open state for border coloring
 * - Static item gap to enforce consistent spacing
 */
export default function AccordionItemsBody({
  children,
  open,
  // gap,  // ignore external gap; we use a static internal value
  railOffset,
  elbowLen,
  elbowRadius,
  railStroke,
  decorateChildrenByDefault,
  className = "",
}) {
  const bodyRef = useRef(null); // relative container for overlay
  const stackRef = useRef(null); // the actual items stack

  const itemsArr = useMemo(() => Children.toArray(children), [children]);
  const itemRefs = useRef([]);
  if (itemRefs.current.length !== itemsArr.length) {
    itemRefs.current = itemsArr.map((_, i) => itemRefs.current[i] ?? createRef());
  }

  const { stackTop, stackH, midYs } = useRailGeometry({
    bodyRef,
    stackRef,
    itemRefs,
    deps: [open, children],
  });

  const overlayW = railOffset + elbowLen;
  const padLeft = overlayW + LEFT_PAD_BUFFER;
  const overlayHeight = Math.max(stackH, 1);

  const railElements = useMemo(
    () =>
      buildRailElements({
        midYs,
        stackH: overlayHeight,
        elbowLen,
        elbowRadius,
        railOffset,
        railStroke,
      }),
    [elbowLen, elbowRadius, midYs, overlayHeight, railOffset, railStroke]
  );

  return (
    <div ref={bodyRef} className={cx("relative", className)}>
      {/* Items stack */}
      <div
        ref={stackRef}
        className="flex flex-col"
        style={{ gap: STACK_GAP, paddingLeft: padLeft }}
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

      {/* Overlay: rail + elbows restricted to stack area */}
      <svg
        aria-hidden
        className="pointer-events-none absolute"
        style={{ left: 0, top: stackTop, width: overlayW, height: overlayHeight }}
        viewBox={`0 0 ${overlayW} ${overlayHeight}`}
      >
        {railElements}
      </svg>
    </div>
  );
}
