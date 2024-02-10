import React, { useState } from "react";
import FormCreateCertificate from "../forms/FormCreateCertificate";
import FormSearchClientByDNI from "../forms/FormSearchClientByDNI";
import CardComponent from "../ui/CardComponent";
import { Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import useCreateCertificate from "../hooks/useCreateCertificate";

export default function CreateCertificate() {
  const today = new Date();
  const [client, setClient] = useState("");
  const defaultCertificate = {
    status: "ACTIVE",
    startDate: today,
    duration: 6,
    idClient: client,
    currency: "RD",
    amount: "",
    earnInterest: 0.1,
    cancellInterest: 0.25,
    isAbleToCancellBefore: false,
    isPenaltyForCancellBefore: true,
    isAbleToPayBefore: false,
  };

  const defaultClient = {
    dni: "",
  };

  const navigate = useNavigate();
  const { createCertificate, isCreatingCertificate } = useCreateCertificate();

  function onSubmitCertificate(data, e) {
    e.preventDefault();
    const amount = data.amount.includes(",")
      ? Number(data.amount.replace(",", ""))
      : Number(data.amount);
    createCertificate({ ...data, amount });
    navigate("/certificados");
  }

  function onCancelCertificate() {
    navigate("/certificados");
  }

  function onSubmitClient(object) {
    setClient(object);
  }

  return (
    <CardComponent
      title={"Crear certificado"}
      isSaveButtonDisabled={isCreatingCertificate}
      onCancell={onCancelCertificate}
      idForm={"createCertificate"}
    >
      <Grid container ml={1} spacing={1}>
        <Grid item xs={12}>
          <FormSearchClientByDNI
            onSubmitClient={onSubmitClient}
            defaultClient={defaultClient}
          />
        </Grid>
        <Grid item xs={12}>
          <FormCreateCertificate
            onSubmit={onSubmitCertificate}
            defaultCertificate={defaultCertificate}
            idForm={"createCertificate"}
            idClient={client}
          />
        </Grid>
      </Grid>
    </CardComponent>
  );
}
