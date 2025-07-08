import React from "react";

interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  className?: string;
  disabled?: boolean;
}

export default function Switch({
  checked,
  onChange,
  className = "",
  disabled,
}: SwitchProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      disabled={disabled}
      className={`relative inline-flex items-center flex-shrink-0 overflow-hidden border-2 h-7 w-12 rounded-full transition-colors focus:ring-2 focus:ring-blue-500
        ${checked ? "border-yellow-400 bg-yellow-100" : "bg-gray-300"} ${className}
        ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
    >
      <span
        className={`inline-block w-5 h-5 transform rounded-full transition-transform
          ${checked ? "translate-x-5 bg-yellow-400" : "translate-x-1 bg-white"}`}
      />
    </button>
  );
}
