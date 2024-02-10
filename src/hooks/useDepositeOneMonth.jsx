import React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { depositOneMonthAPI } from "../server/CertificateApi";

export default function useDepositeOneMonth() {
  const queryClient = useQueryClient();

  const { mutate: depositeOneMonth, isLoading: isDepositingOneMonth } =
    useMutation({
      mutationFn: depositOneMonthAPI,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["balance"] });
        queryClient.invalidateQueries({ queryKey: ["client"] });
        toast.success("Deposito realizado con exito");
      },
      onError: (err) => toast.error(err.message),
    });

  return { depositeOneMonth, isDepositingOneMonth };
}
