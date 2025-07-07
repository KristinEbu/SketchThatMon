import React from "react";

export function sanitizeNumberInput(
  e: React.ChangeEvent<HTMLInputElement>,
): number {
  let val = e.target.value.replace(/[^0-9]/g, "");

  if (val.length > 2) {
    val = val.slice(0, 2);
  }

  const num = parseInt(val, 10);

  if (isNaN(num)) {
    return 0;
  }

  return num;
}
