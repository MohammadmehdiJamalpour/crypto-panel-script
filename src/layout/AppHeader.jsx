import React from "react";
import ProfileBadge from "../components/ProfileBadge";

// Replace with your real avatar path (public or src asset)
const avatar = "/profile-defualt.jpg"; 

export default function AppHeader() {
  return (
    <header
      className="
        relative
        top-0 z-40 w-full min-h-56 border-b border-white/10
        bg-[url('/header-bg.svg')] bg-no-repeat bg-center
        bg-[length:70%] md:bg-[length:65%] lg:bg-[length:60%]
      "
    >
      <ProfileBadge
        name="Bizhan Bahrami"
        subtitle="Sales Materials"
        avatarSrc={avatar}
        className="absolute top-[20%] left-[10%]"
      />
    </header>
  );
}
