import {
  Checkbox,
  Divider,
  FormControlLabel,
  Grid,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import { AttachMoney, Percent } from "@mui/icons-material";
import SelectInput from "../ui/SelectInput";
import { currencyOptions, durationOptions } from "../utils/Constant";
import { useForm } from "react-hook-form";
import NumericInput from "../ui/NumericInput";
import CheckBoxInput from "../ui/CheckBoxInput";
import DatePickerInput from "../ui/DatePickerInput";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { NumericFormat } from "react-number-format";
import TextInput from "../ui/TextInput";
/**
 * Validar los checkbox porque no cargan
 * Hacer que fecha de finalizacion cambie con el onchange de duracion
 * Agregar funcionalidad de buscar cliente
 * Verificar porque los inputs numericos salen como string
 */
export default function FormCreateCertificate({
  onSubmit,
  defaultCertificate,
  idForm,
  idClient,
}) {
  const {
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: defaultCertificate,
  });
  useEffect(() => {
    setValue("idClient", idClient);
  }, [idClient, setValue]);
  const endDate = new Date().setMonth(watch("duration") + 1);
  return (
    <form onSubmit={handleSubmit(onSubmit)} id={idForm}>
      <Grid item container xs={12} spacing={2} rowSpacing={2}>
        <Grid item xs={12}>
          <TextInput
            control={control}
            rules={{
              required: {
                value: true,
                message: "Id Cliente es requerido.",
              },
            }}
            value={watch("idClient")}
            errors={errors}
            id={"idClient"}
            label={"Id Cliente"}
            isDisabled={true}
          />
          <Grid item xs={12} mt={1}>
            <Divider textAlign="center">
              <Typography variant="h6">Datos del certificado</Typography>
            </Divider>
          </Grid>
        </Grid>
        <Grid item xs={6}>
          <DatePickerInput
            control={control}
            rules={{}}
            errors={errors}
            id="startDate"
            label={"Fecha de creacion"}
            isReadOnly={true}
          />
        </Grid>
        <Grid item xs={6}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              id={"endDate"}
              label={"Fecha de finalizacion"}
              readOnly={true}
              value={endDate}
              slotProps={{
                textField: {
                  fullWidth: true,
                },
              }}
            />
          </LocalizationProvider>
        </Grid>
        <Grid item xs={6}>
          <SelectInput
            control={control}
            rules={{
              required: {
                value: true,
                message: "Duracion es requerido.",
              },
            }}
            errors={errors}
            id={"duration"}
            label={"Duracion"}
            options={durationOptions}
          />
        </Grid>
        <Grid item xs={4}>
          <NumericInput
            control={control}
            rules={{
              required: {
                value: true,
                message: "Cantidad es requerido.",
              },
              validate: (value) => {
                const actual = value.includes(",")
                  ? value.replace(",", "")
                  : value.toString();

                return (
                  (Number(actual) >= 10000 && Number(actual) <= 100000) ||
                  "Cantidad debe estar entre 10,000 y 100,000"
                );
              },
            }}
            errors={errors}
            inputAdormentPosition={"start"}
            inputAdormentText={<AttachMoney />}
            thousandSeparator={true}
            id={"amount"}
            label={"Cantidad"}
          />
        </Grid>
        <Grid item xs={2}>
          <SelectInput
            control={control}
            rules={{
              required: {
                value: true,
                message: "Moneda es requerido.",
              },
            }}
            errors={errors}
            id={"currency"}
            label={"Moneda"}
            options={currencyOptions}
          />
        </Grid>
        <Grid item xs={6}>
          <NumericFormat
            customInput={TextField}
            label={"Intereses de Ganancia"}
            fullWidth
            value={watch("earnInterest") * 100}
            disabled={true}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Percent />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={6}>
          <NumericFormat
            customInput={TextField}
            label={"Intereses de Cancelacion"}
            fullWidth
            value={watch("cancellInterest") * 100}
            disabled={true}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Percent />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <Divider textAlign="center">
            <Typography variant="h6">
              Especificaciones del certificado
            </Typography>
          </Divider>
        </Grid>
        <Grid item xs={4}>
          <FormControlLabel
            label={"Se puede pagar antes"}
            control={<Checkbox checked={watch("isAbleToPayBefore")} />}
            disabled={true}
          />
        </Grid>
        <Grid item xs={4}>
          <FormControlLabel
            label={"Es penalizado por cancelar"}
            control={<Checkbox checked={watch("isPenaltyForCancellBefore")} />}
            disabled={true}
          />
        </Grid>
        <Grid item xs={4}>
          <FormControlLabel
            label={"Se puede cancelar antes"}
            control={<Checkbox checked={watch("isAbleToCancellBefore")} />}
            disabled={true}
          />
        </Grid>
      </Grid>
    </form>
  );
}
