import React from "react";

type PopupProps = {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

export default function Popup({ open, onClose, children }: PopupProps) {
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
        {children}
      </div>
    </div>
  );
}
