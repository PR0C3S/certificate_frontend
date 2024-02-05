import { Divider, Grid, Typography } from "@mui/material";
import React from "react";
import { AttachMoney, Percent } from "@mui/icons-material";
import SelectInput from "../ui/SelectInput";
import { currencyOptions, durationOptions } from "../utils/Constant";
import { useForm } from "react-hook-form";
import NumericInput from "../ui/NumericInput";
import CheckBoxInput from "../ui/CheckBoxInput";
import DatePickerInput from "../ui/DatePickerInput";
/**
 * Validar los checkbox porque no cargan
 * Hacer que fecha de finalizacion cambie con el onchange de duracion
 * Agregar funcionalidad de buscar cliente
 * Verificar porque los inputs numericos salen como string
 */
export default function FormCreateCertificate({
  onSubmit,
  defaultCertificate,
}) {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: defaultCertificate,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid item container xs={12} spacing={2} rowSpacing={2} mt={1}>
        <Grid item xs={12}>
          <Divider textAlign="center">
            <Typography variant="h6">Datos del certificado</Typography>
          </Divider>
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
          <DatePickerInput
            control={control}
            rules={{}}
            errors={errors}
            id="endDate"
            label={"Fecha de finalizacion"}
            isReadOnly={true}
          />
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
          <NumericInput
            control={control}
            errors={errors}
            inputAdormentPosition={"end"}
            inputAdormentText={<Percent />}
            id={"earnInterest"}
            label={"Intereses de Ganancia"}
            isDisabled={true}
          />
        </Grid>
        <Grid item xs={6}>
          <NumericInput
            control={control}
            errors={errors}
            inputAdormentPosition={"end"}
            inputAdormentText={<Percent />}
            id={"cancellInterest"}
            label={"Intereses de Cancelacion"}
            isDisabled={true}
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
          <CheckBoxInput
            control={control}
            id={"isAbleToPayBefore"}
            label={"Se puede pagar antes"}
            isDisabled={true}
          />
        </Grid>
        <Grid item xs={4}>
          <CheckBoxInput
            control={control}
            id={"isAbleToCancellBefore"}
            label={"Se puede cancelar antes"}
            isDisabled={true}
          />
        </Grid>
        <Grid item xs={4}>
          <CheckBoxInput
            control={control}
            id={"isPenaltyForCancellBefore"}
            label={"Tiene intereses por cancelacion"}
            isDisabled={true}
          />
        </Grid>
      </Grid>
    </form>
  );
}
