import { useQuery } from "@tanstack/react-query";
import { listClientsAPI } from "../server/ClientApi";

export default function useListClient() {
  const {
    isLoading: isLoadingClients,
    error: errorClients,
    data: clients,
  } = useQuery({
    queryKey: ["clients"],
    queryFn: listClientsAPI,
  });

  return { clients, isLoadingClients, errorClients };
}
