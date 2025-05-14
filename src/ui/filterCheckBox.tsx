"use client";

import React from "react";
import Styles from "../sass/SassComp/FilterCheckBox.module.scss";

export interface CheckBoxFilterProps {
  text: string;
  value: string | number;
  endAdornment?: React.ReactNode;
  onCheckedChange?: (checked: boolean) => void;
  checked?: boolean;
}

export const FilterCheckBox: React.FC<CheckBoxFilterProps> = ({
  text,
  value,
  endAdornment,
  checked,
  onCheckedChange,
}) => {
  return (
    <div className={Styles.container}>
      <input
        type="checkbox"
        id={`checkbox-${value}`}
        checked={checked}
        className={Styles.checkbox}
        onChange={(e) => onCheckedChange?.(e.target.checked)}
      />
      <label htmlFor={`checkbox-${value}`} className={Styles.label}>
        <span className={Styles.text}>{text}</span>
        {endAdornment}
      </label>
    </div>
  );
};
