import React from "react";

export default function Footer() {
  return (

    <footer className="shrink-0">
      <div>
        <div
          className="
            relative h-16 w-full
            rounded-2xl
            bg-primary ring-1 ring-white/10
            flex items-center justify-center
            bg-[url('/footer-icon.svg')] bg-no-repeat bg-center
            scale-x-125 lg:scale-x-150
          "
        />
      </div>
    </footer>
  );
}
