import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getBalanceByIdAPI } from "../server/CertificateApi";

export default function useGetBalanceById() {
  const { id } = useParams();
  const {
    isLoading: isLoadingBalance,
    error: errorBalance,
    data: balance,
  } = useQuery({
    queryKey: ["balance", { id }],
    queryFn: () => getBalanceByIdAPI(id),
    enabled: !!id,
  });

  return {
    isLoadingBalance,
    errorBalance,
    balance,
  };
}
