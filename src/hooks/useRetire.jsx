import React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { retireRestApi } from "../server/CertificateApi";

export default function useRetire() {
  const queryClient = useQueryClient();

  const { mutate: retire, isLoading: isRetiring } = useMutation({
    mutationFn: retireRestApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["balance"] });
      queryClient.invalidateQueries({ queryKey: ["client"] });
      toast.success("Retiro realizado con exito");
    },
    onError: (err) => toast.error(err.message),
  });

  return { retire, isRetiring };
}
