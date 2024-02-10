import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import React from "react";

export default function CardComponent({
  children,
  title,
  onCancell,
  cancellButtonText = "Cancelar",
  saveButtonText = "Guardar",
  isSaveButtonDisabled = false,
  idForm,
}) {
  return (
    <Card>
      <CardContent>
        <Grid item container>
          <Grid item xs={12}>
            <Typography
              variant="h4"
              bgcolor={"primary.main"}
              color={"white"}
              padding={2}
            >
              {title}
            </Typography>
          </Grid>
          {children}
        </Grid>
      </CardContent>
      <CardActions>
        <Grid container justifyContent={"start"} mb={1} spacing={1} ml={2}>
          <Grid item>
            <Button variant="contained" onClick={onCancell} fullWidth>
              {cancellButtonText}
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              type="submit"
              fullWidth
              disabled={isSaveButtonDisabled}
              form={idForm}
            >
              {saveButtonText}
            </Button>
          </Grid>
        </Grid>
      </CardActions>
    </Card>
  );
}
