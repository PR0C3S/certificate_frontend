import { Edit } from "@mui/icons-material";
import { IconButton, TableCell, TableRow, Toolbar } from "@mui/material";
import React from "react";

export default function TableUserData({ row, onClick }) {
  return (
    <TableRow key={row.id}>
      <TableCell align="center">{row.id}</TableCell>
      <TableCell align="center">{row.birthday}</TableCell>
      <TableCell align="center">{row.dni}</TableCell>
      <TableCell align="center">{row.fullName}</TableCell>
      <TableCell align="center">{row.gender}</TableCell>
      <TableCell align="center">{row.email}</TableCell>
      <TableCell align="center">{row.phone}</TableCell>
      <TableCell align="center">{row.location}</TableCell>
      <TableCell align="center">
        <Toolbar title={"Editar"}>
          <IconButton onClick={onClick}>
            <Edit />
          </IconButton>
        </Toolbar>
      </TableCell>
    </TableRow>
  );
}
