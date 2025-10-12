// src/layout/Body.jsx
import React from "react";
import Accordion, {
  AccordionSection,
  AccordionItem,
} from "../components/AccordionRail.jsx";
import { BoltIcon, LockClosedIcon, KeyIcon } from "@heroicons/react/24/outline";

// Simple content block
const Block = ({ title }) => (
  <div className="h-full w-full flex flex-col justify-center gap-1.5">
    {/* content for: {title} */}
  </div>
);

/**
 * Background behavior:
 * - Starts low (near bottom) due to pt-[100vh].
 * - As you scroll down, the SVG rises until its center hits viewport center
 *   (sticky at top-1/2 with -translate-y-1/2), then it stays centered.
 * - Scrolling further down: it remains centered (doesn't move).
 * - Scrolling up past the threshold: it leaves sticky and drops back down toward the bottom.
 */
export default function Body({ className = "" }) {
  return (
    <section
      className={`
        relative flex-1 
      
        
   
         
        px-4 py-6
        ${className}
      `}
    >
      {/* BACKGROUND OVERLAY (no pointer events; independent of content) */}
      <div className="pointer-events-none absolute inset-0 z-0">
        {/* Track creates room for sticky behavior.
           pt-[100vh] = start low; adjust to change starting position.
           h-[200vh] = ensures sticky can stay centered for a long range. */}
        <div className="relative h-[100vh] pt-[20vh]">
          <img
            src="/crypto-tokens.svg"
            alt=""
            aria-hidden
            className="
              sticky top-1/2 -translate-y-1/2
              block mx-auto
              h-auto w-[min(90vw,800px)]
              object-contain
              opacity-100
              transition-transform
            "
          />
        </div>
      </div>

      {/* FOREGROUND CONTENT */}
      <div className="relative z-10 mx-auto container max-w-md space-y-6">
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
            <AccordionItem><Block title="Power Usage : [424/1000] kW/h" /></AccordionItem>
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
    </section>
  );
}
