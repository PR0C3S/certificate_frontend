import React, { useState } from "react";
import TextInput from "../ui/TextInput";
import { Grid } from "@mui/material";
import SelectInput from "../ui/SelectInput";
import { genderOptions } from "../utils/Constant";
import { useForm } from "react-hook-form";
import FormatInput from "../ui/FormatInput";
import { sub } from "date-fns";
import DatePickerInput from "../ui/DatePickerInput";
import { getByDniAPI } from "../server/ClientApi";
import { axiosClient } from "../utils/Axios";
export default function FormCreateClient({ onSubmit, defaultClient, idForm }) {
  const {
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: defaultClient,
  });
  const today = new Date();
  const minDate = sub(today, { years: 120 });
  const maxDate = sub(today, { years: 18 });

  return (
    <form onSubmit={handleSubmit(onSubmit)} id={idForm}>
      <Grid item container xs={12} spacing={2} rowSpacing={2} mt={1}>
        <Grid item xs={6}>
          <FormatInput
            control={control}
            rules={{
              required: {
                value: true,
                message: "Cedula es requerido.",
              },
              validate: {
                notEmpy: (value) =>
                  !value.includes("_") || "Cedula es requerido.",
                dniAvailable: async (value) => {
                  const data = await getByDniAPI(value);
                  if (data === null || data === "") {
                    return true;
                  } else {
                    return "Cedula en uso.";
                  }
                },
              },
            }}
            errors={errors}
            format="###-#######-#"
            id={"dni"}
            label={"Cedula"}
          />
        </Grid>
        <Grid item xs={6}>
          <TextInput
            control={control}
            rules={{
              required: {
                value: true,
                message: "Nombre es requerido.",
              },
            }}
            errors={errors}
            id={"fullName"}
            label={"Nombre"}
          />
        </Grid>
        <Grid item xs={6}>
          <DatePickerInput
            control={control}
            rules={{
              required: {
                value: true,
                message: "Fecha de nacimiento es requerido.",
              },
            }}
            errors={errors}
            id="birthday"
            label={"Fecha de nacimiento"}
            maxDate={maxDate}
            minDate={minDate}
          />
        </Grid>
        <Grid item xs={6}>
          <SelectInput
            control={control}
            rules={{
              required: {
                value: true,
                message: "Genero es requerido.",
              },
            }}
            errors={errors}
            id={"gender"}
            label={"Genero"}
            options={genderOptions}
          />
        </Grid>
        <Grid item xs={6}>
          <TextInput
            control={control}
            rules={{
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Correo no matchea con el formato de correo",
              },
              required: {
                value: true,
                message: "Correo es requerido.",
              },
            }}
            errors={errors}
            id={"email"}
            label={"Correo"}
            placeholder={"example@example.com"}
          />
        </Grid>
        <Grid item xs={6}>
          <FormatInput
            control={control}
            rules={{
              required: {
                value: true,
                message: "Telefono es requerido.",
              },
              validate: (value) =>
                !value.includes("_") || "Telefono es requerido.",
            }}
            errors={errors}
            id={"phone"}
            format="(###) ###-####"
            label={"Telefono"}
          />
        </Grid>
        <Grid item xs={12}>
          <TextInput
            control={control}
            rules={{
              required: {
                value: true,
                message: "Ubicacion es requerido.",
              },
            }}
            errors={errors}
            id={"location"}
            label={"Ubicacion"}
            placeholder={"Sector, Provincia"}
          />
        </Grid>
      </Grid>
    </form>
  );
}
