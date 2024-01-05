"use client";

import Select from "react-select";

export interface DropdownProps {
  options: any;
  defaultValue: any;
  onChange: any;
}

export interface ListProps {
  index: number;
  name: string;
  href?: any;
}

const WavyDropdown = ({ options, defaultValue, onChange }: DropdownProps) => {
  return (
    <Select
      theme={(theme) => ({
        ...theme,
        borderRadius: 0,
        borderWidth: 0,
        colors: {
          ...theme.colors,
          primary25: "none",
          primary: "#ff5b00",
        },
      })}
      isSearchable={false}
      styles={{
        container: (baseStyles, state) => ({
          ...baseStyles,
          borderWidth: 0,
          backgroundColor: "#f7f7f7",
          ":focus": {
            borderWidth: 2,
          },
        }),
        control: (baseStyles) => ({
          ...baseStyles,
          borderRadius: 0,
          borderWidth: 0,
          border: "none",
          borderColor: "none",
          backgroundColor: "#f7f7f7",
        }),
        indicatorSeparator: () => ({ display: "hidden" }),
        menu: (baseStyles) => ({
          ...baseStyles,
          backgroundColor: "#f7f7f7",
          borderRadius: 0,
          // marginTop: 0,
          marginTop: 1,
        }),
        menuList: (baseStyles) => ({
          ...baseStyles,
          ":hover": {
            backgroundColor: "#f7f7f7",
          },
        }),
        valueContainer: (baseStyles) => ({
          ...baseStyles,
          backgroundColor: "#f7f7f7",
          fontSize: "14px",
        }),
        indicatorsContainer: (baseStyles) => ({
          ...baseStyles,
          backgroundColor: "#f7f7f7",
        }),
        option: (baseStyles) => ({
          ...baseStyles,
          fontSize: "14px",
          ":hover": {
            backgroundColor: "#b2b2b2",
            color: "white",
          },
        }),
      }}
      options={options}
      defaultValue={defaultValue}
      onChange={onChange}
    />
  );
};

export default WavyDropdown;
