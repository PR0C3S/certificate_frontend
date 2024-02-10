import { Divider, Grid, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import FormatInput from "../ui/FormatInput";
import { getByDniAPI } from "../server/ClientApi";

export default function FormSearchClientByDNI({
  onSubmitClient,
  defaultClient,
}) {
  const {
    handleSubmit,
    control,
    setError,
    formState: { errors },
  } = useForm({ defaultValues: defaultClient });

  const [fullName, setFullName] = useState("");
  async function onSubmit(data, e) {
    e.preventDefault();
    const client = await getByDniAPI(data.dni);
    if (client === null || client === "") {
      setError("dni", {
        type: "manual",
        message: "No existe esta cedula",
      });
      onSubmitClient("");
      if (fullName !== "") setFullName("");
    } else {
      onSubmitClient(client.id);
      setFullName(client.fullName);
    }
  }
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
                message: "Cedula es requerido.",
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
