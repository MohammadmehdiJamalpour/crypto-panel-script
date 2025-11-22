import React from "react";

/** Container with static spacing between sections */
export default function Accordion({ children, className = "" }) {
  return <div className={["", className].filter(Boolean).join(" ")}>{children}</div>;
}
