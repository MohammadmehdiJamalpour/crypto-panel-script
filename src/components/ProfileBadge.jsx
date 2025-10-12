import React from "react";

export default function ProfileBadge({ name, subtitle, avatarSrc, className = "" }) {
  return (
    <div
      className={`flex items-center gap-3 px-4 py-3 rounded-3xl
                  bg-white/10 backdrop-blur-sm ring-1 ring-white/10
                  ${className}`}
    >
      <img
        src={avatarSrc}
        alt={`${name} avatar`}
        className="h-10 lg:w-14  w-10 lg:h-14 bg-gray-500 rounded-full object-cover shadow-md"
      />
      <div className="leading-tight">
        <div className="text-white font-semibold lg:text-lg">{name}</div>
        {subtitle && (
          <div className="text-white/70 text-xs tracking-wide uppercase">
            {subtitle}
          </div>
        )}
      </div>
    </div>
  );
}
