import React from "react";
import Button from "@/components/ui/button";

type PopupProps = {
  open: boolean;
  onClose: () => void;
  label: string;
  description?: string;
  buttonLabelLeft: string;
  onClickLeft: () => void;
  buttonLabelRight: string;
  onClickRight: () => void;
};

export default function Popup({
  open,
  onClose,
  label,
  description,
  buttonLabelLeft,
  onClickLeft,
  buttonLabelRight,
  onClickRight,
}: PopupProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[rgba(0,0,0,0.9)] z-50">
      <div className="bg-zinc-900 rounded-lg border-1 border-white p-6 mb-35 max-w-md w-full">
        <button
          onClick={onClose}
          className="absolute text-5xl top-2 right-5 text-white hover:text-gray-700"
        >
          &times;
        </button>
        <div className="p-4 py-8 gap-4 flex flex-col">
          <h2 className="text-lg font-bold text-center">{label}</h2>
          <p>{description}</p>
          <hr className="p-1" />
          <div className="flex justify-between">
            <Button color="secondary" size="small" onClick={onClickLeft}>
              {buttonLabelLeft}
            </Button>
            <Button color="primary" size="small" onClick={onClickRight}>
              {buttonLabelRight}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
