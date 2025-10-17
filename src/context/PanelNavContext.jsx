import React, { createContext, useContext, useState } from "react";

const PanelNavContext = createContext(null);

export function PanelNavProvider({ children }) {
  const [mode, setMode] = useState("main");     // "main" | "detail"
  const [title, setTitle] = useState(null);
  const [payload, setPayload] = useState(null);

  // Where to restore when going back
  const [restoreSectionId, setRestoreSectionId] = useState(null); // AccordionSection anchorId
  const [restoreItemId, setRestoreItemId] = useState(null);       // AccordionItem itemId

  const value = {
    mode, setMode,
    title, setTitle,
    payload, setPayload,
    restoreSectionId, setRestoreSectionId,
    restoreItemId, setRestoreItemId,
  };

  return <PanelNavContext.Provider value={value}>{children}</PanelNavContext.Provider>;
}

export function usePanelNav() {
  const ctx = useContext(PanelNavContext);
  if (!ctx) throw new Error("usePanelNav must be used inside <PanelNavProvider>");
  return ctx;
}
