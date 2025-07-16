import React from "react";

interface SliderProps extends React.InputHTMLAttributes<HTMLInputElement> {
  value: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  min?: number;
  max?: number;
  step?: number;
  className?: string;
  disabled?: boolean;
}

export default function Slider({
  value,
  onChange,
  min = 0,
  max = 99,
  step = 1,
  className = "",
  disabled,
  ...props
}: SliderProps) {
  return (
    <input
      type="range"
      value={value}
      onChange={onChange}
      min={min}
      max={max}
      step={step}
      className={`w-full accent-yellow-300 ${className}`}
      disabled={disabled}
      {...props}
    />
  );
}
