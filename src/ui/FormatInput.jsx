import { Search } from "@mui/icons-material";
import { IconButton, TextField } from "@mui/material";
import React from "react";
import { Controller } from "react-hook-form";
import { PatternFormat } from "react-number-format";

export default function FormatInput({
  id,
  label,
  control,
  errors,
  rules = null,
  isDisabled = false,
  format,
  addButtonToEnd = false,
}) {
  let endAdorment = null;
  if (addButtonToEnd) {
    endAdorment = (
      <IconButton type="submit">
        <Search />
      </IconButton>
    );
  }
  return (
    <Controller
      name={id}
      control={control}
      rules={rules}
      render={({ field }) => (
        <PatternFormat
          {...field}
          format={format}
          allowEmptyFormatting
          mask="_"
          customInput={TextField}
          label={label}
          id={id}
          error={Boolean(errors[id])}
          helperText={errors[id]?.message}
          disabled={isDisabled}
          fullWidth
          InputProps={{
            endAdornment: endAdorment,
          }}
        />
      )}
    />
  );
}
