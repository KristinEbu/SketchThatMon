import React from "react";
import Switch from "../ui/switch";
import TextInput from "../ui/textInput";
import Slider from "../ui/slider";
import DropdownGroup from "../ui/dropdownGroup";

type GameOptionProps = {
  label: string;
  description?: string;

  switchValue?: boolean;
  onToggle?: (value: boolean) => void;

  inputValue?: number;
  onInputChange?: (value: number) => void;

  sliderValue?: number;
  onSliderChange?: (value: number) => void;

  dropdownLabels?: string[];
  dropdownValues?: string[][];
  dropdownOptionsList?: string[][];
  dropdownOnChanges?: ((value: string[]) => void)[];

  disabled?: boolean;
  min?: number;
  max?: number;
  className?: string;
};

export default function GameOption({
  label,
  description,

  switchValue = true,
  onToggle,

  inputValue,
  onInputChange,

  sliderValue,
  onSliderChange,

  dropdownLabels = [],
  dropdownValues = [],
  dropdownOptionsList = [],
  dropdownOnChanges = [],

  disabled = false,
  min = 1,
  max = 100,
  className,
}: GameOptionProps) {
  const handleSlider = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSliderChange?.(Number(e.target.value));
  };

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <div className="flex gap-4">
        <p className="font-title font-bold text-2xl">{label}</p>
        {onToggle && (
          <Switch
            checked={switchValue}
            onChange={onToggle}
            disabled={disabled}
          />
        )}
      </div>
      {description && <p className="text-lg text-gray-400">{description}</p>}
      <div className="flex items-center gap-4">
        {inputValue !== undefined && onInputChange && (
          <TextInput
            type="number"
            value={inputValue}
            onChange={(e) => {
              const cleaned = e.target.value.replace(/[^0-9]/g, "");
              const num = parseInt(cleaned, 10);
              onInputChange?.(isNaN(num) ? 0 : num);
            }}
            onBlur={(e) => {
              const parsed = parseInt(e.target.value, 10);
              if (isNaN(parsed) || parsed < min) {
                onInputChange?.(min);
              }
              if (parsed > max) {
                onInputChange?.(max);
              }
            }}
            disabled={disabled || !switchValue}
          />
        )}
        {sliderValue !== undefined && onSliderChange && (
          <Slider
            value={sliderValue}
            onChange={handleSlider}
            min={min}
            max={max}
            step={1}
            disabled={disabled || !switchValue}
          />
        )}
      </div>
      {dropdownValues.length > 0 &&
        dropdownOptionsList.length > 0 &&
        dropdownOnChanges.length > 0 && (
          <DropdownGroup
            labels={dropdownLabels}
            optionsList={dropdownOptionsList}
            values={dropdownValues}
            onChanges={dropdownOnChanges}
            disabled={disabled || !switchValue}
          />
        )}
    </div>
  );
}
