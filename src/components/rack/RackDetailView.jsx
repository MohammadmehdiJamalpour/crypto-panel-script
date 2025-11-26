import React, { useEffect, useMemo, useState } from "react";
import Label from "../ui/Label.jsx";
import DetailLayout from "../ui/detail/DetailLayout.jsx";
import Accordion from "../ui/accordion/Accordion.jsx";
import AccordionSection from "../ui/accordion/AccordionSection.jsx";
import AccordionItem from "../ui/accordion/AccordionItem.jsx";
import AddRackModal from "./AddRackModal.jsx";
import { WrenchIcon, PlusIcon, PowerIcon, BanknotesIcon, Cog6ToothIcon, TrashIcon, BoltIcon } from "@heroicons/react/24/outline";
import { changeRackPosition, data, removeRackById, requestMinerRepair } from "../../data.js";

export default function RackDetailView({ title, onBack, rackSection, standalone = false, targetRackId = null }) {
  const racks = rackSection?.racks || [];
  const [rackModalOpen, setRackModalOpen] = useState(!!(data.addRackModal || rackSection?.addRackModal));
  const [selectedType, setSelectedType] = useState(rackSection?.selectedRackType || null);
  const [selectedRack, setSelectedRack] = useState(null);

  const targetRack = useMemo(
    () => (standalone && targetRackId ? racks.find((r) => r.rackId === targetRackId) || null : null),
    [racks, standalone, targetRackId]
  );

  // Auto-open a specific rack when in standalone mode
  useEffect(() => {
    if (standalone && targetRack && !selectedRack) {
      setSelectedRack(targetRack);
    }
  }, [standalone, targetRack, selectedRack]);

  // sync add rack modal with data flag
  useEffect(() => {
    if (data.addRackModal && !rackModalOpen) setRackModalOpen(true);
    if (!data.addRackModal && rackModalOpen && !rackSection?.addRackModal) setRackModalOpen(false);
  }, [rackModalOpen, rackSection?.addRackModal]);

  const currentRack = selectedRack || targetRack || null;

  const baseDetailLabels = currentRack
    ? [
        {
          icon: (
            <PowerIcon
              className={`h-4 w-4 ${
                (currentRack.rackStatus || "").toLowerCase() === "online" ? "text-emerald-300" : "text-red-400"
              }`}
            />
          ),
          label: (
            <span
              className={`${
                (currentRack.rackStatus || "").toLowerCase() === "online" ? "text-emerald-300" : "text-red-400"
              }`}
            >
              Status
            </span>
          ),
          value: (
            <span
              className={`${
                (currentRack.rackStatus || "").toLowerCase() === "online" ? "text-emerald-300" : "text-red-400"
              }`}
            >
              {currentRack.rackStatus}
            </span>
          ),
        },
        { icon: <BanknotesIcon className="h-4 w-4 text-blue-200" />, label: "Approximate Yield", value: `${currentRack.yield ?? 0}` },
        {
          icon: <Cog6ToothIcon className="h-4 w-4 text-blue-200" />,
          label: "Overall Miners Health",
          progress: Math.min(100, Math.max(0, currentRack.overallMinersHealth ?? 0)),
        },
      ]
    : [];

  const standaloneActions = standalone && currentRack
    ? [
        {
          icon: <WrenchIcon className="h-4 w-4 text-blue-200" />,
          label: "Change Rack Position",
          chevron: true,
          onClick: async () => {
            await changeRackPosition({ rackId: currentRack.rackId });
          },
          onChevronClick: async () => {
            await changeRackPosition({ rackId: currentRack.rackId });
          },
        },
        {
          icon: <TrashIcon className="h-4 w-4 text-red-300" />,
          label: "Remove Rack",
          chevron: true,
          onClick: async () => {
            await removeRackById(currentRack.rackId);
            setSelectedRack(null);
          },
          onChevronClick: async () => {
            await removeRackById(currentRack.rackId);
            setSelectedRack(null);
          },
        },
      ]
    : [];

  const rackDetailLabels = currentRack ? [...baseDetailLabels, ...standaloneActions] : [];

  const healthColor = (val) => {
    const num = Number(val ?? 0);
    if (num >= 70) return "text-emerald-300";
    if (num >= 40) return "text-amber-300";
    return "text-red-400";
  };

  const minerStatusText = (val) => {
    const num = Number(val ?? 0);
    if (num >= 70) return "Online";
    if (num >= 40) return "Degraded";
    return "Offline";
  };

  const minerProgress = (val) => Math.min(100, Math.max(0, Number(val ?? 0)));

  if (currentRack) {
    return (
      <DetailLayout title={currentRack.rackName} onBack={standalone ? undefined : () => setSelectedRack(null)}>
        <Label items={rackDetailLabels} />

        {(currentRack.miners || []).length > 0 ? (
          <Accordion className="mt-3 space-y-2">
            {(currentRack.miners || []).map((miner) => {
              const color = healthColor(miner.minerHealth);
              const statusText = minerStatusText(miner.minerHealth);
              const pct = minerProgress(miner.minerHealth);

              return (
                <AccordionSection
                  key={miner.minerId}
                  title={
                    <div className="flex flex-col w-full gap-1">
                      <div className="flex items-center justify-between">
                        <span className="text-white/90">{miner.minerName}</span>
                        <span className={`text-xs ${color}`}>{pct}%</span>
                      </div>
                      <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
                        <div
                          className="h-full rounded-full bg-green-500 transition-[width] duration-300 ease-out"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  }
                  icon={<BoltIcon className={`h-4 w-4 ${color}`} />}
                  defaultOpen={false}
                  decorateChildrenByDefault
                >
                  <AccordionItem
                    label="Power Usage"
                    value={`${miner.powerUsage ?? 0} W`}
                    leftIcon={<BoltIcon className="h-4 w-4 text-blue-200" />}
                  />
                  <AccordionItem
                    label="Last Repair"
                    value={miner.minerLastRepair ?? "--"}
                    leftIcon={<WrenchIcon className="h-4 w-4 text-blue-200" />}
                  />
                  {pct < 100 ? (
                    <AccordionItem
                      label="Repair Needed"
                      leftIcon={<Cog6ToothIcon className="h-4 w-4 text-amber-300" />}
                      chevron
                      onClick={async () => {
                        await requestMinerRepair({ rackId: currentRack.rackId, minerId: miner.minerId });
                      }}
                      onChevronClick={async () => {
                        await requestMinerRepair({ rackId: currentRack.rackId, minerId: miner.minerId });
                      }}
                    />
                  ) : null}
                </AccordionSection>
              );
            })}
          </Accordion>
        ) : null}
      </DetailLayout>
    );
  }

  if (standalone && targetRackId) {
    return (
      <DetailLayout title={title} onBack={undefined}>
        <Label
          items={[
            {
              icon: <WrenchIcon className="h-4 w-4 text-blue-200" />,
              label: "Rack not found",
              value: targetRackId,
            },
          ]}
        />
      </DetailLayout>
    );
  }

  return (
    <DetailLayout title={title} onBack={standalone ? undefined : onBack}>
      <Accordion className="space-y-2">
        <AccordionSection
          title="Place a new Rack"
          icon={<WrenchIcon className="h-4 w-4 text-blue-200" />}
          defaultOpen={false}
          decorateChildrenByDefault
        >
          {(rackSection?.createRackOptions || []).map((opt) => (
            <AccordionItem
              key={opt}
              label={opt}
              leftIcon={<PlusIcon className="h-4 w-4 text-blue-200" />}
              chevron
              onClick={() => {
                setSelectedType(opt);
                setRackModalOpen(true);
                data.addRackModal = true;
                data.rackSection.selectedRackType = opt;
              }}
              onChevronClick={() => {
                setSelectedType(opt);
                setRackModalOpen(true);
                data.addRackModal = true;
                data.rackSection.selectedRackType = opt;
              }}
            />
          ))}
        </AccordionSection>
        <AccordionSection
          title="Placed Racks"
          icon={<WrenchIcon className="h-4 w-4 text-blue-200" />}
          defaultOpen={false}
          decorateChildrenByDefault
        >
          {racks.map((rack) => (
            <AccordionItem
              key={rack.rackId}
              label={rack.rackName}
              value={
                <span
                  className={`${
                    (rack.rackStatus || "").toLowerCase() === "online" ? "text-emerald-300" : "text-red-400"
                  }`}
                >
                  {rack.rackStatus}
                </span>
              }
              leftIcon={
                <PowerIcon
                  className={`h-4 w-4 ${
                    (rack.rackStatus || "").toLowerCase() === "online" ? "text-emerald-300" : "text-red-400"
                  }`}
                />
              }
              chevron
              onClick={() => setSelectedRack(rack)}
              onChevronClick={() => setSelectedRack(rack)}
            />
          ))}
        </AccordionSection>
      </Accordion>
      <AddRackModal
        open={rackModalOpen}
        rackType={selectedType}
        onClose={() => {
          setRackModalOpen(false);
          data.addRackModal = false;
          data.rackSection.addRackModal = false;
          data.rackSection.selectedRackType = null;
        }}
      />
    </DetailLayout>
  );
}
