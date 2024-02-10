import React from "react";
import { Button, Card, CardContent, Grid, Typography } from "@mui/material";
import TableComponent from "../ui/TableComponent";
import { useNavigate } from "react-router-dom";
import TableCertificateData from "../ui/TableCertificateData";
import useListCertificate from "../hooks/useListCertificate";
export default function ListCertificate() {
  const columns = [
    "#ID",
    "Numero de cuenta",
    "Fecha de inicio",
    "Fecha de termino",
    "Status",
    "Intereses de Ganancia",
    "Interes de Cancelacion",
    "Moneda",
    "Balance",
    "Acciones",
  ];
  const navigate = useNavigate();
  const { isLoadingCertificates, errorCertificates, certificates } =
    useListCertificate();
  if (isLoadingCertificates) return <h1>Cargando</h1>;
  if (errorCertificates) return <h1>Error</h1>;
  return (
    <Card>
      <CardContent>
        <Grid item container>
          <Grid item container>
            <Grid
              item
              container
              xs={12}
              bgcolor={"primary.main"}
              padding={2}
              color={"white"}
              alignItems={"center"}
            >
              <Grid item xs={10}>
                <Typography variant="h4">Lista de certificados</Typography>
              </Grid>
              <Grid item xs={2} alignItems={"end"} justifyContent={"end"}>
                <Button
                  variant="contained"
                  color={"success"}
                  fullWidth
                  onClick={() => navigate("/certificados/nuevo")}
                >
                  Nuevo certificado
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <TableComponent columns={columns}>
              {certificates.map((row) => (
                <TableCertificateData key={row.id} row={row} />
              ))}
            </TableComponent>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
