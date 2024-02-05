import { MenuItem, TextField } from "@mui/material";
import React from "react";
import { Controller } from "react-hook-form";

export default function SelectInput({
  options,
  id,
  label,
  control,
  rules,
  errors,
  isDisabled = false,
}) {
  return (
    <Controller
      name={id}
      control={control}
      rules={rules}
      render={({ field }) => (
        <TextField
          {...field}
          select
          label={label}
          fullWidth
          error={Boolean(errors[id])}
          helperText={errors[id]?.message}
          disabled={isDisabled}
        >
          <MenuItem value="" disabled>
            Seleccionar
          </MenuItem>
          {options.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      )}
    />
  );
}
