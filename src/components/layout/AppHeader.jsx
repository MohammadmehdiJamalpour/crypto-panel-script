// src/components/layout/AppHeader.tsx
import React from "react";

export default function AppHeader() {
  return (
    <header
      className="
        relative top-0 z-40 w-full min-h-56 border-b border-white/10
        bg-[url('/header-bg.svg')] bg-no-repeat bg-center
        bg-[length:70%] md:bg-[length:65%] lg:bg-[length:60%]
      "
    ></header>
  );
}
