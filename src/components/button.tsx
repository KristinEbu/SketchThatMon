import React from "react";

type ButtonColor = "primary" | "secondary" | "tertiary";

const styleMap: Record<ButtonColor, string> = {
  primary: "bg-red-700 hover:bg-red-900 text-white",
  secondary: "bg-yellow-400 hover:bg-yellow-500 text-zinc-900",
  tertiary: "bg-blue-600 hover:bg-blue-800 text-white",
};

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  color?: ButtonColor;
}

export default function Button({
  color = "primary",
  className = "",
  children,
  ...props
}: ButtonProps) {
  const style = styleMap[color];

  return (
    <button
      className={`${style} font-bold py-2 px-4 rounded ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
