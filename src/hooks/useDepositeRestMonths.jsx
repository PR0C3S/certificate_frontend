import React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { depositRestMonthAPI } from "../server/CertificateApi";

export default function useDepositeRestMonths() {
  const queryClient = useQueryClient();

  const { mutate: depositeRestMonths, isLoading: isDepositingRestMonths } =
    useMutation({
      mutationFn: depositRestMonthAPI,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["balance"] });
        queryClient.invalidateQueries({ queryKey: ["client"] });
        toast.success("Depositos realizado con exito");
      },
      onError: (err) => toast.error(err.message),
    });

  return { depositeRestMonths, isDepositingRestMonths };
}
