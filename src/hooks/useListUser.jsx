import { useQuery } from "@tanstack/react-query";
import { listUserAPI } from "../server/ClientApi";

export default function useListUser() {
  const {
    isLoading: isLoadingUsers,
    error: errorUsers,
    data: users,
  } = useQuery({
    queryKey: ["users"],
    queryFn: listUserAPI,
  });

  return { isLoadingUsers, errorUsers, users };
}
