// src/App.jsx
import React from "react";
import AppShell from "./components/layout/AppShell.jsx";
import Accordion, {
  AccordionSection,
  AccordionItem,
} from "./components/AccordionRail.jsx";
import { BoltIcon, LockClosedIcon, KeyIcon } from "@heroicons/react/24/outline";

// Simple content block for each option tile (no TS types in .jsx)
const Block = ({ title }) => (
  <div className="h-full w-full flex flex-col justify-center gap-1.5">
    <div className="text-white/85 text-sm font-medium">{title}</div>
    <div className="text-white/60 text-xs leading-5">
      <span className="block">
        This is a sample line to visualize content colors & spacing.
      </span>
      <span className="block">
        This is a sample line to visualize content colors & spacing.
      </span>
    </div>
  </div>
);

export default function App() {
  return (
    <AppShell>
      <div className="mx-auto max-w-xl space-y-6 p-6">
        <Accordion>
          <AccordionSection
            title="Power Usage"
            icon={<BoltIcon className="h-5 w-5" />}
            defaultOpen
            accentColor="rgb(96 165 250 / 0.35)"
            railStroke={1.5}
            railOffset={18}
            elbowLen={28}
            elbowRadius={12}
            gap={14}
          >
            <AccordionItem><Block title="Status :" /></AccordionItem>
            <AccordionItem>
              <Block title="Power Usage : [424/1000] kW/h" />
            </AccordionItem>
            <AccordionItem><Block title="Overhead Usage :" /></AccordionItem>
          </AccordionSection>

          <AccordionSection
            title="Open Security Measures"
            icon={<LockClosedIcon className="h-5 w-5" />}
            accentColor="rgb(96 165 250 / 0.35)"
            railStroke={1.5}
            railOffset={18}
            elbowLen={28}
            elbowRadius={12}
            gap={14}
          >
            <AccordionItem><Block title="Active Rules" /></AccordionItem>
            <AccordionItem><Block title="Recent Alerts" /></AccordionItem>
          </AccordionSection>

          <AccordionSection
            title="Set a New Password"
            icon={<KeyIcon className="h-5 w-5" />}
            accentColor="rgb(96 165 250 / 0.35)"
            railStroke={1.5}
            railOffset={18}
            elbowLen={28}
            elbowRadius={12}
            gap={14}
          >
            <AccordionItem><Block title="Password Form" /></AccordionItem>
          </AccordionSection>
        </Accordion>
      </div>
    </AppShell>
  );
}
