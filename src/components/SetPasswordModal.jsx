import React, { useState } from "react";
import Modal from "./Modal.jsx";

export default function SetPasswordModal({ open, onClose, onSave }) {
  const [pwd, setPwd] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!pwd || pwd.length < 4) {
      setError("Password must be at least 4 characters");
      return;
    }
    try {
      setSubmitting(true);
      await onSave?.(pwd);
      setError("");
      onClose?.();
    } catch (err) {
      setError(err?.message || "Failed to update password");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal open={open} onClose={onClose} title="Set New Password">
      <form className="space-y-4" onSubmit={handleSubmit}>
        <label className="block text-sm text-white/80">
          New Password
          <input
            type="password"
            value={pwd}
            onChange={(e) => setPwd(e.target.value)}
            className="mt-2 w-full rounded-lg bg-white/10 ring-1 ring-white/10 px-3 py-2 text-white outline-none focus:ring-2 focus:ring-blue-500/70"
            placeholder="Enter new password"
          />
        </label>
        {error ? <div className="text-sm text-red-400">{error}</div> : null}
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
            disabled={submitting}
            className="px-4 py-2 rounded-lg bg-blue-600/80 hover:bg-blue-600 text-white ring-1 ring-blue-400/40 disabled:opacity-60"
          >
            {submitting ? "Saving..." : "Save"}
          </button>
        </div>
      </form>
    </Modal>
  );
}
