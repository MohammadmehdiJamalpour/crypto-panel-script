import React from "react";
import AppHeader from "./AppHeader";
import Footer from "./Footer";

export default function AppShell({ children }) {
  return (
    <div className="relative h-dvh text-white">
      {/* Right panel */}
      <div
        className="
          absolute top-[8vh] xl:top-[10vh] bottom-[8vh] xl:bottom-[10vh]
          w-2/5 max-w-sm lg:max-w-md xl:w-1/3 2xl:w-1/4
          right-10 xl:right-32
          bg-primary rounded-3xl overflow-hidden
          flex flex-col
        "
      >
        <main className="flex-1 overflow-y-auto thin-scrollbar [scrollbar-gutter:stable] px-4 py-6">
        <AppHeader />


          {children}
        </main>


        <Footer />
      </div>
    </div>
  );
}
