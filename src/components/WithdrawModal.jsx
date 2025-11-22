import React, { useState } from "react";
import Modal from "./Modal.jsx";

export default function WithdrawModal({ open, coin, onClose }) {
  const [address, setAddress] = useState("");
  const title = coin ? `Withdraw ${coin.name || coin.symbol || ""}` : "Withdraw";

  const handleSubmit = (e) => {
    e.preventDefault();
    onClose?.();
  };

  return (
    <Modal open={open} onClose={onClose} title={title}>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <label className="block text-sm text-white/80">
          Wallet Address
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="mt-2 w-full rounded-lg bg-white/10 ring-1 ring-white/10 px-3 py-2 text-white outline-none focus:ring-2 focus:ring-blue-500/70"
            placeholder="Enter destination address"
            required
          />
        </label>
        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-white/10 ring-1 ring-white/20 text-white hover:bg-white/15 transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 rounded-lg bg-blue-600/80 hover:bg-blue-600 text-white ring-1 ring-blue-400/40"
          >
            Confirm
          </button>
        </div>
      </form>
    </Modal>
  );
}
