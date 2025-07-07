"use client";
import React, { useState } from "react";
import {
  HomeIcon,
  MusicalNoteIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/outline";

const iconStyling = "w-12 h-12 hover:text-gray-400";

const MusicOffIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className={className}
  >
    {/* Original music icon */}
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m9 9 10.5-3m0 6.553v3.75a2.25 2.25 0 0 1-1.632 2.163l-1.32.377a1.803 1.803 0 1 1-.99-3.467l2.31-.66a2.25 2.25 0 0 0 1.632-2.163Zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 0 1-1.632 2.163l-1.32.377a1.803 1.803 0 0 1-.99-3.467l2.31-.66A2.25 2.25 0 0 0 9 15.553Z"
    />
    {/* Strikethrough diagonal line */}
    <line
      x1="-2"
      y1="26"
      x2="26"
      y2="-2"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
    />
  </svg>
);

export default function Header() {
  const [musicOn, setMusicOn] = useState(true);

  return (
    <header className="w-full flex items-center justify-between px-8 pt-8">
      {/* Left Side */}
      <div>
        <button aria-label="Home">
          <HomeIcon className={iconStyling} />
        </button>
      </div>
      {/* Right Side */}
      <div className="flex items-center">
        <button
          aria-label="Toggle Music"
          onClick={() => setMusicOn((musicOn) => !musicOn)}
        >
          {musicOn ? (
            <MusicalNoteIcon className={iconStyling} />
          ) : (
            <MusicOffIcon className={iconStyling} />
          )}
        </button>
        <div className="w-8" />
        <button aria-label="Settings">
          <Cog6ToothIcon className={iconStyling} />
        </button>
      </div>
    </header>
  );
}
