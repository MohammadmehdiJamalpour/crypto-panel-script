import React from "react";
import Label from "../components/Label.jsx";

import PowerDetailView from "../components/PowerDetailView.jsx";
import RackDetailView from "../components/RackDetailView.jsx";
import SecurityDetailView from "../components/SecurityDetailView.jsx";
import WithdrawModal from "../components/WithdrawModal.jsx";
import SetPasswordModal from "../components/SetPasswordModal.jsx";
import { data, updateProfilePassword, submitWithdrawRequest } from "../data.js";
import {
  PowerIcon,
  BoltIcon,
  LinkIcon,
  BanknotesIcon,
  WrenchIcon,
  ShieldCheckIcon,
  LockClosedIcon
} from "@heroicons/react/24/outline";
import { ChevronDownIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import Accordion from "../components/Accordion.jsx";
import AccordionSection from "../components/AccordionSection.jsx";
import AccordionItem from "../components/AccordionItem.jsx";

export default function Body({ className = "" }) {
  const isStandalone = data.rackStandaloneMode;
  const targetRackId = data.rackStandaloneRackId;

  const initialItem = isStandalone
    ? {
        key: "rackControl",
        title: "Rack Control Menu",
        standalone: true,
        targetRackId,
      }
    : null;

  const [activeItem, setActiveItem] = React.useState(initialItem);
  const [activeCoin, setActiveCoin] = React.useState(null);
  const [passwordModalOpen, setPasswordModalOpen] = React.useState(!!data.setPasswordModal);
  const [withdrawModalOpen, setWithdrawModalOpen] = React.useState(!!data.setWithdrawModal);

  const handleOpenPassword = React.useCallback(() => {
    setPasswordModalOpen(true);
    data.setPasswordModal = true;
  }, []);

  return (
    <section className={`relative flex-1 px-4 py-6 overflow-hidden ${className}`}>
      {/* subtle background illustration for menu area */}
      <div
        aria-hidden
        className="
          pointer-events-none fixed inset-0 top-28 -z-10 
          bg-[url('/crypto-tokens.svg')] bg-no-repeat bg-center bg-contain
        "
      />
      <div className="mx-auto max-w-md ">
        {activeItem ? (
          <DetailView
            item={activeItem}
            onBack={isStandalone ? undefined : () => setActiveItem(null)}
            onOpenPassword={handleOpenPassword}
          />
        ) : (
          <MainList
            onOpen={(item) => setActiveItem(item)}
            onOpenCoin={(coin) => {
              setActiveCoin(coin);
              setWithdrawModalOpen(true);
              data.setWithdrawModal = true;
            }}
            onOpenPassword={handleOpenPassword}
          />
        )}
        <WithdrawModal
          open={withdrawModalOpen && !!activeCoin}
          coin={activeCoin}
          onClose={() => {
            setActiveCoin(null);
            setWithdrawModalOpen(false);
            data.setWithdrawModal = false;
          }}
          onSave={({ coin, address }) => {
            return submitWithdrawRequest({ coin, address });
          }}
        />
        <SetPasswordModal
          open={passwordModalOpen}
          onClose={() => {
            setPasswordModalOpen(false);
            data.setPasswordModal = false;
          }}
          onSave={(pwd) => {
            return updateProfilePassword(pwd);
          }}
        />
      </div>
    </section>
  );
}

function MainList({ onOpen, onOpenCoin, onOpenPassword }) {
  const statusIsOnline = data.status?.toLowerCase?.() === "online";
  const statusText = statusIsOnline ? "Online" : "Offline";
  const statusColor = statusIsOnline ? "text-emerald-300" : "text-red-300";
  const capacity = data.powerUsage?.capacity ?? 1000;
  const currentPower = data.powerUsage?.powerUsage ?? 0;
  const powerPct = Math.min(
    100,
    Math.max(0, Math.round((currentPower / capacity) * 100))
  );
  const healthPct = Math.min(100, Math.max(0, data.overallHealthValue ?? 50));
  const [withdrawOpen, setWithdrawOpen] = React.useState(false);

  const items = [
    {
      key: "status",
      icon: <PowerIcon className={`h-5 w-5 ${statusColor}`} />,
      label: <span className={statusColor}>Status</span>,
      value: <span className={statusColor}>{statusText}</span>,
      chevron: false,
    },
    {
      key: "rackControl",
      icon: <WrenchIcon className="h-5 w-5 text-blue-200" />,
      label: "Open Racks Control Menu",
      chevron: true,
      onClick: () => onOpen({ key: "rackControl", title: "Rack Control Menu" }),
      onChevronClick: () =>
        onOpen({ key: "rackControl", title: "Rack Control Menu" }),
    },
    {
      key: "security",
      icon: <LockClosedIcon className="h-5 w-5 text-blue-200" />,
      label: "Open Security Measures",
      chevron: true,
      onClick: () => onOpen({ key: "security", title: "Security Measures" }),
      onChevronClick: () =>
        onOpen({ key: "security", title: "Security Measures" }),
    },
    {
      key: "powerUsage",
      icon: <BoltIcon className="h-5 w-5 text-blue-200" />,
      label: "Power Usage",
      value: `[${currentPower}/${capacity}] KW/h`,
      chevron: true,
      progress: powerPct,
      onClick: () => onOpen({ key: "powerUsage", title: "Power Usage" }),
      onChevronClick: () => onOpen({ key: "powerUsage", title: "Power Usage" }),
    },
    {
      key: "overallHealth",
      icon: <WrenchIcon className="h-5 w-5 text-blue-200" />,
      label: "Overall Miners Health",
      progress: healthPct,
      chevron: false,
    },
    {
      key: "setPassword",
      icon: <ShieldCheckIcon className="h-5 w-5 text-red-500" />,
      label: "Set New Password",
      onClick: onOpenPassword,
      onChevronClick: onOpenPassword,
    },

    {
      key: "warehouseIp",
      icon: <LinkIcon className="h-5 w-5 text-blue-200" />,
      label: "Warehouse IP",
      value: data.warehouseIp ?? "",
      chevron: false,
    },
    {
      key: "approxYield",
      icon: <BanknotesIcon className="h-5 w-5  text-green-600" />,
      label: "Approximate Yield",
      value: data.approximateYield ?? "",
      chevron: false,
    },
   
  ];

  const withdrawChildren = [
    {
      key: "withdraw-main",
      icon: <BanknotesIcon className="h-5 w-5 text-blue-200" />,
      label: "Withdraw",
      value: data.withdraw ?? "",
      chevron: false,
    },
    ...(data.withdrawOptions || []).map((opt, idx) => ({
      key: `withdraw-opt-${idx}`,
      icon: <BanknotesIcon className="h-5 w-5 text-blue-200" />,
      label: opt?.label ?? String(opt ?? ""),
      value: opt?.value ?? "",
      chevron: true,
    })),
  ];

  return (
    <div className="space-y-3">
      <Label items={items} />
      {withdrawOpen ? (
        <Label className="pl-6" items={withdrawChildren} />
      ) : null}
      <CryptoAccordion onOpenCoin={onOpenCoin} />
    </div>
  );
}

function DetailView({ item, onBack, onOpenPassword }) {
  const statusIsOnline = data.status?.toLowerCase?.() === "online";
  const statusColor = statusIsOnline ? "text-emerald-300" : "text-red-300";
  const powerUsage = data.powerUsage?.powerUsage ?? 0;
  const capacity = data.powerUsage?.capacity ?? 1000;
  const overhead = data.powerUsage?.overheadUsage?.RackA1 ?? 0;

  if (item.key === "powerUsage") {
    return (
      <PowerDetailView
        title={item.title}
        onBack={onBack}
        statusColor={statusColor}
        statusText={statusIsOnline ? "Online" : "Offline"}
        powerUsage={powerUsage}
        capacity={capacity}
        overhead={overhead}
        onOpenPassword={onOpenPassword}
      />
    );
  }

  if (item.key === "rackControl") {
    return (
      <RackDetailView
        title={item.title}
        onBack={onBack}
        rackSection={data.rackSection}
        standalone={item?.standalone || data.rackStandaloneMode}
        targetRackId={item?.targetRackId || data.rackStandaloneRackId}
      />
    );
  }

  if (item.key === "security") {
    return (
      <SecurityDetailView
        title={item.title}
        onBack={onBack}
        security={data.security}
      />
    );
  }

  onBack();
  return null;
}

function CryptoAccordion({ onOpenCoin }) {
  const coins = data.cryptoCoins || [];
  return (
    <Accordion className="space-y-2">
      <AccordionSection
        title={`Withdraw: ${data.withdraw ?? ""}`}
        icon={<BanknotesIcon className="h-5 w-5 text-blue-200" />}
        defaultOpen={false}
        decorateChildrenByDefault
      >
        <AccordionItem
          label={`withdraw with :`}
          leftIcon={<BanknotesIcon className="h-5 w-5 text-blue-200" />}
        />
        {coins.map((coin) => (
          <AccordionItem
            key={coin.symbol}
            label={`${coin.name} (${coin.symbol})`}
            leftIcon={<BanknotesIcon className="h-5 w-5 text-blue-200" />}
            value={coin.value}
            chevron
            onClick={() => onOpenCoin?.(coin)}
            onChevronClick={() => onOpenCoin?.(coin)}
          />
        ))}
      </AccordionSection>
    </Accordion>
  );
}
