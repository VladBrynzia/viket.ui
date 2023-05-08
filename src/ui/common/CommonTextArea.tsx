import { useRef, useState, ComponentPropsWithRef, useMemo } from "react";
import { FieldInputProps } from "formik";
import { styled } from "../../../stitches.config";
import React from "react";

type OwnProps = {
  label?: string;
  field?: FieldInputProps<"Value">;
  value?: string;
  minWidth?: string | number;
  minHeight?: string | number;
  maxWidth?: string | number;
  maxHeight?: string | number;
  error?: string;
};

type Props = OwnProps & ComponentPropsWithRef<"textarea">;

export const CommonTextArea: React.FC<Props> = ({
  value: customValue,
  field,
  error = "",
  maxHeight,
  maxWidth,
  readOnly,
  minHeight = 20,
  minWidth = 200,
  ...rest
}) => {
  const { onChange, value: defaultValue } = { ...{ ...field } };
  const { onChange: manualOnChange } = {
    ...rest,
  };
  const value = customValue !== undefined ? customValue : defaultValue || "";
  const [inputValue, setInputValue] = useState<string>(value);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useMemo(() => {
    setInputValue(value);
  }, [value]);

  return (
    <Wrapper>
      <InputContainer>
        <StyledInput
          {...rest}
          {...field}
          css={{
            minWidth,
            minHeight,
            maxWidth,
            maxHeight,
          }}
          disabled={readOnly}
          ref={inputRef}
          value={inputValue}
          onChange={(event) => {
            onChange && onChange(event);
            manualOnChange && manualOnChange(event);
          }}
        />
      </InputContainer>
    </Wrapper>
  );
};

const Wrapper = styled("div", {
  display: "flex",
  flexDirection: "column",
  background: "$white",
  border: "1px solid #F6D9FF",
  borderRadius: "10px",
  width: "100%",
});

const InputContainer = styled("div", {
  background: "$backgroundDarkDarkest",
  display: "flex",
  padding: "20px 30px",
  border: "1px solid $borderGrey",
  borderRadius: "10px",
  minWidth: "250px",
});

const StyledInput = styled("textarea", {
  borderWidth: "0px",
  width: "100%",
  height: "200px",
  minWidth: "200px",
  maxWidth: "1400px",
  minHeight: "100px",
  maxHeight: "300px",
  color: "$black",
  resize: "none",
  background: "$backgroundDarkDarkest",
  marginTop: "2px",
  fontSize: 13,
  "@sm": {
    width: "100%",
  },
});
