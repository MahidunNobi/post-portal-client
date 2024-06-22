import { FaMessage } from "react-icons/fa6";
import { ImBin } from "react-icons/im";
import { Link } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import LoadingSpinner from "../../../componants/SharedComponants/LoadingSpinner/LoadingSpinner";
import { useEffect, useState } from "react";

const MyPosts = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [totalPostCount, setTotalPostcount] = useState(0);
  const [selectedPage, setSelectedPage] = useState(0);
  const itemsPerPage = 10;
  const numberOfPages = Math.ceil(totalPostCount / itemsPerPage);
  const pages = [...Array(numberOfPages).keys()];

  const { data: posts = [], isLoading } = useQuery({
    queryKey: ["userPosts", selectedPage],
    queryFn: async () => {
      const { data } = await axiosSecure(
        `/posts/${user?.email}?page=${selectedPage}&itemsPerPage=${itemsPerPage}`
      );
      return data;
    },
  });

  useEffect(() => {
    const fetchCount = async () => {
      const { data } = await axiosSecure(`/postsCount/${user?.email}`);
      setTotalPostcount(data.count);
      console.log(data);
    };
    fetchCount();
  }, []);

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="p-4">
      <div className="overflow-x-auto rounded-lg border border-gray-300">
        <table className="table">
          {/* head */}
          <thead className="bg-gray-200 text-gray-700">
            <tr className="border-gray-400">
              <th></th>
              <th>POST TITLE</th>
              <th>NUMBER OF VOTES</th>
              <th>ACTION</th>
            </tr>
          </thead>
          <tbody className=" *:border-gray-300 *:text-gray-600">
            {/* row 1 */}
            {posts.map((post, i) => (
              <tr key={post._id} className="">
                <th>{i + 1}</th>
                <td>{post?.post_title}</td>
                <td>{post?.upvotes.length + post?.upvotes.length}</td>
                <td>
                  <div className="flex gap-3">
                    <Link to={`/dashboard/comments/${post._id}`}>
                      <button className="btn btn-circle btn-outline btn-sm text-primary-orange border-primary-orange bg-white">
                        <FaMessage size={18} />
                      </button>
                    </Link>
                    <button className="btn btn-error btn-circle btn-outline btn-sm">
                      <ImBin size={18} />
                    </button>
                  </div>
                </td>
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

export default MyPosts;
