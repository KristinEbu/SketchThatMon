import React, { useState, useRef, useEffect } from "react";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/24/solid";

interface DropdownProps {
  label: string;
  options: string[];
  value: string[];
  onChange: (selected: string[]) => void;
  className?: string;
  disabled?: boolean;
}

export default function Dropdown({
  label,
  options,
  value,
  onChange,
  className,
  disabled = false,
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const allSelected =
    options.length > 0 && options.every((option) => value.includes(option));

  const toggleOption = (option: string) => {
    if (option === "Select All") {
      if (allSelected) {
        onChange([]); // deselect all
      } else {
        onChange([...options]); // select all
      }
    } else {
      if (value.includes(option)) {
        onChange(value.filter((v) => v !== option));
      } else {
        onChange([...value, option]);
      }
    }
  };

  return (
    <div
      className={`relative inline-block text-left w-55 ${className}`}
      ref={containerRef}
    >
      <button
        type="button"
        className={`inline-flex justify-between items-center w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-black hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
          disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"
        }`}
        onClick={() => !disabled && setIsOpen(!isOpen)}
        aria-haspopup="true"
        aria-expanded={isOpen}
        disabled={disabled}
      >
        <span className="truncate">{label}</span>
        <ChevronDownIcon
          className="ml-2 h-5 w-5 text-gray-400"
          aria-hidden="true"
        />
      </button>

      {isOpen && (
        <div
          className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
          role="listbox"
        >
          <div
            key="select_all"
            className={`cursor-pointer select-none relative py-2 pl-10 pr-4 hover:bg-blue-100 ${
              allSelected ? "bg-blue-100" : ""
            }`}
            role="option"
            aria-selected={allSelected}
            onClick={() => toggleOption("Select All")}
          >
            <span
              className={`block truncate text-black ${allSelected ? "font-semibold" : "font-normal"}`}
            >
              Select All
            </span>
            {allSelected && (
              <CheckIcon
                className="absolute left-3 top-2.5 h-5 w-5 text-blue-600"
                aria-hidden="true"
              />
            )}
          </div>

          {options.map((option) => {
            const selected = value.includes(option);
            return (
              <div
                key={option}
                className={`cursor-pointer select-none relative py-2 pl-10 pr-4 hover:bg-blue-100 ${
                  selected ? "bg-blue-100" : ""
                }`}
                role="option"
                aria-selected={selected}
                onClick={() => toggleOption(option)}
              >
                <span
                  className={`block truncate text-black ${selected ? "font-semibold" : "font-normal"}`}
                >
                  {option}
                </span>
                {selected && (
                  <CheckIcon
                    className="absolute left-3 top-2.5 h-5 w-5 text-blue-600"
                    aria-hidden="true"
                  />
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
