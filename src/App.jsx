import React from "react";
import FormCreateClient from "./forms/FormCreateClient";
import { Container } from "@mui/material";
import FormCreateCertificate from "./forms/FormCreateCertificate";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CreateClient from "./pages/CreateClient";
import ListClient from "./pages/ListClient";
import CreateCertificate from "./pages/CreateCertificate";
import BalanceCertificate from "./pages/BalanceCertificate";
import UpdateClient from "./pages/UpdateClient";
import ListCertificate from "./pages/ListCertificate";
import RevenueCertificate from "./pages/RevenueCertificate";
import CertificatesByClient from "./pages/CertificatesByClient";
import NavBar from "./ui/NavBar";

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
      <NavBar />
      <BrowserRouter>
        <Routes>
          <Route path="clientes/nuevo" element={<CreateClient />} />
          <Route path="clientes" element={<ListClient />} />
          <Route path="clientes/editar/:id" element={<UpdateClient />} />
          <Route
            path="certificados/cliente/:id"
            element={<CertificatesByClient />}
          />
          <Route path="certificados/nuevo" element={<CreateCertificate />} />
          <Route path="certificados" element={<ListCertificate />} />
          <Route
            path="certificados/balance/:id"
            element={<BalanceCertificate />}
          />
          <Route
            path="certificados/ganancia/:id"
            element={<RevenueCertificate />}
          />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
