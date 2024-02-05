import React from "react";
import TextInput from "../ui/TextInput";
import { Grid } from "@mui/material";
import SelectInput from "../ui/SelectInput";
import CardComponent from "../ui/CardComponent";
import { genderOptions } from "../utils/Constant";
import { useForm } from "react-hook-form";
import FormatInput from "../ui/FormatInput";
import { sub } from "date-fns";
import DatePickerInput from "../ui/DatePickerInput";
import useCreateUser from "../hooks/useCreateUser";
export default function FormCreateClient() {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      DNI: "",
      fullname: "",
      birthday: null,
      gender: "",
      email: "",
      phone: "",
      location: "",
    },
  });
  const today = new Date();
  const minDate = sub(today, { years: 120 });
  const maxDate = sub(today, { years: 18 });
  const { createUser, isLoadingUser } = useCreateUser();
  function onSubmit(data, e) {
    e.preventDefault();
    createUser(data);
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <CardComponent title={"Crear cliente"} isSaveButtonDisabled>
        <Grid container ml={1} spacing={1} rowSpacing={2} mt={1}>
          <Grid item xs={6}>
            <FormatInput
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
              format="###-#######-#"
              id={"DNI"}
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
              id={"fullname"}
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
      </CardComponent>
    </form>
  );
}

/*private Integer DNI;
private String fullName;
private Date birthday;
private String gender;
private String location;
private String ocupation;
private String email;
private String phone;
*/
