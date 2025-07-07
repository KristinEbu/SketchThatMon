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

  dropdownValues?: string[];
  dropdownOptionsList?: string[][];
  dropdownOnChanges?: ((value: string) => void)[];

  disabled?: boolean;
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

  dropdownValues = [],
  dropdownOptionsList = [],
  dropdownOnChanges = [],

  disabled = false,
}: GameOptionProps) {
  const handleSlider = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSliderChange?.(Number(e.target.value));
  };

  const sanitizeNumberInput = (
    e: React.ChangeEvent<HTMLInputElement>,
  ): number => {
    const val = e.target.value.replace(/[^0-9]/g, "");
    let num = parseInt(val, 10);

    if (isNaN(num)) {
      num = 0;
    }

    if (num > 100) {
      num = 100;
    } else if (num < 0) {
      num = 0;
    }

    return num;
  };

  return (
    <div className="flex flex-col gap-2">
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
      {description && <p className="text-gray-400">{description}</p>}
      <div className="flex items-center gap-4">
        {inputValue !== undefined && onInputChange && (
          <TextInput
            type="number"
            value={inputValue}
            onChange={(e) => onInputChange?.(sanitizeNumberInput(e))}
            disabled={disabled || !switchValue}
          />
        )}
        {sliderValue !== undefined && onSliderChange && (
          <Slider
            value={sliderValue}
            onChange={handleSlider}
            min={0}
            max={100}
            step={1}
            disabled={disabled || !switchValue}
          />
        )}
      </div>
      {dropdownValues.length > 0 &&
        dropdownOptionsList.length > 0 &&
        dropdownOnChanges.length > 0 && (
          <DropdownGroup
            optionsList={dropdownOptionsList}
            values={dropdownValues}
            onChanges={dropdownOnChanges}
            disabled={disabled || !switchValue}
          />
        )}
    </div>
  );
}
