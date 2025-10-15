import React from "react";
import Accordion, { AccordionSection, AccordionItem } from "../components/AccordionRail.jsx";
import LabelRow from "../components/LabelRow.jsx";
import LabelsGroup from "../components/LabelsGroup.jsx";
import { BoltIcon, LockClosedIcon, KeyIcon } from "@heroicons/react/24/outline";
import { MapPinIcon, WalletIcon } from "@heroicons/react/24/solid";

const Block = () => <div className="h-full w-full flex flex-col justify-center gap-1.5" />;

export default function Body({ className = "" }) {
  return (
    <section className={`relative flex-1 px-4 py-6 ${className}`}>
      {/* sticky background */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="relative h-[100vh] pt-[20vh]">
          <img
            src="/crypto-tokens.svg"
            alt=""
            aria-hidden
            className="
              sticky top-1/2 -translate-y-1/2
              block mx-auto
              h-auto w-[min(90vw,800px)]
              object-contain opacity-100
            "
          />
        </div>
      </div>

      <div className="relative z-10 mx-auto container max-w-md space-y-2">
        {/* NON-OPENABLE labels in one container */}
        <LabelsGroup
          items={[
            {
              icon: <MapPinIcon className="h-5 w-5 text-white/80" />,
              label: "Your IP:",
              value: "116.108.85.23",
            },
            {
              icon: <WalletIcon className="h-5 w-5 text-white/80" />,
              label: "Wallet",
              value: "",
            },
          ]}
        />

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
          >
            <AccordionItem><Block /></AccordionItem>
            <AccordionItem><Block /></AccordionItem>
          </AccordionSection>

          <AccordionSection
            title="Open Security Measures"
            icon={<LockClosedIcon className="h-5 w-5" />}
            accentColor="rgb(96 165 250 / 0.35)"
            railStroke={1.5}
            railOffset={18}
            elbowLen={28}
            elbowRadius={12}
          >
            <AccordionItem><Block /></AccordionItem>
            <AccordionItem><Block /></AccordionItem>
          </AccordionSection>

          <AccordionSection
            title="Set a New Password"
            icon={<KeyIcon className="h-5 w-5" />}
            accentColor="rgb(96 165 250 / 0.35)"
            railStroke={1.5}
            railOffset={18}
            elbowLen={28}
            elbowRadius={12}
          >
            <AccordionItem><Block /></AccordionItem>
          </AccordionSection>
        </Accordion>
      </div>
    </section>
  );
}
