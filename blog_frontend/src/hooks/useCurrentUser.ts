import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import { getCurrentUser } from "../api/auth";

const useCurrentUser = () => {
  const { pathname } = useLocation();
  const { data, isLoading } = useQuery(["getCurrentUser", pathname], getCurrentUser);

  return { currentUser: data, isLoading };
};

export default useCurrentUser;
