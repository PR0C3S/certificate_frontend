import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getRevenueById } from "../server/CertificateApi";

export default function useGetRevenueById() {
  const { id } = useParams();
  const {
    isLoading: isLoadingRevenue,
    error: errorRevenue,
    data: revenue,
  } = useQuery({
    queryKey: ["revenue", { id }],
    queryFn: () => getRevenueById(id),
    enabled: !!id,
  });

  return { isLoadingRevenue, errorRevenue, revenue };
}
