import React from "react";
import {
  PaintBrushIcon,
  EyeDropperIcon,
  ArrowUturnLeftIcon,
  ArrowUturnRightIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";

const iconStyling = "w-8 h-8 hover:text-gray-400";

interface ColorIconProps {
  color?: string;
  className?: string;
}

const ColorIcon = ({ color = "black", className }: ColorIconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill={color}
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    stroke="white"
    className={`size-9 hover:stroke-gray-400 ${className}`}
    aria-hidden="true"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
    />
  </svg>
);

const EraserIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    fill="white"
    viewBox="0 0 256 256"
    className={`hover:fill-gray-400 ${className}`}
    aria-hidden="true"
  >
    <path d="M225,80.4L183.6,39a24,24,0,0,0-33.94,0L31,157.66a24,24,0,0,0,0,33.94l30.06,30.06A8,8,0,0,0,66.74,224H216a8,8,0,0,0,0-16h-84.7L225,114.34A24,24,0,0,0,225,80.4ZM108.68,208H70.05L42.33,180.28a8,8,0,0,1,0-11.31L96,115.31,148.69,168Zm105-105L160,156.69,107.31,104,161,50.34a8,8,0,0,1,11.32,0l41.38,41.38a8,8,0,0,1,0,11.31Z" />
  </svg>
);

type CanvasOptionsProps = {
  color?: string;
};

export default function CanvasOptions({ color }: CanvasOptionsProps) {
  return (
    <div className="flex flex-col items-center gap-3">
      <button aria-label="Color preview" type="button">
        <ColorIcon color={color} />
      </button>

      <button aria-label="Paintbrush tool" type="button">
        <PaintBrushIcon className={iconStyling} />
      </button>

      <button aria-label="Eraser tool" type="button">
        <EraserIcon />
      </button>

      <button aria-label="Eyedropper tool" type="button">
        <EyeDropperIcon className={iconStyling} />
      </button>

      <button aria-label="Undo" type="button">
        <ArrowUturnLeftIcon className={iconStyling} />
      </button>

      <button aria-label="Redo" type="button">
        <ArrowUturnRightIcon className={iconStyling} />
      </button>

      <button aria-label="Clear canvas" type="button">
        <TrashIcon className={iconStyling} />
      </button>
    </div>
  );
}
