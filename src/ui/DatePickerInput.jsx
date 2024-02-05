import { Message } from "@mui/icons-material";
import { TextField } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import React from "react";
import { Controller } from "react-hook-form";

export default function DatePickerInput({
  id,
  label,
  control,
  rules,
  errors,
  isReadOnly = false,
  maxDate,
  minDate,
}) {
  return (
    <Controller
      name={id}
      control={control}
      rules={rules}
      render={({ field }) => (
        <LocalizationProvider dateAdapter={AdapterDateFns} fullWidth>
          <DatePicker
            fullWidth
            {...field}
            id={id}
            label={label}
            className={"error"}
            maxDate={maxDate}
            minDate={minDate}
            readOnly={isReadOnly}
            slotProps={{
              textField: {
                helperText: errors[id]?.message,
                error: Boolean(errors[id]),
                fullWidth: true,
              },
            }}
          />
        </LocalizationProvider>
      )}
    />
  );
}
