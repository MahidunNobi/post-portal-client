import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useRole = () => {
  const { loading, user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: useRoleData = [], isLoading } = useQuery({
    queryKey: ["role", user],
    enabled: !loading && !!user?.email,
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/user/${user.email}`);
      return [data.role, data.subscription];
    },
  });
  return [isLoading, ...useRoleData];
};

export default useRole;
