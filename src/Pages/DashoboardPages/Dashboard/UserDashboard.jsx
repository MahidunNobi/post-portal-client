import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";

const UserDashboard = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data: userState = {}, isLoading } = useQuery({
    queryKey: ["userState"],
    queryFn: async () => {
      const { data } = await axiosSecure(`/user-state/${user?.email}`);
      return data;
    },
  });

  return (
    <div className="p-4">
      {/* ---Upper version----- */}

      <div className="stats stats-vertical lg:stats-horizontal shadow bg-transparent text-gray-700 w-full border border-gray-300">
        <div className="stat *:text-gray-600">
          <div className="stat-title">Total Posts</div>
          <div className="stat-value">{userState[0]?.totalPost}</div>
        </div>

        <div className="stat *:text-gray-600">
          <div className="stat-title">Total Votes</div>
          <div className="stat-value">{userState[0]?.totalVotes}</div>
        </div>

        <div className="stat *:text-gray-600">
          <div className="stat-title">Total Comments</div>
          <div className="stat-value">{userState[0]?.totalComment}</div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
