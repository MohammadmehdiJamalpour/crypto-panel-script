import React from "react";
import Accordion, { AccordionSection, AccordionItem } from "./components/AccordionRail.jsx";
import { BoltIcon, LockClosedIcon, KeyIcon } from "@heroicons/react/24/outline";

/** Dummy sections — NO heights here */
const SECTIONS = [
  {
    id: "power",
    title: "Power Usage",
    icon: <BoltIcon className="h-5 w-5" />,
    defaultOpen: true,
    items: [{ id: "status" }, { id: "usage" }, { id: "overhead" }],
  },
  {
    id: "security",
    title: "Open Security Measures",
    icon: <LockClosedIcon className="h-5 w-5" />,
    items: [{ id: "rules" }, { id: "alerts" }],
  },
  {
    id: "password",
    title: "Set a New Password",
    icon: <KeyIcon className="h-5 w-5" />,
    items: [{ id: "form" }],
  },
];

/** Simple placeholder block; real content goes inside AccordionItem */
function Block({ label }) {
  return (
    <div className="h-full w-full grid place-items-center text-white/60">
      {label}
    </div>
  );
}

export default function App() {
  return (
    <div className="min-h-screen bg-[#0B0F16] text-white p-6">
      <div className="max-w-md mx-auto space-y-5">
        <Accordion>
          {SECTIONS.map((sec) => (
            <AccordionSection
              key={sec.id}
              title={sec.title}
              icon={sec.icon}
              defaultOpen={sec.defaultOpen}
              railStroke={1.5}
              accentColor="rgb(96 165 250 / 0.35)"
              railOffset={12}
              elbowLen={26}
              elbowRadius={10}
              gap={12}
            >
              {sec.items.map((it) => (
                <AccordionItem key={it.id} /* optionHeight defaults to 68px */>
                  <Block label={`${sec.title} • ${it.id}`} />
                </AccordionItem>
              ))}
            </AccordionSection>
          ))}
        </Accordion>
      </div>
    </div>
  );
}
