import React from "react";
import Dropdown from "./dropdown";

type DropdownGroupProps = {
  optionsList: string[][];
  values: string[];
  onChanges: ((value: string) => void)[];
  disabled?: boolean;
};

export default function DropdownGroup({
  optionsList,
  values,
  onChanges,
  disabled = false,
}: DropdownGroupProps) {
  return (
    <div className="flex gap-4">
      {optionsList.map((options, i) => (
        <Dropdown
          key={i}
          options={options}
          value={values[i]}
          onChange={onChanges[i]}
          disabled={disabled}
        />
      ))}
    </div>
  );
}
