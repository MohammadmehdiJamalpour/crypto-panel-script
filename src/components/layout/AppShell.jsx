// src/components/layout/AppShell.tsx
import React from "react";
import AppHeader from "./AppHeader";

export default function AppShell({ children }) {
  return (
    <div className="relative h-dvh text-white">
      {/* Panel: rightmost third, with 15vh gaps top/bottom */}
      <div className="absolute top-[8vh] xl:top-[10vh] bottom-[8vh] xl:bottom-[10vh]  w-2/5 xl:w-1/3 2xl:w-1/4   right-10  xl:right-32 flex flex-col rounded-3xl overflow-hidden bg-primary">
        <div className="sticky top-0 z-10">
          <AppHeader />
        </div>
        <main className="flex-1 overflow-y-auto px-4 py-6">{children}</main>
      </div>
    </div>
  );
}
