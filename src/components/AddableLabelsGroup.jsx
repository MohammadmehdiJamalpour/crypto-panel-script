// src/components/AddableLabelsGroup.jsx
import React from "react";
import cx from "./utils/cx";
import RowShell from "./atoms/RowShell";
import IconChip from "./atoms/IconChip";
import TopGlow from "./atoms/TopGlow";
import PlusButton from "./atoms/PlusButton";
import useDynamicList from "./utils/useDynamicList";

/**
 * items shape: { icon: ReactNode, label: string, value?: string }
 * newItemFactory(idx, items) -> item
 */
export default function AddableLabelsGroup({
  initialItems = [],
  newItemFactory = (idx) => ({
    icon: (
      <span className="h-1.5 w-1.5 rounded-full bg-white/70" aria-hidden />
    ),
    label: `New Label ${idx + 1}`,
    value: "",
  }),
  className = "",
  rowHeight = 56,
  onChange, // optional callback(items)
}) {
  const { items, add, setItems } = useDynamicList(initialItems, {
    factory: (_, idx, prev) => newItemFactory(idx, prev),
  });

  // Lift changes if needed
  React.useEffect(() => {
    onChange?.(items);
  }, [items, onChange]);

  return (
    <div className={cx("space-y-2", className)}>
      {items.map((it, idx) => (
        <RowShell
          key={idx}
          style={{ height: rowHeight }}
          className={cx(
            "px-3",
            "bg-white/[0.05] ring-1 ring-white/10 rounded-2xl",
            "relative overflow-hidden group/row"
          )}
        >
          <TopGlow />
          <div className="h-full flex items-center gap-3">
            <IconChip hoverMode="group" groupName="row" node={it.icon} />
            <div className="flex-1 min-w-0">
              <div className="text-sm/5 text-white/70 truncate">{it.label}</div>
              {it.value ? (
                <div className="text-base font-semibold text-white truncate">
                  {it.value}
                </div>
              ) : null}
            </div>
          </div>
        </RowShell>
      ))}

      {/* Add row */}
      <RowShell
        style={{ height: rowHeight }}
        className="px-3 bg-white/[0.05] ring-1 ring-white/10 rounded-2xl relative overflow-hidden"
      >
        <div className="h-full w-full flex items-center justify-center">
          <PlusButton onClick={() => add()} />
        </div>
      </RowShell>
    </div>
  );
}
