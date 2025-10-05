// src/components/layout/AppShell.tsx
import React from "react";
import AppHeader from "./AppHeader";

export default function AppShell({ children }) {
  return (
    <div className="min-h-screen bg-[#0B0F16]  text-white">
      <AppHeader />
      <main className="mx-auto max-w-6xl rounded-t-3xl px-4 py-6 ">{children}</main>
    </div>
  );
}
