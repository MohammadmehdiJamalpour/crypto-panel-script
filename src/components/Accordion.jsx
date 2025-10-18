import React from "react";
import cx from "./utils/cx";

/** Container with static spacing between sections */
export default function Accordion({ children, className = "" }) {
  return <div className={cx("space-y-2", className)}>{children}</div>;
}
