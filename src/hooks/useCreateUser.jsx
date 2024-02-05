import React from "react";
import { createUserAPI } from "../server/ClientApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useCreateUser() {
  const queryClient = useQueryClient();

  const { mutate: createUser, isLoading: isCreatingUser } = useMutation({
    mutationFn: createUserAPI,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    //onError: (err) =>toast.error(err.message),
  });

  return { createUser, isCreatingUser };
}
