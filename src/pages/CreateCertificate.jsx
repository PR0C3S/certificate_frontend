import React, { useState } from "react";
import FormCreateCertificate from "../forms/FormCreateCertificate";
import FormSearchClientByDNI from "../forms/FormSearchClientByDNI";
import CardComponent from "../ui/CardComponent";
import { Grid } from "@mui/material";
import { add, parseISO } from "date-fns";

export default function CreateCertificate() {
  const today = new Date();
  const defaultCertificate = {
    status: "ACTIVE",

    startDate: parseISO(today),
    endDate: parseISO(
      add(today, {
        months: 6,
      })
    ),
    duration: 6,
    currency: "RD",
    amount: "",
    earnInterest: 15,
    cancellInterest: 5,
    isPenaltyForCancellBefore: true,
    isAbleToCancellBefore: true,
    isAbleToPayBefore: true,
  };

  const defaultClient = {
    dni: "",
  };

  const [user, setUser] = useState(null);

  function onSubmitCertificate(data, e) {
    e.preventDefault();
    console.log("Certificate", data);
  }

  function onSubmitSearchByDNI(data, e) {
    e.preventDefault();
    console.log("DNI", data);
  }

  return (
    <CardComponent title={"Crear certificado"}>
      <Grid container ml={1} spacing={1}>
        <Grid item xs={12}>
          <FormSearchClientByDNI
            onSubmit={onSubmitSearchByDNI}
            fullName={user?.fullName}
            defaultClient={defaultClient}
          />
        </Grid>
        <Grid item xs={12}>
          <FormCreateCertificate
            onSubmit={onSubmitCertificate}
            defaultCertificate={defaultCertificate}
          />
        </Grid>
      </Grid>
    </CardComponent>
  );
}
