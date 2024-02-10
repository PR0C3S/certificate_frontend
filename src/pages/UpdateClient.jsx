import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CardComponent from "../ui/CardComponent";
import { Grid } from "@mui/material";
import FormUpdateClient from "../forms/FormUpdateClient";
import useUpdateClient from "../hooks/useUpdateClient";
import useGetClientById from "../hooks/useGetClientById";

export default function UpdateClient() {
  const { id } = useParams();
  const { isLoadingClient, errorClient, client } = useGetClientById();
  const { updateClient, isUpdatingClient } = useUpdateClient();
  const navigate = useNavigate();

  console.log("client", client);

  function onSubmitClient(data, e) {
    e.preventDefault();
    updateClient({ id, body: data });
    navigate("/clientes");
  }

  function onCancelClient() {
    navigate("/clientes");
  }

  if (isLoadingClient) return <h1>Cargando..</h1>;
  else if (errorClient) return <h1>Error</h1>;

  return (
    <CardComponent
      title={"Editar cliente"}
      onCancell={onCancelClient}
      idForm={"updateClient"}
      isSaveButtonDisabled={isUpdatingClient}
    >
      <Grid container ml={1} spacing={1}>
        <Grid item xs={12}>
          <FormUpdateClient
            onSubmit={onSubmitClient}
            defaultClient={client}
            idForm={"updateClient"}
          />
        </Grid>
      </Grid>
    </CardComponent>
  );
}
