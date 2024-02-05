import { InputAdornment, TextField } from "@mui/material";
import React from "react";
import { Controller } from "react-hook-form";
import { NumericFormat } from "react-number-format";

export default function NumericInput({
  id,
  label,
  control,
  errors,
  thousandSeparator = false,
  rules = null,
  isDisabled = false,
  inputAdormentPosition = "",
  inputAdormentText = "",
}) {
  let startAdornment = null;
  let endAdornment = null;
  if (inputAdormentPosition === "start") {
    startAdornment = (
      <InputAdornment position="start">{inputAdormentText}</InputAdornment>
    );
  } else if (inputAdormentPosition === "end") {
    endAdornment = (
      <InputAdornment position="end">{inputAdormentText}</InputAdornment>
    );
  }
  return (
    <Controller
      name={id}
      control={control}
      rules={rules}
      render={({ field }) => (
        <NumericFormat
          {...field}
          thousandSeparator={thousandSeparator}
          customInput={TextField}
          id={id}
          label={label}
          fullWidth
          error={Boolean(errors[id])}
          helperText={errors[id]?.message}
          disabled={isDisabled}
          InputProps={{
            startAdornment: startAdornment,
            endAdornment: endAdornment,
          }}
        />
      )}
    />
  );
}
