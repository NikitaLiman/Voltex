"use client";

import React from "react";
import { CheckBoxFilterProps, FilterCheckBox } from "../ui/filterCheckBox";
import Styles from "../sass/SassComp/CFG.module.scss";

type item = CheckBoxFilterProps;

interface Props {
  title: string;
  items: item[];
  defaultItems: item[];
  limit: number;
  searchinputBox?: string;
  selectedIds?: Set<string>;
  onChangeBox?: (id: string) => void;
  defaultValue?: string[];
}

export const CheckboxFilterGroup: React.FC<Props> = ({
  title,
  items,
  defaultItems,
  limit,
  searchinputBox = "Search..",
  selectedIds,
  onChangeBox,
}) => {
  const [showAll, setShowAll] = React.useState<boolean>(false);
  const [value, setValue] = React.useState<string>("");

  const list = showAll
    ? items.filter((item) => item.text.includes(value.toLocaleLowerCase()))
    : defaultItems?.slice(0, limit);

  const SearchInput = (value: string) => {
    setValue(value);
  };

  return (
    <div className={Styles.container}>
      <h1>{title}</h1>
      {showAll && (
        <div className={Styles.container__search}>
          <input
            placeholder={searchinputBox}
            onChange={(e) => SearchInput(e.target.value)}
          />
        </div>
      )}
      <div className={Styles.container__content}>
        <div className={Styles.List}>
          {list.map((item, index) => (
            <FilterCheckBox
              key={index}
              text={item.text}
              value={item.value}
              endAdornment={item.endAdornment}
              checked={selectedIds?.has(String(item.value))}
              onCheckedChange={() => onChangeBox?.(String(item.value))}
            />
          ))}{" "}
        </div>
        {items.length > limit && (
          <div>
            <p onClick={() => setShowAll(!showAll)}>
              {showAll ? "Less.." : "+ Show All"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
