import { Search } from "@mui/icons-material";
import {
  Divider,
  Grid,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { PatternFormat } from "react-number-format";
import TextInput from "../ui/TextInput";
import { useForm } from "react-hook-form";
import FormatInput from "../ui/FormatInput";

export default function FormSearchClientByDNI({
  onSubmit,
  fullName,
  defaultClient,
}) {
  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm({ defaultValues: defaultClient });
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid item container xs={12} spacing={2} rowSpacing={2} mt={1}>
        <Grid item xs={12}>
          <Divider textAlign="center">
            <Typography variant="h6">Datos del cliente</Typography>
          </Divider>
        </Grid>
        <Grid item xs={6}>
          <FormatInput
            format="###-#######-#"
            addButtonToEnd={true}
            label={"Cedula"}
            id={"dni"}
            control={control}
            rules={{
              required: {
                value: true,
                message: "Cedula is required",
              },
              validate: (value) =>
                !value.includes("_") || "Cedula es requerido.",
            }}
            errors={errors}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            id={"fullname"}
            label={"Nombre completo"}
            value={fullName}
            fullWidth
            disabled={true}
          />
        </Grid>
      </Grid>
    </form>
  );
}
