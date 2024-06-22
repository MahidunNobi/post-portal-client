import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../componants/SharedComponants/LoadingSpinner/LoadingSpinner";
import Swal from "sweetalert2";
import { useEffect, useRef, useState } from "react";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  const [users, setUsers] = useState([]);

  const [totalPostCount, setTotalPostcount] = useState(0);
  const [selectedPage, setSelectedPage] = useState(0);
  const itemsPerPage = 10;
  const numberOfPages = Math.ceil(totalPostCount / itemsPerPage);
  const pages = [...Array(numberOfPages).keys()];

  const [searchStr, setSearchStr] = useState("");

  const {
    data: queryUsers = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["users", selectedPage],
    queryFn: async () => {
      const { data } = await axiosSecure(
        `/users?page=${selectedPage}&itemsPerPage=${itemsPerPage}`
      );
      setUsers(data);
      return data;
    },
  });
  useEffect(() => {
    if (searchStr === "") refetch();
  }, [searchStr, refetch]);

  const handleRoleClick = async (user) => {
    const { data } = await axiosSecure.post("user-role", user);
    if (data.modifiedCount > 0) {
      Swal.fire({
        icon: "success",
        title: "Admin made successfully",
        showConfirmButton: false,
        timer: 1500,
      });
    }
    refetch();
  };

  const handleSearch = async () => {
    if (searchStr === "") return;
    const { data } = await axiosSecure(`/users/${searchStr}`);
    setUsers(data);
  };

  useEffect(() => {
    const fetchCount = async () => {
      const { data } = await axiosSecure(`/usersCount`);
      setTotalPostcount(data.count);
      // console.log(data);
    };
    fetchCount();
  }, []);

  if (isLoading) return <LoadingSpinner />;
  return (
    <div className="p-4">
      {/* Search functionality */}
      <div className="flex justify-end gap-3 my-6">
        <input
          type="text"
          placeholder="Username"
          value={searchStr}
          onChange={(e) => setSearchStr(e.target.value)}
          className="bg-transparent p-2 border max-w-xs rounded-lg text-gray-700 outline-none focus:border-2 border-primary-orange w-full"
        />
        <button
          className="btn bg-primary-orange border-none text-white"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>
      <div className="overflow-x-auto rounded-lg border border-gray-300">
        <table className="table">
          {/* head */}
          <thead className="bg-gray-200 text-gray-700">
            <tr className="border-gray-400">
              <th></th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>ROLE</th>
              <th>ACTION</th>
              <th>SUBSCRIPTION</th>
            </tr>
          </thead>
          <tbody className=" *:border-gray-300 *:text-gray-600">
            {/* row 1 */}
            {users.map((user, i) => (
              <tr className="" key={user._id}>
                <th>{i + 1}</th>
                <td>{user?.name ? user.name : "N/A"}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  <div className="">
                    {user.role === "user" && (
                      <button
                        onClick={() =>
                          handleRoleClick({ ...user, role: "admin" })
                        }
                        className="btn btn-outline text-nowrap btn-sm text-primary-orange border-primary-orange bg-white"
                      >
                        Make Admin
                      </button>
                    )}
                    {user.role === "admin" && (
                      <button
                        onClick={() =>
                          handleRoleClick({ ...user, role: "user" })
                        }
                        className="btn btn-outline text-nowrap btn-sm text-primary-orange border-primary-orange bg-white"
                      >
                        Make User
                      </button>
                    )}
                  </div>
                </td>
                <td> {user?.subscription ? user.subscription : "N/A"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="join w-full justify-center my-6">
        {pages.map((page, i) => (
          <button
            key={i}
            onClick={() => setSelectedPage(i)}
            className={`join-item btn ${selectedPage === i && "btn-active"}`}
          >
            {page + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ManageUsers;
