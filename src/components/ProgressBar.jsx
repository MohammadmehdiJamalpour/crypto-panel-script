import React from "react";

function clamp(val, min = 0, max = 100) {
  return Math.min(max, Math.max(min, val));
}

// Simple lerp between two colors in RGB space
function lerpColor(a, b, t) {
  const lerp = (x, y) => Math.round(x + (y - x) * t);
  return {
    r: lerp(a.r, b.r),
    g: lerp(a.g, b.g),
    b: lerp(a.b, b.b),
  };
}

function pctToColor(pct) {
  const value = clamp(pct);
  if (value <= 50) {
    // red -> yellow
    const t = value / 50;
    const c = lerpColor({ r: 239, g: 68, b: 68 }, { r: 234, g: 179, b: 8 }, t);
    return `rgb(${c.r}, ${c.g}, ${c.b})`;
  }
  // yellow -> green
  const t = (value - 50) / 50;
  const c = lerpColor({ r: 234, g: 179, b: 8 }, { r: 34, g: 197, b: 94 }, t);
  return `rgb(${c.r}, ${c.g}, ${c.b})`;
}

export default function ProgressBar({ value = 0, height = 10, className = "" }) {
  const pct = clamp(value);
  const color = pctToColor(pct);

  return (
    <div
      className={`w-full rounded-full bg-white/10 ring-1 ring-white/10 overflow-hidden ${className}`}
      style={{ height }}
    >
      <div
        className="h-full rounded-full transition-[width] duration-300 ease-out"
        style={{ width: `${pct}%`, backgroundColor: color }}
      />
    </div>
  );
}
