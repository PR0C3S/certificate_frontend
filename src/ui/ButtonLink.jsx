import { Button } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

export default function ButtonLink({ text, to, sx, onClick }) {
  return (
    <Button
      variant={"contained"}
      component={Link}
      to={to}
      sx={sx}
      onClick={onClick}
    >
      {text}
    </Button>
  );
}
