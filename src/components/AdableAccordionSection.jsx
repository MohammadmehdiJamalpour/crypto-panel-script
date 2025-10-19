// src/components/AddableAccordionSection.jsx
import React from "react";
import AccordionSection from "./AccordionSection.jsx";
import AccordionItem from "./AccordionItem.jsx";
import PlusButton from "./atoms/PlusButton.jsx";
import useDynamicList from "./utils/useDynamicList";

/**
 * initialItems: array of strings or { label, leftIcon?, rightIcon? }
 * newItemFactory: (idx, items) => item
 */
export default function AddableAccordionSection({
  title,
  icon,
  accentColor = "rgb(96 165 250 / 0.35)",
  initialItems = [],
  newItemFactory = (idx) => ({ label: `New Item ${idx + 1}` }),
  sectionProps = {}, // pass-through props for AccordionSection (railOffset, etc.)
  onItemsChange, // optional callback(items)
}) {
  const { items, add } = useDynamicList(
    // normalize into objects with {label,...}
    initialItems.map((it) => (typeof it === "string" ? { label: it } : it)),
    { factory: (_, idx, prev) => newItemFactory(idx, prev) }
  );

  React.useEffect(() => {
    onItemsChange?.(items);
  }, [items, onItemsChange]);

  return (
    <AccordionSection
      title={title}
      icon={icon}
      accentColor={accentColor}
      {...sectionProps}
    >
      {items.map((it, i) => (
        <AccordionItem
          key={i}
          label={it.label}
          leftIcon={it.leftIcon}
          rightIcon={it.rightIcon}
          onLeftIconClick={it.onLeftIconClick}
          onRightIconClick={it.onRightIconClick}
        />
      ))}

      {/* “+” row at the bottom of the section */}
      <AccordionItem decorated padding="px-2">
        <div className="w-full h-full flex items-center justify-center">
          <PlusButton onClick={() => add()} />
        </div>
      </AccordionItem>
    </AccordionSection>
  );
}
