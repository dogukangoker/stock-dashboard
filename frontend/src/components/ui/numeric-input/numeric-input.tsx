import React from "react";
import { TextField, TextFieldProps } from "@mui/material";

interface NumericInputProps extends Omit<TextFieldProps, "onChange"> {
  value: number | string;
  onChange: (value: number | string) => void;
  allowDecimals?: boolean;
}

const NumericInput: React.FC<NumericInputProps> = ({
  value,
  onChange,
  allowDecimals = false,
  ...rest
}) => {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;

    const regex = allowDecimals ? /^[0-9]*\.?[0-9]*$/ : /^[0-9]*$/;

    if (regex.test(inputValue)) {
      const numericValue = inputValue === "" ? 0 : parseFloat(inputValue);
      onChange(numericValue);
    }
  };

  return (
    <TextField
      {...rest}
      value={value}
      size="small"
      onChange={handleInputChange}
      InputProps={{
        inputProps: {
          inputMode: "numeric",
          pattern: "[0-9]*",
        },
      }}
    />
  );
};

export default NumericInput;
