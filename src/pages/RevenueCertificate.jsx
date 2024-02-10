import {
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  Divider,
  Grid,
  InputAdornment,
  ListItem,
  ListItemText,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import ListComponent from "../ui/ListComponent";
import { NumericFormat } from "react-number-format";
import { useNavigate } from "react-router-dom";
import { parseISO } from "date-fns";
import { ArrowBack, Percent } from "@mui/icons-material";
import useGetRevenueById from "../hooks/useGetRevenueById";

export default function RevenueCertificate() {
  const { isLoadingRevenue, errorRevenue, revenue } = useGetRevenueById();
  const navigate = useNavigate();

  function onBack() {
    navigate("/certificados");
  }

  if (isLoadingRevenue) return <h1>Cargando...</h1>;

  if (errorRevenue) return <h1>Error</h1>;

  return (
    <Card>
      <CardContent>
        <Grid item container rowSpacing={2} spacing={2}>
          <Grid
            item
            container
            xs={12}
            bgcolor={"primary.main"}
            padding={2}
            color={"white"}
            alignItems={"center"}
            justifyContent={"center"}
          >
            <Grid item xs={10}>
              <Typography variant="h4">Ganancias del certificado</Typography>
            </Grid>
            <Grid item container xs={2} justifyContent={"end"}>
              <Chip
                label={`Estado: ${revenue.status}`}
                variant="filled"
                color={
                  revenue.status === "Activo"
                    ? "success"
                    : revenue.status === "Cancelado"
                    ? "error"
                    : "warning"
                }
              />
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Typography variant={"h5"} textAlign={"center"}>
              Certificado financiero
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography
              variant={"h5"}
              textAlign={"center"}
              color={"primary.main"}
            >
              {revenue.accountNumber}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant={"h4"} textAlign={"center"} color={"green"}>
              <NumericFormat
                prefix={"Balance actual: " + revenue.currency + " "}
                displayType="text"
                value={revenue.amount}
                decimalScale={2}
                thousandSeparator={true}
              />
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography variant={"h4"} textAlign={"center"} color={"green"}>
              <NumericFormat
                prefix={"Balance esperado: " + revenue.currency + " "}
                displayType="text"
                value={revenue.expectedAmount}
                decimalScale={2}
                thousandSeparator={true}
              />
            </Typography>
          </Grid>

          <Grid item xs={6}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                id={"startDate"}
                label={"Fecha de creacion"}
                slotProps={{
                  textField: {
                    fullWidth: true,
                  },
                }}
                value={parseISO(revenue.startDate)}
                readOnly={true}
              />
            </LocalizationProvider>
          </Grid>

          <Grid item xs={6}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                id={"endDate"}
                label={"Fecha de finalizacion"}
                slotProps={{
                  textField: {
                    fullWidth: true,
                  },
                }}
                value={parseISO(revenue.finishDate)}
                readOnly={true}
              />
            </LocalizationProvider>
          </Grid>

          <Grid item xs={6}>
            <NumericFormat
              customInput={TextField}
              label={"Intereses de Ganancia"}
              fullWidth
              value={revenue.earnInterest * 100}
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
              value={revenue.cancellInterest * 100}
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
            <TextField
              id={"dni"}
              label={"Cedula"}
              value={revenue.dni}
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              id={"client"}
              label={"Nombre del cliente"}
              fullWidth
              value={revenue.fullName}
            />
          </Grid>

          <Grid item xs={12}>
            <Divider>
              <Typography variant="h6">
                Estado de cuenta que generara
              </Typography>
            </Divider>
            <ListComponent maxHeight={300}>
              {revenue.transactions.map((transaction, index) => (
                <div key={transaction.id + index}>
                  <ListItem style={{ backgroundColor: "#fafafa" }}>
                    <ListItemText
                      primary={transaction.date}
                      secondary={transaction.message}
                    />

                    <Typography
                      variant="h6"
                      color={
                        transaction.type === "Deposito" ||
                        transaction.type === "Creacion"
                          ? "green"
                          : "red"
                      }
                      alignItems={"center"}
                    >
                      <NumericFormat
                        prefix={
                          transaction.type === "Deposito" ||
                          transaction.type === "Creacion"
                            ? "+"
                            : "-"
                        }
                        displayType="text"
                        value={transaction.amount}
                        decimalScale={2}
                        thousandSeparator={true}
                      />
                    </Typography>
                  </ListItem>
                  <Divider component="li" />
                </div>
              ))}
            </ListComponent>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions>
        <Button variant="contained" startIcon={<ArrowBack />} onClick={onBack}>
          Regresar
        </Button>
      </CardActions>
    </Card>
  );
}
