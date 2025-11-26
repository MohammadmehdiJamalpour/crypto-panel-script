import React, { useEffect, useRef } from "react";
import AppHeader from "./AppHeader";
import Footer from "./Footer";
import useDraggablePanel from "../utils/useDraggablePanel";
import { XMarkIcon } from "@heroicons/react/24/outline";

const moveIcon = "/move-icon.svg";

function Panel({ children, user, profile, onClose }) {
  const scrollRef = useRef(null);
  const panelRef = useRef(null);
  const { offset, startDrag } = useDraggablePanel(panelRef);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="relative h-dvh text-white">
      <div
        ref={panelRef}
        className="
          absolute top-[8vh] xl:top-[10vh] bottom-[8vh] xl:bottom-[10vh]
          w-2/5 max-w-sm lg:max-w-md xl:w-1/3 2xl:w-1/4
          right-10 xl:right-32
          bg-primary rounded-3xl overflow-hidden
          flex flex-col
        "
        style={{ transform: `translate3d(${offset.x}px, ${offset.y}px, 0)` }}
      >
        <div className="absolute top-3 right-3 z-50 flex items-center gap-2">
          <button
            type="button"
            onPointerDown={startDrag}
            className="
              grid place-items-center h-9 w-9
              rounded-2xl bg-white/10 ring-1 ring-white/15 text-white
              hover:bg-white/20 transition-colors cursor-move
              focus:outline-none focus:ring-2 focus:ring-blue-500/60
            "
            aria-label="Move panel"
          >
            <img src={moveIcon} alt="Move" className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={onClose}
            className="
              grid place-items-center h-9 w-9
              rounded-2xl bg-white/10 ring-1 ring-white/15 text-white
              hover:bg-white/20 transition-colors
              focus:outline-none focus:ring-2 focus:ring-blue-500/60
            "
            aria-label="Close panel"
          >
            <XMarkIcon className="h-5 w-5" />
          </button>
        </div>
        {/* Scroll container */}
        <main
          ref={scrollRef}
          className="flex-1  overflow-y-auto thin-scrollbar [scrollbar-gutter:stable] px-3 py-4 scroll-smooth"
        >
          <AppHeader user={user} profile={profile} />
          {children}
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default function AppShell({ children, user, profile, onClose }) {
  return (
    <Panel user={user} profile={profile} onClose={onClose}>
      {children}
    </Panel>
  );
}
