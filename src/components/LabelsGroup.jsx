import React from "react";
import cx from "./utils/cx";
import RowShell from "./atoms/RowShell";
import IconChip from "./atoms/IconChip";
import TopGlow from "./atoms/TopGlow";

const BASE_ROW_CLS = "px-3 bg-white/[0.05] ring-1 ring-white/10 rounded-2xl relative overflow-hidden";

export default function LabelsGroup({ items = [], className = "", rowHeight = 56 }) {
  return (
    <div className={cx("space-y-2", className)}>
      {items.map((it, idx) => (
        <RowShell
          key={idx}
          style={{ height: rowHeight }}
          className={cx(BASE_ROW_CLS)}
        >
          <TopGlow />
          <div className="h-full flex items-center gap-3">
            <IconChip hoverMode="group" groupName="row" node={it.icon} ariaLabel="label icon" />
            <div className="flex-1 min-w-0">
              <div className="text-sm/5 text-white/70 truncate">{it.label}</div>
              {it.value ? <div className="text-base font-semibold text-white truncate">{it.value}</div> : null}
            </div>
          </div>
        </RowShell>
      ))}
    </div>
  );
}
