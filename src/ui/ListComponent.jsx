import { List } from "@mui/material";
import React from "react";

export default function ListComponent({ children, maxHeight = "auto" }) {
  return (
    <List
      sx={{
        overflow: "auto",
        maxHeight: maxHeight,
      }}
    >
      {children}
    </List>
  );
}
