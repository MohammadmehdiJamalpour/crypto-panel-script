// src/App.tsx
import React from "react";
import AppShell from "./components/layout/AppShell";
// import your pages/sections here

export default function App() {
  return (
    <AppShell>
      {/* Your routes/content go here */}
      <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
        Hello world
      </div>
    </AppShell>
  );
}
