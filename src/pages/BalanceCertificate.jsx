import {
  Button,
  Card,
  CardActionArea,
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
import useGetBalanceById from "../hooks/useGetBalanceById";
import { useNavigate } from "react-router-dom";
import { add, formatISO, parseISO, sub } from "date-fns";
import { ArrowBack, Percent } from "@mui/icons-material";
import useDepositeOneMonth from "../hooks/useDepositeOneMonth";
import useDepositeRestMonths from "../hooks/useDepositeRestMonths";
import useRetire from "../hooks/useRetire";

export default function BalanceCertificate() {
  const { isLoadingBalance, errorBalance, balance } = useGetBalanceById();
  const navigate = useNavigate();
  const { depositeOneMonth, isDepositingOneMonth } = useDepositeOneMonth();
  const { retire, isRetiring } = useRetire();
  const { depositeRestMonths, isDepositingRestMonths } =
    useDepositeRestMonths();

  function onBack() {
    navigate("/certificados");
  }

  function onDepositeOneMonth() {
    depositeOneMonth(balance.id);
  }
  function onDepositeRestMonths() {
    depositeRestMonths(balance.id);
  }

  function onRetire(date) {
    //console.log("type", formatISO(date));

    retire({ body: { date }, id: balance.id });
  }

  if (isLoadingBalance) return <h1>Cargando...</h1>;

  if (errorBalance) return <h1>Error</h1>;

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
                label={`Estado: ${balance.status}`}
                variant="filled"
                color={
                  balance.status === "Activo"
                    ? "success"
                    : balance.status === "Cancelado"
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
              {balance.accountNumber}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant={"h4"} textAlign={"center"} color={"green"}>
              <NumericFormat
                prefix={balance.currency + " "}
                displayType="text"
                value={balance.amount}
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
                value={parseISO(balance.startDate)}
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
                value={parseISO(balance.finishDate)}
                readOnly={true}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={6}>
            <NumericFormat
              customInput={TextField}
              label={"Intereses de Ganancia"}
              fullWidth
              value={balance.earnInterest * 100}
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
              value={balance.cancellInterest * 100}
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
              value={balance.dni}
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              id={"client"}
              label={"Nombre del cliente"}
              fullWidth
              value={balance.fullName}
              readOnly={true}
            />
          </Grid>

          {balance.status === "Activo" && (
            <Grid item container xs={12} spacing={2}>
              <Grid item xs={6}>
                <Button
                  variant={"contained"}
                  fullWidth
                  onClick={onDepositeOneMonth}
                  disabled={
                    isDepositingOneMonth || isDepositingRestMonths || isRetiring
                  }
                >
                  Hacer 1 deposito
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button
                  variant={"contained"}
                  fullWidth
                  onClick={onDepositeRestMonths}
                  disabled={
                    isDepositingOneMonth || isDepositingRestMonths || isRetiring
                  }
                >
                  Completar todos los depositos
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button
                  variant={"contained"}
                  color={"error"}
                  fullWidth
                  onClick={() =>
                    onRetire(sub(parseISO(balance.finishDate), { days: 10 }))
                  }
                  disabled={
                    isDepositingOneMonth || isDepositingRestMonths || isRetiring
                  }
                >
                  Realizar retiro de fondos con penalizacion
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button
                  variant={"contained"}
                  color={"error"}
                  fullWidth
                  onClick={() =>
                    onRetire(add(parseISO(balance.finishDate), { days: 10 }))
                  }
                  disabled={
                    isDepositingOneMonth || isDepositingRestMonths || isRetiring
                  }
                >
                  Realizar retiro de fondos
                </Button>
              </Grid>
            </Grid>
          )}

          {balance.status === "Finalizado" && balance.amount > 0 && (
            <Grid item container xs={12} spacing={2}>
              <Grid item xs={6}>
                <Button
                  variant={"contained"}
                  color={"error"}
                  fullWidth
                  onClick={() =>
                    onRetire(sub(parseISO(balance.finishDate), { days: 10 }))
                  }
                  disabled={
                    isDepositingOneMonth || isDepositingRestMonths || isRetiring
                  }
                >
                  Realizar retiro de fondos con penalizacion
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button
                  variant={"contained"}
                  color={"error"}
                  fullWidth
                  onClick={() =>
                    onRetire(add(parseISO(balance.finishDate), { days: 10 }))
                  }
                  disabled={
                    isDepositingOneMonth || isDepositingRestMonths || isRetiring
                  }
                >
                  Realizar retiro de fondos
                </Button>
              </Grid>
            </Grid>
          )}

          <Grid item xs={12}>
            <Divider>
              <Typography variant="h6">Estado de cuenta</Typography>
            </Divider>
            <ListComponent maxHeight={300}>
              {balance.transactions.map((transaction) => (
                <div key={transaction.id}>
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
