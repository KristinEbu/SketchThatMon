import React from "react";

type ButtonColor = "primary" | "secondary" | "tertiary";
type ButtonSize = "small" | "normal" | "large";

const styleMap: Record<ButtonColor, string> = {
  primary: "bg-red-700 hover:bg-red-900 text-white",
  secondary: "bg-yellow-400 hover:bg-yellow-500 text-zinc-900",
  tertiary: "bg-blue-600 hover:bg-blue-800 text-white",
};

const sizeMap: Record<ButtonSize, string> = {
  small: "py-1.5 px-4",
  normal: "py-4 px-4",
  large: "py-8 px-20 text-4xl",
};

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  color?: ButtonColor;
  size?: ButtonSize;
  disabled?: boolean;
  className?: string;
}

export default function Button({
  color = "primary",
  size = "normal",
  disabled = false,
  className = "",
  children,
  ...props
}: ButtonProps) {
  const style = styleMap[color];
  const sizeStyle = sizeMap[size];

  return (
    <button
      disabled={disabled}
      className={`${style} ${sizeStyle} font-bold rounded-xl ${disabled ? "opacity-50 cursor-not-allowed" : ""} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
