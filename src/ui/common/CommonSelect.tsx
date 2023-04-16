import React from "react";
import { useEffect, useState } from "react";
import Select, { CSSObjectWithLabel, StylesConfig } from "react-select";
import { styled } from "../../../stitches.config";
import { SelectOption } from "../../types/SelectOption";

type Props = {
  options: SelectOption[];
  styles?: StylesConfig<SelectOption, false>;
  onSelect: (value: string) => void;
  defaultValue?: SelectOption;
  disabled?: boolean;
  name?: string;
  placeholder?: string;
  type?: string;
};

export const CommonSelect: React.FC<Props> = ({
  options,
  styles,
  defaultValue,
  onSelect,
  disabled,
  type,
  ...rest
}) => {
  const [option, setOption] = useState(defaultValue?.value || "");

  useEffect(() => {
    onSelect(option);
  }, [option]);

  const defaultSelectStyles = {
    ...commonSelectStyles,
    ...commonSelectContainerStyles,
  };

  const filterSelectStyles = {
    ...commonSelectStyles,
  };

  const selectStyles = styles || defaultSelectStyles;

  const actualStylesByType =
    type !== "filter" ? selectStyles : filterSelectStyles;

  return (
    <Container>
      <Select
        styles={actualStylesByType}
        options={options}
        onChange={(props) => props && setOption(props.value)}
        defaultValue={defaultValue}
        isDisabled={disabled}
        {...rest}
      />
    </Container>
  );
};

const Container = styled("div", {
  display: "flex",
  flexDirection: "column",
});

const commonSelectStyles: StylesConfig<SelectOption> = {
  control: () => ({
    display: "flex",
    cursor: "pointer",
    border: "1px solid transparent",
    "& :hover": {
      color: "#cccccc",
    },
  }),
  input: (provided: CSSObjectWithLabel) => ({
    ...provided,
    color: "#cccccc",
    width: "230px",
    "@media (min-width: 1280px)": {
      width: "500px",
    }
  }),
  container: () => ({
    position: "relative",
    height: "100%",
    display: "flex",
    alignItems: "center",
    fontSize: "14px",
    lineHeight: "18px",
    fontFamily: "Montserrat,sans-serif",
    fontWeight: 400,
    backgroundColor: "#fff",
    border: "1px solid transparent",
    borderRadius: "10px",
    width: "320px",
    "@media (min-width: 1280px)": {
      width: "600px",
    }
  }),
  indicatorsContainer: () => ({
    "& :hover": {
      color: "#cccccc",
    },
  }),
  indicatorSeparator: () => ({ display: "none" }),
  valueContainer: (provided: CSSObjectWithLabel) => ({
    ...provided,
    "@media only screen and (max-width: 960px)": {
      padding: "7px",
    },
  }),
  dropdownIndicator: (
    provided: CSSObjectWithLabel,
    state: { selectProps: { menuIsOpen: boolean } }
  ) => {
    return {
      ...provided,
      transition: "all .2s ease",
      transform: state.selectProps.menuIsOpen
        ? "rotate(180deg)"
        : "rotate(270deg)",
    };
  },
  menu: () => ({
    color: "#fff",
  }),
  menuList: () => ({
    color: "#fff",
    backgroundColor: "#fff",
    position: "absolute",
    top: 45,
    left: 10,
    width: "fit-content",
    zIndex: "1000",
  }),
  option: (provided: CSSObjectWithLabel, state: { isSelected: boolean }) => {
    return {
      ...provided,
      color: state.isSelected ? "#000" : "#000",
      backgroundColor: state.isSelected ? "#fff" : "#fff",
      padding: "10px 20px",
      whiteSpace: "nowrap",
      fontSize: "14px",
      fontWeight: 400,
      border: "1px solid #F6D9FF",
      overflow: "hidden",
      textOverflow: "ellipsis",
      cursor: "pointer",
      "&:hover": {
        backgroundColor: "#FD7E08",
        color: "#fff",
      },
      "@media only screen and (max-width: 768px)": {
        fontSize: "10px",
      },
      disabled: state.isSelected ? true : false,
    };
  },
};
const commonSelectContainerStyles: StylesConfig<SelectOption> = {
  container: () => ({
    position: "relative",
    height: "100%",
    display: "flex",
    alignItems: "center",
    fontSize: "13px",
    lineHeight: "18px",
    fontFamily: "Montserrat,sans-serif",
    fontWeight: 400,
    backgroundColor: "#fff",
    border: "1px solid #F6D9FF",
    borderRadius: "10px",
    padding: "10px 20px",
    width: "320px",
    "@media (min-width: 1280px)": {
      width: "600px",
    },
  }),
};
