import React, { forwardRef, useId, useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

/**
 * Reusable input field (text/password/…)
 *
 * Props:
 *  - type: "text" | "password" | "email" | ...
 *  - label?: string
 *  - name?: string
 *  - placeholder?: string
 *  - value?: string (controlled)
 *  - defaultValue?: string (uncontrolled)
 *  - onChange?: (e) => void
 *  - disabled?: boolean
 *  - readOnly?: boolean
 *  - required?: boolean
 *  - autoComplete?: string
 *  - error?: string | boolean
 *  - hint?: string
 *  - leadingIcon?: ReactNode
 *  - trailingIcon?: ReactNode
 *  - passwordToggle?: boolean (default: true if type==="password")
 *  - size?: "sm" | "md" (default: "md")
 *  - className?: string (extra classes for outer wrapper)
 */
const InputField = forwardRef(function InputField(
  {
    type = "text",
    label,
    name,
    placeholder,
    value,
    defaultValue,
    onChange,
    disabled = false,
    readOnly = false,
    required = false,
    autoComplete,
    error = false,
    hint,
    leadingIcon,
    trailingIcon,
    passwordToggle,
    size = "md",
    className = "",
    ...rest
  },
  ref
) {
  const uid = useId();
  const inputId = name || uid;
  const describedById = hint || error ? `${inputId}-desc` : undefined;

  const [show, setShow] = useState(false);
  const isPassword = type === "password";
  const canToggle = passwordToggle ?? isPassword;

  // Tailwind size map
  const paddings =
    size === "sm"
      ? "h-10 text-sm pl-4 pr-10"
      : "h-12 text-base pl-4 pr-12"; // md default

  const leftPadding = leadingIcon ? "pl-11" : paddings.split(" ")[2]; // keep original left padding if no icon
  const rightPadding = canToggle || trailingIcon ? "pr-12" : paddings.split(" ")[3];

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label
          htmlFor={inputId}
          className="mb-1.5 block text-sm text-white/80 select-none"
        >
          {label} {required && <span className="text-rose-400">*</span>}
        </label>
      )}

      {/* Outer shell for ring & background */}
      <div
        className={[
          "relative flex items-center rounded-2xl",
          "bg-gray-900 text-white",
          "ring-1 ring-blue-600/30 focus-within:ring-2 focus-within:ring-blue-500/60",
          "transition-shadow duration-150",
          disabled ? "opacity-60 cursor-not-allowed" : "",
        ].join(" ")}
      >
        {/* Leading icon slot */}
        {leadingIcon && (
          <span className="pointer-events-none absolute left-3 text-white/60">
            <span className="inline-flex h-5 w-5 items-center justify-center">
              {leadingIcon}
            </span>
          </span>
        )}

        {/* The input */}
        <input
          id={inputId}
          name={name}
          ref={ref}
          type={isPassword && show ? "text" : type}
          value={value}
          defaultValue={defaultValue}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          readOnly={readOnly}
          required={required}
          autoComplete={autoComplete}
          aria-invalid={Boolean(error) || undefined}
          aria-describedby={describedById}
          className={[
            "block w-full bg-transparent placeholder:text-white/50",
            "outline-none",
            size === "sm" ? "h-10 text-sm" : "h-12 text-base",
            // dynamic paddings with icon awareness
            leadingIcon ? "pl-11" : "pl-4",
            canToggle || trailingIcon ? "pr-12" : "pr-4",
          ].join(" ")}
          {...rest}
        />

        {/* Trailing icon (custom) */}
        {trailingIcon && !isPassword && (
          <span className="pointer-events-none absolute right-3 text-white/60">
            <span className="inline-flex h-5 w-5 items-center justify-center">
              {trailingIcon}
            </span>
          </span>
        )}

        {/* Password toggle (eye) */}
        {isPassword && canToggle && (
          <button
            type="button"
            aria-label={show ? "Hide password" : "Show password"}
            aria-pressed={show}
            onClick={() => setShow((s) => !s)}
            className={[
              "absolute right-2 inline-flex items-center justify-center",
              "rounded-md p-2 text-white/70 hover:text-white hover:bg-white/10",
              "focus:outline-none focus:ring-2 focus:ring-white/30",
            ].join(" ")}
            tabIndex={disabled ? -1 : 0}
          >
            {show ? (
              <EyeSlashIcon className="h-5 w-5" />
            ) : (
              <EyeIcon className="h-5 w-5" />
            )}
          </button>
        )}
      </div>

      {/* Hint / error */}
      {(hint || error) && (
        <div
          id={describedById}
          className={`mt-1.5 text-xs ${
            error ? "text-rose-400" : "text-white/60"
          }`}
        >
          {typeof error === "string" ? error : hint}
        </div>
      )}
    </div>
  );
});

export default InputField;
