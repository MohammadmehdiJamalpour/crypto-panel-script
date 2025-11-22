import React, { useMemo } from "react";
import ProfileBadge from "../components/ProfileBadge";

const DEFAULT_AVATAR = "/profile-defualt.jpg";

export default function AppHeader({ profile }) {
  const { name, bio, profileImg } = useMemo(() => {
    const fallback = { name: "Bizhan Bahrami", bio: "Sales Materials", profileImg: DEFAULT_AVATAR };
    if (!profile) return fallback;
    return {
      name: profile.name || fallback.name,
      bio: profile.bio || fallback.bio,
      profileImg: profile.profileImg || fallback.profileImg,
    };
  }, [profile]);

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

      {/* Header content driven by profile */}
      <ProfileBadge
        name={name}
        subtitle={bio}
        avatarSrc={profileImg}
        className="absolute top-[10%] left-[10%] md:top-[15%]"
      />
    </header>
  );
}
