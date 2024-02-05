import { Checkbox, FormControlLabel } from "@mui/material";
import React from "react";
import { Controller } from "react-hook-form";

export default function CheckBoxInput({
  id,
  label,
  control,
  isDisabled = false,
}) {
  return (
    <Controller
      name={id}
      control={control}
      render={({ field }) => (
        <FormControlLabel
          {...field}
          id={id}
          label={label}
          control={<Checkbox />}
          disabled={isDisabled}
        />
      )}
    />
  );
}
