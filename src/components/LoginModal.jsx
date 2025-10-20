import React from "react";
import Modal from "./Modal";
import {
  GlobeAltIcon,
  KeyIcon,
  EyeIcon,
  EyeSlashIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/outline";

/** Small helper: same chip used across your UI */
function Chip({ children }) {
  return (
    <span className="grid place-items-center h-8 w-8 rounded-xl ring-1 ring-white/10 bg-white/10 text-white">
      {children}
    </span>
  );
}

export default function LoginModal({
  open,
  onClose,
  onConfirm, // (payload: { host, password }) => Promise|void

  // Texts
  title = "Enter Warehouse IP",
  hostLabel = "Warehouse IP",
  hostHelp = "Ip address of the warehouse laptop",
  passwordLabel = "Password",
  passwordHelp = "Password for accessing the control panel",
  confirmText = "CONFIRM",
  cancelText = "CANCEL",

  // Defaults
  initialHost = "",
  initialPassword = "",

  // Optional validators: return string error or null/undefined
  // (If provided, they override the simple >=4 rule below)
  validateHost,
  validatePassword,
}) {
  const [host, setHost] = React.useState(initialHost);
  const [password, setPassword] = React.useState(initialPassword);
  const [showPw, setShowPw] = React.useState(false);
  const [submitting, setSubmitting] = React.useState(false);
  const [formError, setFormError] = React.useState("");
  const [touched, setTouched] = React.useState({ host: false, password: false });

  // Minimal validation
  const minLenMsg = "Must be at least 4 characters";
  const defaultHostValidator = (value) => {
    if (!value) return "Host/IP is required";
    if (value.length < 4) return minLenMsg;
    return null;
  };
  const defaultPwValidator = (value) => {
    if (!value) return "Password is required";
    if (value.length < 4) return minLenMsg;
    return null;
  };

  const hostError =
    (touched.host && (validateHost?.(host) ?? defaultHostValidator(host))) || "";
  const pwError =
    (touched.password &&
      (validatePassword?.(password) ?? defaultPwValidator(password))) ||
    "";

  const canSubmit = !hostError && !pwError && host && password && !submitting;

  const submit = async (e) => {
    e?.preventDefault?.();
    setTouched({ host: true, password: true });
    setFormError("");
    if (!canSubmit) return;
    try {
      setSubmitting(true);
      await onConfirm?.({ host, password });
      setSubmitting(false);
      onClose?.();
    } catch (err) {
      setSubmitting(false);
      setFormError(err?.message || "Failed to confirm. Please try again.");
    }
  };

  // Press Enter to submit (only when modal open)
  React.useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Enter") submit(e);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, host, password, canSubmit]);

  return (
    <Modal open={open} onClose={onClose} title={title}>
      <form onSubmit={submit} className="space-y-4">
        {/* Host */}
        <label className="block">
          <div className="flex items-center gap-1.5">
            <span className="text-sm font-medium text-white/90">{hostLabel}</span>
            <span className="text-red-400">*</span>
          </div>
          <div className="text-xs text-white/60 mt-0.5">{hostHelp}</div>

          <div className="mt-2 flex items-center gap-2 rounded-xl ring-1 ring-white/15 bg-white/[0.05] px-2 py-1.5 focus-within:ring-blue-500/50">
            <Chip>
              <GlobeAltIcon className="h-4 w-4 text-white/85" />
            </Chip>

            {/* no trim; free typing/paste */}
            <input
              type="text"
              value={host}
              onChange={(e) => setHost(e.target.value)}
              onBlur={() => setTouched((t) => ({ ...t, host: true }))}
              placeholder="www.bbs_warehouse_main1.com"
              className="flex-1 bg-transparent outline-none text-white placeholder:text-white/40 text-sm"
              autoFocus
            />
          </div>

          {hostError ? (
            <div className="mt-1 flex items-center gap-1 text-xs text-red-400">
              <ExclamationCircleIcon className="h-4 w-4" />
              {hostError}
            </div>
          ) : null}
        </label>

        {/* Password */}
        <label className="block">
          <div className="flex items-center gap-1.5">
            <span className="text-sm font-medium text-white/90">{passwordLabel}</span>
            <span className="text-red-400">*</span>
          </div>
          <div className="text-xs text-white/60 mt-0.5">{passwordHelp}</div>

          <div className="mt-2 flex items-center gap-2 rounded-xl ring-1 ring-white/15 bg-white/[0.05] px-2 py-1.5 focus-within:ring-blue-500/50">
            <Chip>
              <KeyIcon className="h-4 w-4 text-white/85" />
            </Chip>

            <input
              type={showPw ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onBlur={() => setTouched((t) => ({ ...t, password: true }))}
              placeholder="••••••••"
              className="flex-1 bg-transparent outline-none text-white placeholder:text-white/40 text-sm"
            />

            <button
              type="button"
              onClick={() => setShowPw((v) => !v)}
              className="grid place-items-center h-8 w-8 rounded-xl ring-1 ring-white/10 bg-white/10 text-white/90 hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500/60"
              aria-label={showPw ? "Hide password" : "Show password"}
            >
              {showPw ? <EyeSlashIcon className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
            </button>
          </div>

          {pwError ? (
            <div className="mt-1 flex items-center gap-1 text-xs text-red-400">
              <ExclamationCircleIcon className="h-4 w-4" />
              {pwError}
            </div>
          ) : null}
        </label>

        {formError ? (
          <div className="text-sm text-red-400">{formError}</div>
        ) : null}

        {/* Footer actions */}
        <div className="mt-6 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            disabled={submitting}
            className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 ring-1 ring-white/20 text-white disabled:opacity-60"
          >
            {cancelText}
          </button>
          <button
            type="submit"
            disabled={!canSubmit}
            className="px-4 py-2 rounded-lg bg-blue-600/80 hover:bg-blue-600 text-white ring-1 ring-blue-400/40 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {submitting ? "WORKING..." : confirmText}
          </button>
        </div>
      </form>
    </Modal>
  );
}
