import React from "react";

type ButtonColor = "primary" | "secondary" | "tertiary";
type ButtonSize = "small" | "normal" | "large";

const styleMap: Record<ButtonColor, string> = {
  primary: "bg-red-700 hover:bg-red-900 text-white",
  secondary: "bg-yellow-400 hover:bg-yellow-500 text-zinc-900",
  tertiary: "bg-blue-600 hover:bg-blue-800 text-white",
};

const sizeMap: Record<ButtonSize, string> = {
  small: "py-4 px-4",
  normal: "py-6 px-12 text-3xl",
  large: "py-8 px-20 text-4xl",
};

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  color?: ButtonColor;
  size?: ButtonSize;
  className?: string;
}

export default function Button({
  color = "primary",
  size = "normal",
  className = "",
  children,
  ...props
}: ButtonProps) {
  const style = styleMap[color];
  const sizeStyle = sizeMap[size];

  return (
    <button
      className={`${style} ${sizeStyle} font-bold rounded-xl ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}