import { useQuery } from "react-query";
import { getCurrentUser } from "../api/auth";

const useCurrentUser = () => {
  const { data, isLoading } = useQuery("getCurrentUser", getCurrentUser);

  return { currentUser: data, isLoading };
};

export default useCurrentUser;
