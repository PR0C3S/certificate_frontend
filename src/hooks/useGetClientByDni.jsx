import { useQuery } from "@tanstack/react-query";
import { getByDniAPI } from "../server/ClientApi";

export default function useGetClientByDni(dni) {
  const {
    isLoading: isLoadingClientByDni,
    error: errorClientByDni,
    data: clientByDni,
  } = useQuery({
    queryKey: ["clientByDni", { dni }],
    queryFn: () => getByDniAPI(dni),
    enabled: !!dni,
  });

  return {
    isLoadingClientByDni,
    errorClientByDni,
    clientByDni,
  };
}
