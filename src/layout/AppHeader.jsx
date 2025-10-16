import React from "react";
import ProfileBadge from "../components/ProfileBadge";

// Replace with your real avatar path (public or src asset)
const avatar = "/profile-defualt.jpg"; 

export default function AppHeader() {
  return (
       <header
      className="
        relative top-0 z-40 w-full min-h-56
        overflow-hidden rounded-3xl
      "
    >
      {/* BG layer: ONLY this scales horizontally */}
      <div
        className="
          pointer-events-none absolute inset-0 -z-10
          bg-[url('/header-bg.svg')] bg-no-repeat bg-center
          bg-contain 
          origin-center scale-x-105 md:scale-x-125 lg:scale-x-140 lg:scale-y-110 xl:scale-y-100 xl:scale-x-150 
          transition-transform
        "
        aria-hidden
      />

      {/* Your header content */}
      <ProfileBadge
        name="Bizhan Bahrami"
        subtitle="Sales Materials"
        avatarSrc={avatar}
        className="absolute top-[10%] left-[10%] md:top-[15%]"
      />
    </header>
  );
}
