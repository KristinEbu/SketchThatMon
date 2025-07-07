import React from "react";

type TextInputType = "text" | "number";

const styleMap: Record<TextInputType, string> = {
  text: "text-white font-title bg-none border-none focus:outline-none",
  number:
    "text-black font-body bg-white rounded-lg text-center w-12 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500",
};

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  type: TextInputType;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  disabled?: boolean;
}

export default function TextInput({
  type,
  value,
  onChange,
  className,
  disabled,
}: TextInputProps) {
  return (
    <input
      value={value}
      onChange={onChange}
      disabled={disabled}
      className={
        styleMap[type] +
        ` ${className}
            ${disabled ? "opacity-50 cursor-not-allowed" : ""}`
      }
    />
  );
}
