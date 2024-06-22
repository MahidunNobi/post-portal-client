import { FaMessage } from "react-icons/fa6";
import { ImBin } from "react-icons/im";
import { Link, useParams } from "react-router-dom";
import CommentModel from "../../../componants/Models/CommentModel";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../componants/SharedComponants/LoadingSpinner/LoadingSpinner";
import { useEffect, useState } from "react";
import CommentRow from "./CommentRow";

const PostComments = () => {
  const [commentText, setCommentText] = useState("");
  const { postId } = useParams();
  const axiosSecure = useAxiosSecure();

  const [totalPostCount, setTotalPostcount] = useState(0);
  const [selectedPage, setSelectedPage] = useState(0);
  const itemsPerPage = 10;
  const numberOfPages = Math.ceil(totalPostCount / itemsPerPage);
  const pages = [...Array(numberOfPages).keys()];

  const {
    data: postComments = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["postsComments", selectedPage],
    queryFn: async () => {
      const { data } = await axiosSecure(
        `/post-comments/${postId}?page=${selectedPage}&itemsPerPage=${itemsPerPage}`
      );
      return data;
    },
  });

  const handleReadMore = (comment) => {
    setCommentText(comment?.comment);
    document.getElementById("my_modal_2").showModal();
  };

  useEffect(() => {
    const fetchCount = async () => {
      const { data } = await axiosSecure(`/postsCommentsCount/${postId}`);
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
              <th>USER EMAIL</th>
              <th>COMMENT</th>
              <th>ACTION</th>
            </tr>
          </thead>
          <tbody className=" *:border-gray-300 *:text-gray-600">
            {/* row 1 */}
            {postComments.map((comment, i) => (
              <CommentRow
                key={comment._id}
                comment={comment}
                i={i}
                handleReadMore={handleReadMore}
                refetch={refetch}
              />
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

      <CommentModel text={commentText} />
    </div>
  );
};

export default PostComments;
