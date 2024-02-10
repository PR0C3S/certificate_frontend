import React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCertificateAPI } from "../server/CertificateApi";

export default function useCreateCertificate() {
  const queryClient = useQueryClient();

  const { mutate: createCertificate, isLoading: isCreatingCertificate } =
    useMutation({
      mutationFn: createCertificateAPI,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["certificates"] });
      },
      //onError: (err) =>toast.error(err.message),
    });

  return { createCertificate, isCreatingCertificate };
}
