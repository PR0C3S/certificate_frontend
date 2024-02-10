import { Edit, ViewList } from "@mui/icons-material";
import { IconButton, TableCell, TableRow } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function TableUserData({ row }) {
  const navigate = useNavigate();
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
        <IconButton
          onClick={() => navigate(`/clientes/editar/${row.id}`)}
          title="Editar cliente"
        >
          <Edit />
        </IconButton>
        <IconButton
          onClick={() => navigate(`/certificados/cliente/${row.id}`)}
          title="Ver Listado de certificados"
        >
          <ViewList />
        </IconButton>
      </TableCell>
    </TableRow>
  );
}
