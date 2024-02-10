import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Card,
  CardActions,
  CardContent,
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
import { add, parseISO, sub } from "date-fns";
import { ArrowBack, ExpandMore, Percent } from "@mui/icons-material";
import useDepositeOneMonth from "../hooks/useDepositeOneMonth";
import useDepositeRestMonths from "../hooks/useDepositeRestMonths";
import useRetire from "../hooks/useRetire";
import useGetClientById from "../hooks/useGetClientById";

export default function CertificatesByClient() {
  const { isLoadingClient, errorClient, client } = useGetClientById();
  const navigate = useNavigate();
  const { depositeOneMonth, isDepositingOneMonth } = useDepositeOneMonth();
  const { retire, isRetiring } = useRetire();
  const { depositeRestMonths, isDepositingRestMonths } =
    useDepositeRestMonths();

  function onBack() {
    navigate("/clientes");
  }

  function onDepositeOneMonth(id) {
    depositeOneMonth(id);
  }
  function onDepositeRestMonths(id) {
    depositeRestMonths(id);
  }

  function onRetire(date, id) {
    //console.log("type", formatISO(date));

    retire({ body: { date }, id });
  }

  if (isLoadingClient) return <h1>Cargando...</h1>;

  if (errorClient) return <h1>Error</h1>;

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
            <Grid item xs={12}>
              <Typography variant="h4">
                Lista de certificados por cliente
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={6}>
            <TextField
              id={"dni"}
              label={"Cedula"}
              value={client.dni}
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              id={"client"}
              label={"Nombre del cliente"}
              fullWidth
              value={client.fullName}
              readOnly={true}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              fullWidth
              label={"Fecha de nacimiento"}
              value={client.birthday}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField fullWidth label={"Genero"} value={client.gender} />
          </Grid>
          <Grid item xs={6}>
            <TextField fullWidth label={"Correo"} value={client.email} />
          </Grid>
          <Grid item xs={6}>
            <TextField fullWidth label={"Telefono"} value={client.phone} />
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth label={"Ubicacion"} value={client.location} />
          </Grid>

          <Grid item container spacing={2} rowSpacing={2}>
            <Grid item xs={12}>
              <Divider>
                <Typography variant="h6">Lista de certificados</Typography>
              </Divider>
            </Grid>
            {client.certificates.length > 0 ? (
              client.certificates.map((certificate) => {
                return (
                  <Grid item xs={12} key={certificate.id}>
                    <Accordion>
                      <AccordionSummary
                        expandIcon={<ExpandMore />}
                        aria-controls="panel1-content"
                        id={certificate.id}
                      >
                        <Typography
                          variant={"h6"}
                          color={"primary.main"}
                        >{`Certificado: ${certificate.accountNumber}`}</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Grid item container spacing={2} rowSpacing={2}>
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
                              {certificate.accountNumber}
                            </Typography>
                          </Grid>
                          <Grid item xs={12}>
                            <Typography
                              variant={"h4"}
                              textAlign={"center"}
                              color={"green"}
                            >
                              <NumericFormat
                                prefix={certificate.currency + " "}
                                displayType="text"
                                value={certificate.amount}
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
                                value={parseISO(certificate.startDate)}
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
                                value={parseISO(certificate.finishDate)}
                                readOnly={true}
                              />
                            </LocalizationProvider>
                          </Grid>
                          <Grid item xs={6}>
                            <NumericFormat
                              customInput={TextField}
                              label={"Intereses de Ganancia"}
                              fullWidth
                              value={certificate.earnInterest * 100}
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
                              value={certificate.cancellInterest * 100}
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

                          {certificate.status === "Activo" && (
                            <Grid item container xs={12} spacing={2}>
                              <Grid item xs={6}>
                                <Button
                                  variant={"contained"}
                                  fullWidth
                                  onClick={() =>
                                    onDepositeOneMonth(certificate.id)
                                  }
                                  disabled={
                                    isDepositingOneMonth ||
                                    isDepositingRestMonths ||
                                    isRetiring
                                  }
                                >
                                  Hacer 1 deposito
                                </Button>
                              </Grid>
                              <Grid item xs={6}>
                                <Button
                                  variant={"contained"}
                                  fullWidth
                                  onClick={() =>
                                    onDepositeRestMonths(certificate.id)
                                  }
                                  disabled={
                                    isDepositingOneMonth ||
                                    isDepositingRestMonths ||
                                    isRetiring
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
                                    onRetire(
                                      sub(parseISO(certificate.finishDate), {
                                        days: 10,
                                      })
                                    )
                                  }
                                  disabled={
                                    isDepositingOneMonth ||
                                    isDepositingRestMonths ||
                                    isRetiring
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
                                    onRetire(
                                      add(parseISO(certificate.finishDate), {
                                        days: 10,
                                      }),
                                      certificate.id
                                    )
                                  }
                                  disabled={
                                    isDepositingOneMonth ||
                                    isDepositingRestMonths ||
                                    isRetiring
                                  }
                                >
                                  Realizar retiro de fondos
                                </Button>
                              </Grid>
                            </Grid>
                          )}

                          {certificate.status === "Finalizado" &&
                            certificate.amount > 0 && (
                              <Grid item container xs={12} spacing={2}>
                                <Grid item xs={6}>
                                  <Button
                                    variant={"contained"}
                                    color={"error"}
                                    fullWidth
                                    onClick={() =>
                                      onRetire(
                                        sub(parseISO(certificate.finishDate), {
                                          days: 10,
                                        }),
                                        certificate.id
                                      )
                                    }
                                    disabled={
                                      isDepositingOneMonth ||
                                      isDepositingRestMonths ||
                                      isRetiring
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
                                      onRetire(
                                        add(parseISO(certificate.finishDate), {
                                          days: 10,
                                        }),
                                        certificate.id
                                      )
                                    }
                                    disabled={
                                      isDepositingOneMonth ||
                                      isDepositingRestMonths ||
                                      isRetiring
                                    }
                                  >
                                    Realizar retiro de fondos
                                  </Button>
                                </Grid>
                              </Grid>
                            )}

                          <Grid item xs={12}>
                            <Divider>
                              <Typography variant="h6">
                                Estado de cuenta
                              </Typography>
                            </Divider>
                            <ListComponent maxHeight={300}>
                              {certificate.transactions.map((transaction) => (
                                <div key={transaction.id}>
                                  <ListItem
                                    style={{ backgroundColor: "#fafafa" }}
                                  >
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
                                        allowNegative={false}
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
                      </AccordionDetails>
                    </Accordion>
                  </Grid>
                );
              })
            ) : (
              <Grid item xs={12}>
                <Typography variant="h5" textAlign={"center"}>
                  No hay certificados agregados a este cliente
                </Typography>
              </Grid>
            )}
          </Grid>
        </Grid>
        `
      </CardContent>
      <CardActions>
        <Button variant="contained" startIcon={<ArrowBack />} onClick={onBack}>
          Regresar
        </Button>
      </CardActions>
    </Card>
  );
}
