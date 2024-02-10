import React from "react";
import { updateClientAPI } from "../server/ClientApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

export default function useUpdateClient() {
  const queryClient = useQueryClient();
  const { id } = useParams();

  const { mutate: updateClient, isLoading: isUpdatingClient } = useMutation({
    mutationFn: updateClientAPI,
    onSuccess: () => {
      queryClient.resetQueries();
    },
    //onError: (err) =>toast.error(err.message),
  });

  return { updateClient, isUpdatingClient };
}
