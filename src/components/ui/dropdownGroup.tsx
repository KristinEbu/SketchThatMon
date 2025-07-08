import React from "react";
import Dropdown from "./dropdown";

type DropdownGroupProps = {
  labels: string[];
  optionsList: string[][];
  values: string[][];
  onChanges: ((value: string[]) => void)[];
  disabled?: boolean;
};

export default function DropdownGroup({
  labels,
  optionsList,
  values,
  onChanges,
  disabled = false,
}: DropdownGroupProps) {
  return (
    <div className="flex flex-wrap gap-4">
      {optionsList.map((options, i) => (
        <Dropdown
          label={labels[i]}
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
