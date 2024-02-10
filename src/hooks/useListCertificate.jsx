import { useQuery } from "@tanstack/react-query";
import { listCertificateAPI } from "../server/CertificateApi";

export default function useListCertificate() {
  const {
    isLoading: isLoadingCertificates,
    error: errorCertificates,
    data: certificates,
  } = useQuery({
    queryKey: ["certificates"],
    queryFn: listCertificateAPI,
  });

  return { isLoadingCertificates, errorCertificates, certificates };
}
