import React, { useId, useState } from "react";
import cx from "./utils/cx";
import AccordionItemsBody from "./AccordionItemsBody.jsx";
import IconChip from "./atoms/IconChip";

export default function AccordionSection({
  title = "Section",
  icon,
  children,
  defaultOpen = false,
  onToggle,
  size = "md",
  railOffset = 12,
  elbowLen = 24,
  elbowRadius = 10,
  railStroke = 1.5,
  accentColor = "rgb(96 165 250 / 0.35)",
  openHeaderBgClass = "bg-white/[0.05]",
  decorateChildrenByDefault = true,
  renderHeader,
  anchorId,
}) {
  const uid = useId();
  const [open, setOpen] = useState(defaultOpen);

  const sizes = {
    sm: { pad: "px-3 py-3", title: "text-sm" },
    md: { pad: "px-3 py-3", title: "text-sm" },
  }[size];

  const overlayProps = {
    open,
    railOffset,
    elbowLen,
    elbowRadius,
    railStroke,
    decorateChildrenByDefault,
  };

  const headerBgClass = openHeaderBgClass;
  const headerBorderCls = open ? "border border-[color:var(--rail)]" : "border-0";

  const DefaultHeader = () => (
    <>
      {/* LEFT chip reacts to header hover */}
      <span className="shrink-0">
        <IconChip
          hoverMode="group"
          groupName="sect"
          node={icon ?? <span className="h-1.5 w-1.5 rounded-2xl bg-white/70" />}
        />
      </span>

      <span className={cx("flex-1 text-left truncate font-medium", sizes.title)}>
        {title}
      </span>

      {/* RIGHT chevron reacts only to its own hover */}
      <span className="shrink-0">
        <IconChip
          hoverMode="self"
          node={
            <svg
              className={cx(
                "h-6 w-6 text-white transition-transform duration-200",
                open && "rotate-180"
              )}
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden
            >
              <path d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z" />
            </svg>
          }
        />
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
        data-anchor={anchorId || undefined}
        className={cx(
          "w-full flex items-center gap-3 rounded-3xl group/sect", // named group
          headerBgClass,
          "py-3 text-white/90 mb-2",
          "ring-1 ring-white/10 focus:outline-none focus:ring-1 focus:ring-blue-500/70",
          sizes.pad,
          headerBorderCls
        )}
      >
        {headerInner}
      </button>

      <SmoothCollapse open={open} className="mt-1.5" aria-hidden={!open}>
        <div id={`${uid}-panel`} className="py-2 pr-1" role="region" aria-label={`${title} details`}>
          <AccordionItemsBody {...overlayProps}>{children}</AccordionItemsBody>
        </div>
      </SmoothCollapse>
    </section>
  );
}

/* local SmoothCollapse unchanged */
const SmoothCollapse = React.forwardRef(function SmoothCollapse(
  { open, children, duration = 200, easing = "ease-out", className = "" },
  ref
) {
  const innerRef = React.useRef(null);
  const [h, setH] = React.useState(open ? "auto" : 0);
  const [auto, setAuto] = React.useState(open);

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
      style={{ height: auto ? "auto" : h, overflow: "hidden", transition: `height ${duration}ms ${easing}` }}
    >
      <div ref={innerRef}>{children}</div>
    </div>
  );
});
