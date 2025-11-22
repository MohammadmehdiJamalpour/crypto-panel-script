import React from "react";
import Accordion from "../components/Accordion.jsx";
import AccordionSection from "../components/AccordionSection.jsx";
import AccordionItem from "../components/AccordionItem.jsx";
import LabelsGroup from "../components/LabelsGroup.jsx";
import LabelRow from "../components/LabelRow.jsx";

const smallDot = <span className="h-2.5 w-2.5 rounded-full bg-green-400" />;

export default function Body({ className = "" }) {
  return (
    <section className={`relative flex-1 px-4 py-6 ${className}`}>
      <div className="mx-auto max-w-md space-y-6">
        <AccordionTemplates />
        <LabelsTemplates />
      </div>
    </section>
  );
}

function AccordionTemplates() {
  return (
    <div className="space-y-3">
      <div className="text-xs font-semibold text-white/70">Accordion templates</div>
      <div className="rounded-3xl bg-white/5 ring-1 ring-white/10 p-4 space-y-4">
        <Accordion>
          <AccordionSection
            title="Quick Status"
            icon={smallDot}
            defaultOpen
            decorateChildrenByDefault={false}
          >
            <AccordionItem label="System Online" decorated />
            <AccordionItem label="Cooling nominal" decorated />
            <AccordionItem label="Network stable" decorated />
          </AccordionSection>

          <AccordionSection
            title="Upcoming Tasks"
            icon={<span className="h-2.5 w-2.5 rounded-full bg-amber-300" />}
            railOffset={10}
            elbowLen={18}
            elbowRadius={7}
          >
            <AccordionItem label="Check rack airflow" />
            <AccordionItem label="Verify camera feeds" />
            <AccordionItem label="Inspect alarms panel" />
          </AccordionSection>
        </Accordion>
      </div>
    </div>
  );
}

function LabelsTemplates() {
  const badge = <span className="h-2.5 w-2.5 rounded-full bg-emerald-300" />;
  const defaultItems = [
    { icon: badge, label: "Status", value: "Online" },
    { icon: badge, label: "Power", value: "[424/1000] KW/h" },
    { icon: badge, label: "Cooling", value: "Nominal" },
  ];

  return (
    <div className="space-y-3">
      <div className="text-xs font-semibold text-white/70">Label templates</div>
      <div className="rounded-3xl bg-white/5 ring-1 ring-white/10 p-4 space-y-4">
        <LabelsGroup items={defaultItems} />

        <LabelRow
          icon={badge}
          label="Single row"
          value="Clickable"
          chevron
          className="mt-2"
        />
      </div>
    </div>
  );
}
