import React, { useState } from "react";
import Modal from "../Modal.jsx";
import { addSecurityCamera } from "../../services/security.js";

export default function AddCameraModal({ open, onClose, onAdded }) {
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setError("Camera name is required");
      return;
    }
    try {
      setSubmitting(true);
      await addSecurityCamera(name.trim());
      setName("");
      setError("");
      onAdded?.();
      onClose?.();
    } catch (err) {
      setError(err?.message || "Failed to add camera");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal open={open} onClose={onClose} title="Add New Camera">
      <form className="space-y-4" onSubmit={handleSubmit}>
        <label className="block text-sm text-white/80">
          Camera Name
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-2 w-full rounded-lg bg-white/10 ring-1 ring-white/10 px-3 py-2 text-white outline-none focus:ring-2 focus:ring-blue-500/70"
            placeholder="Entrance Camera"
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
            {submitting ? "Adding..." : "Add"}
          </button>
        </div>
      </form>
    </Modal>
  );
}
