import React from "react";
import LoginModal from "../components/LoginModal.jsx";

export default function Body({ className = "" }) {
  const [open, setOpen] = React.useState(false);

  const handleConfirm = async ({ host, password }) => {
    // TODO: replace with your real auth call
    await new Promise((r) => setTimeout(r, 600));
    console.log("Login payload:", { host, password });
    // throw new Error("Wrong credentials"); // uncomment to test error state
  };

  return (
    <section className={`relative flex-1 px-4 py-6 ${className}`}>
      <div className="mx-auto max-w-md">
        <button
          onClick={() => setOpen(true)}
          className="w-full h-12 rounded-2xl bg-white/10 ring-1 ring-white/15
                     text-white hover:bg-white/20 transition-colors"
        >
          Open Login Modal
        </button>
      </div>

      <LoginModal
        open={open}
        onClose={() => setOpen(false)}
        onConfirm={handleConfirm}
        // You can customize labels/validators if needed:
        // title="Enter Warehouse IP"
        // validateHost={(h) => (!h ? "Host required" : null)}
        // validatePassword={(p) => (p.length < 6 ? "Min 6 chars" : null)}
      />
    </section>
  );
}
