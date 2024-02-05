import { TextField } from "@mui/material";
import React from "react";
import { Controller } from "react-hook-form";

export default function TextInput({
  id,
  label,
  control,
  rules,
  errors,
  placeholder = "",
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
          id={id}
          label={label}
          placeholder={placeholder}
          variant="outlined"
          fullWidth
          error={Boolean(errors[id])}
          helperText={errors[id]?.message}
          disabled={isDisabled}
        />
      )}
    />
  );
}
