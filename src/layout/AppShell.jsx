import React, { useEffect, useRef } from "react";
import AppHeader from "./AppHeader";
import Footer from "./Footer";
import { PanelNavProvider, usePanelNav } from "../context/PanelNavContext";

function Panel({ children }) {
  const { mode, restoreSectionId, restoreItemId } = usePanelNav();
  const scrollRef = useRef(null);
  const prevModeRef = useRef(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const prev = prevModeRef.current;
    prevModeRef.current = mode;

    // Drill-in: scroll panel to top
    if (mode === "detail") {
      el.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    // Back from detail: open the section and scroll to the item
    if (prev === "detail" && mode === "main" && restoreSectionId) {
      // 1) After main re-renders, find the header button
      requestAnimationFrame(() => {
        const headerBtn = el.querySelector(`[data-anchor="${restoreSectionId}"]`);
        if (!headerBtn) return;

        // If the section is closed, click to open it
        const expanded = headerBtn.getAttribute("aria-expanded");
        if (expanded === "false") {
          headerBtn.click();
        }

        // 2) Ensure header is in view first
        headerBtn.scrollIntoView({ behavior: "smooth", block: "start" });

        // 3) Next frame: scroll the clicked item into view (center)
        requestAnimationFrame(() => {
          if (!restoreItemId) return;
          const itemNode = el.querySelector(`[data-item="${restoreItemId}"]`);
          if (itemNode) {
            itemNode.scrollIntoView({ behavior: "smooth", block: "center" });
          }
        });
      });
    }
  }, [mode, restoreSectionId, restoreItemId]);

  return (
    <div className="relative h-dvh text-white">
      <div
        className="
          absolute top-[8vh] xl:top-[10vh] bottom-[8vh] xl:bottom-[10vh]
          w-2/5 max-w-sm lg:max-w-md xl:w-1/3 2xl:w-1/4
          right-10 xl:right-32
          bg-primary rounded-3xl overflow-hidden
          flex flex-col
        "
      >
        {/* Scroll container */}
        <main
          ref={scrollRef}
          className="flex-1 overflow-y-auto thin-scrollbar [scrollbar-gutter:stable] px-4 py-6 scroll-smooth"
        >
          <AppHeader />
          {children}
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default function AppShell({ children }) {
  return (
    <PanelNavProvider>
      <Panel>{children}</Panel>
    </PanelNavProvider>
  );
}
