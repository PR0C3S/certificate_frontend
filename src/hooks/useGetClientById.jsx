import { useQuery } from "@tanstack/react-query";
import { getClientByIdAPI } from "../server/ClientApi";
import { useParams } from "react-router-dom";

export default function useGetClientById() {
  const { id } = useParams();
  const {
    isLoading: isLoadingClient,
    error: errorClient,
    data: client,
  } = useQuery({
    queryKey: ["client", { id }],
    queryFn: () => getClientByIdAPI(id),
    enabled: !!id,
  });

  return {
    isLoadingClient,
    errorClient,
    client,
  };
}
