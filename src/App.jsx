import React from "react";
import FormCreateClient from "./forms/FormCreateClient";
import { Container } from "@mui/material";
import FormCreateCertificate from "./forms/FormCreateCertificate";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CreateClient from "./pages/CreateClient";
import ListClient from "./pages/ListClient";
import CreateCertificate from "./pages/CreateCertificate";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // staleTime: 60 * 1000,
      staleTime: 0,
    },
  },
});
export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="clientes/nuevo" element={<CreateClient />} />
          <Route path="clientes" element={<ListClient />} />
          <Route path="certificados/nuevo" element={<CreateCertificate />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
