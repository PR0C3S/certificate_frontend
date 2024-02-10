import React from "react";
import FormCreateClient from "../forms/FormCreateClient";
import { useNavigate } from "react-router-dom";
import CardComponent from "../ui/CardComponent";
import { Grid } from "@mui/material";
import useCreateClient from "../hooks/useCreateClient";

const defaultClient = {
  dni: "",
  fullName: "",
  birthday: null,
  gender: "",
  email: "",
  phone: "",
  location: "",
};
export default function CreateClient() {
  const navigate = useNavigate();
  const { createClient, isCreatingClient } = useCreateClient();

  function onSubmitClient(data, e) {
    e.preventDefault();
    createClient(data);
    navigate("/clientes");
  }

  function onCancelClient() {
    navigate("/clientes");
  }

  return (
    <CardComponent
      title={"Crear cliente"}
      onCancell={onCancelClient}
      idForm={"createClient"}
      isSaveButtonDisabled={isCreatingClient}
    >
      <Grid container ml={1} spacing={1}>
        <Grid item xs={12}>
          <FormCreateClient
            onSubmit={onSubmitClient}
            defaultClient={defaultClient}
            idForm={"createClient"}
          />
        </Grid>
      </Grid>
    </CardComponent>
  );
}
