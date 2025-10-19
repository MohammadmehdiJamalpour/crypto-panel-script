// src/layout/Body.jsx
import React from "react";
import Accordion from "../components/Accordion.jsx";
import AccordionItem from "../components/AccordionItem.jsx";
import AccordionSection from "../components/AccordionSection.jsx";

// NEW addable variants
import AddableLabelsGroup from "../components/AddableLabelsGroup.jsx";
import AddableAccordionSection from "../components/AdableAccordionSection.jsx";

import { BoltIcon, LockClosedIcon, KeyIcon } from "@heroicons/react/24/outline";
import {
  MapPinIcon,
  WalletIcon,
  PlusIcon,
  ChevronRightIcon,
  ChevronLeftIcon,
} from "@heroicons/react/24/solid";

import { usePanelNav } from "../context/PanelNavContext";

export default function Body({ className = "" }) {
  const { mode, setMode, title, setTitle, setPayload, setRestoreSectionId, setRestoreItemId } = usePanelNav();
  const isDetail = mode === "detail";
  const drillIn = ({ sectionId, itemId, nextTitle, payload }) => {
    setRestoreSectionId(sectionId);
    setRestoreItemId(itemId);
    setTitle(nextTitle || "Details");
    setPayload(payload ?? null);
    setMode("detail");
  };
  const goBack = () => setMode("main");

  return (
    <section className={`relative flex-1 px-4 py-6 ${className}`}>
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="relative h-[100vh] pt-[20vh]">
          <img
            src="/crypto-tokens.svg"
            alt=""
            aria-hidden
            className="sticky top-1/2 -translate-y-1/2 block mx-auto h-auto w-[min(90vw,800px)] object-contain opacity-100"
          />
        </div>
      </div>

      <div className="relative z-10 mx-auto container max-w-md space-y-2">
        {!isDetail ? (
          <AddableLabelsGroup
            initialItems={[
              { icon: <MapPinIcon className="h-5 w-5 text-white/80" />, label: "Your IP:", value: "116.108.85.23" },
              { icon: <WalletIcon className="h-5 w-5 text-white/80" />, label: "Wallet", value: "" },
            ]}
            // optional: onChange={(items)=>console.log(items)}
          />
        ) : (
          <AccordionItem
            label={title ?? "Details"}
            leftIcon={<ChevronLeftIcon className="h-4 w-4 text-white/90" />}
            onLeftIconClick={goBack}
          />
        )}

        {!isDetail ? (
          <Accordion>
            {/* Addable Power section */}
            <AddableAccordionSection
              title="Power Usage"
              icon={<BoltIcon className="h-5 w-5" />}
              accentColor="rgb(96 165 250 / 0.35)"
              sectionProps={{ railStroke: 1.5, railOffset: 18, elbowLen: 28, elbowRadius: 12 }}
              initialItems={[
                {
                  label: "Status",
                  rightIcon: <ChevronRightIcon className="h-4 w-4 text-white/90" />,
                  onRightIconClick: () =>
                    drillIn({ sectionId: "power", itemId: "power-status", nextTitle: "Status" }),
                },
                {
                  label: "Power Usage",
                  rightIcon: <ChevronRightIcon className="h-4 w-4 text-white/90" />,
                  onRightIconClick: () =>
                    drillIn({ sectionId: "power", itemId: "power-usage", nextTitle: "Power Usage" }),
                },
              ]}
              newItemFactory={(idx) => ({
                label: `New Power Item ${idx + 1}`,
                rightIcon: <ChevronRightIcon className="h-4 w-4 text-white/90" />,
                onRightIconClick: () =>
                  drillIn({ sectionId: "power", itemId: `power-new-${idx}`, nextTitle: `New Power Item ${idx + 1}` }),
              })}
            />

            {/* You can also keep a normal (non-addable) section if you want */}
            <AccordionSection
              anchorId="security"
              title="Open Security Measures"
              icon={<LockClosedIcon className="h-5 w-5" />}
              accentColor="rgb(96 165 250 / 0.35)"
              railStroke={1.5}
              railOffset={18}
              elbowLen={28}
              elbowRadius={12}
            >
              <AccordionItem
                itemId="security-rules"
                label="Active Rules"
                rightIcon={<ChevronRightIcon className="h-4 w-4 text-white/90" />}
                onRightIconClick={() =>
                  drillIn({ sectionId: "security", itemId: "security-rules", nextTitle: "Active Rules" })
                }
              />
              <AccordionItem
                itemId="security-alerts"
                label="Recent Alerts"
                rightIcon={<ChevronRightIcon className="h-4 w-4 text-white/90" />}
                onRightIconClick={() =>
                  drillIn({ sectionId: "security", itemId: "security-alerts", nextTitle: "Recent Alerts" })
                }
              />
            </AccordionSection>

            {/* Another addable section example */}
            <AddableAccordionSection
              title="Actions"
              icon={<KeyIcon className="h-5 w-5" />}
              accentColor="rgb(96 165 250 / 0.35)"
              sectionProps={{ railStroke: 1.5, railOffset: 18, elbowLen: 28, elbowRadius: 12 }}
              initialItems={[
                {
                  label: "Place a New Rack",
                  leftIcon: <PlusIcon className="h-4 w-4 text-white/90" />,
                  rightIcon: <ChevronRightIcon className="h-4 w-4 text-white/90" />,
                  onRightIconClick: () =>
                    drillIn({
                      sectionId: "actions",
                      itemId: "actions-place-rack",
                      nextTitle: "Place a New Rack",
                    }),
                },
                {
                  label: "Proceed",
                  rightIcon: <ChevronRightIcon className="h-4 w-4 text-white/90" />,
                  onRightIconClick: () =>
                    drillIn({ sectionId: "actions", itemId: "actions-proceed", nextTitle: "Proceed" }),
                },
              ]}
              newItemFactory={(idx) => ({
                label: `New Action ${idx + 1}`,
                rightIcon: <ChevronRightIcon className="h-4 w-4 text-white/90" />,
                onRightIconClick: () =>
                  drillIn({ sectionId: "actions", itemId: `actions-new-${idx}`, nextTitle: `New Action ${idx + 1}` }),
              })}
            />
          </Accordion>
        ) : (
          <div className="space-y-3">
            <div className="rounded-2xl bg-white/[0.05] ring-1 ring-white/10 p-4">
              <div className="text-white/90 font-medium">Detail view</div>
              <div className="text-white/60 text-sm mt-1">Your content goes here…</div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
