import React from "react";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

export default function ViewDetailHeader({ title, onBack }) {
  return (
    <div className="flex items-center gap-3 w-full rounded-2xl px-2 py-2">
      <button
        type="button"
        onClick={onBack}
        className="inline-flex items-center hover:bg-white/20 transition-color duration-300 gap-2 px-3 py-2 rounded-xl bg-white/10 ring-1 ring-white/10 text-sm text-blue-100 hover:text-white transition-colors shrink-0"
      >
        <ArrowLeftIcon className="h-4 w-4" />
        <span className="font-medium transition-colors duration-200 hover:text-blue-200">Back</span>
      </button>
      <div className="flex-1 font-bold text-lg px-3 py-2 rounded-xl bg-white/5 ring-1 ring-white/10 text-white/80 text-sm">
        {title}
      </div>
    </div>
  );
}
