import React from "react";
import { Button, Card, CardContent, Grid, Typography } from "@mui/material";
import TableComponent from "../ui/TableComponent";
import TableUserData from "../ui/TableUserData";
import { useNavigate } from "react-router-dom";
import useListUser from "../hooks/useListClient";
import useListClient from "../hooks/useListClient";
export default function ListClient() {
  const columns = [
    "#ID",
    "Fecha de nacimiento",
    "Cedula",
    "Nombre",
    "Genero",
    "Correo",
    "Telefono",
    "Ubicacion",
    "Acciones",
  ];
  const navigate = useNavigate();
  const { clients, isLoadingClients, errorClients } = useListClient();
  if (isLoadingClients) return <h1>Cargando</h1>;
  else if (errorClients) return <h1>Error</h1>;
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
                <Typography variant="h4">Lista de clientes</Typography>
              </Grid>
              <Grid item xs={2} alignItems={"end"} justifyContent={"end"}>
                <Button
                  variant="contained"
                  color={"success"}
                  fullWidth
                  onClick={() => navigate("/clientes/nuevo")}
                >
                  Nuevo cliente
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <TableComponent columns={columns}>
              {clients.map((row) => (
                <TableUserData key={row.id} row={row} />
              ))}
            </TableComponent>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
