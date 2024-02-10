import { CurrencyExchange, Visibility } from "@mui/icons-material";
import { IconButton, TableCell, TableRow } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function TableCertificateData({ row }) {
  const navigate = useNavigate();
  return (
    <TableRow key={row.id}>
      <TableCell align="center">{row.id}</TableCell>
      <TableCell align="center">{row.accountNumber}</TableCell>
      <TableCell align="center">{row.startDate}</TableCell>
      <TableCell align="center">{row.finishDate}</TableCell>
      <TableCell align="center">{row.status}</TableCell>
      <TableCell align="center">{row.earnInterest * 100 + "%"}</TableCell>
      <TableCell align="center">{row.cancellInterest * 100 + "%"}</TableCell>
      <TableCell align="center">{row.currency}</TableCell>
      <TableCell align="center">{row.amount}</TableCell>
      <TableCell align="center">
        <IconButton
          onClick={() => navigate(`/certificados/balance/${row.id}`)}
          title="Ver Balance"
        >
          <Visibility />
        </IconButton>
        <IconButton
          onClick={() => navigate(`/certificados/ganancia/${row.id}`)}
          title="Ver Posibles Ganancias"
        >
          <CurrencyExchange />
        </IconButton>
      </TableCell>
    </TableRow>
  );
}
