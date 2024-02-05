import {
  Card,
  CardContent,
  Chip,
  Divider,
  Grid,
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
import { add } from "date-fns";

export default function BalanceCertificate() {
  const today = new Date();
  const certifcate = {
    id: 45645346456,
    currency: "RD",
    balance: 6500,
    startDate: today,
    endDate: add(today, { months: 6 }),
    dni: "402-1877448-3",
    cliente: "John Harold Peña Acosta",
    status: "Activo ",
    transacctions: [
      {
        date: today,
        message: "Ganancia certificado",
        amount: 500,
        type: "Deposit",
      },
      {
        date: today,
        message: "Ganancia certificado",
        amount: 1000,
        type: "Deposit",
      },
      {
        date: today,
        message: "Ganancia certificado",
        amount: 8000,
        type: "Deposit",
      },
      {
        date: today,
        message: "Retiro fondos",
        amount: 3000,
        type: "Retire",
      },
    ],
  };
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
              <Typography variant="h4">Certificado</Typography>
            </Grid>
            <Grid item container xs={2} justifyContent={"end"}>
              <Chip
                label={`Estado: ${certifcate.status}`}
                variant="filled"
                color={
                  certifcate.status.toLowerCase() === "ctivo"
                    ? "warning"
                    : certifcate.status.toLowerCase() === "cancelado"
                    ? "error"
                    : "success"
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
              {certifcate.id}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant={"h4"} textAlign={"center"} color={"green"}>
              <NumericFormat
                prefix={certifcate.currency + " "}
                displayType="text"
                value={certifcate.balance}
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
                value={certifcate.startDate}
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
                value={certifcate.endDate}
                readOnly={true}
              />
            </LocalizationProvider>
          </Grid>

          <Grid item xs={6}>
            <TextField
              id={"dni"}
              label={"Cedula"}
              value={certifcate.dni}
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              id={"client"}
              label={"Nombre del cliente"}
              fullWidth
              value={certifcate.cliente}
              readOnly={true}
            />
          </Grid>

          <Grid item xs={12}>
            <Divider>
              <Typography variant="h6">Estado de cuenta</Typography>
            </Divider>
            <ListComponent maxHeight={300}>
              {certifcate.transacctions.map((transaction) => (
                <div key={transaction.date}>
                  <ListItem style={{ backgroundColor: "#fafafa" }}>
                    <ListItemText
                      primary={transaction.date.toISOString()}
                      secondary={transaction.message}
                    />

                    <Typography
                      variant="h6"
                      color={transaction.type === "Deposit" ? "green" : "red"}
                      alignItems={"center"}
                    >
                      <NumericFormat
                        prefix={transaction.type === "Deposit" ? "+" : "-"}
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
    </Card>
  );
}
