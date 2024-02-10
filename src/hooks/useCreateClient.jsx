import React from "react";
import { createClientApi } from "../server/ClientApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useCreateClient() {
  const queryClient = useQueryClient();

  const { mutate: createClient, isLoading: isCreatingClient } = useMutation({
    mutationFn: createClientApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clients"] });
    },
    //onError: (err) =>toast.error(err.message),
  });

  return { createClient, isCreatingClient };
}
