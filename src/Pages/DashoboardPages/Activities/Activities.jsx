import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import CommentModel from "../../../componants/Models/CommentModel";
import Swal from "sweetalert2";
import LoadingSpinner from "../../../componants/SharedComponants/LoadingSpinner/LoadingSpinner";

const Activities = () => {
  const axiosSecure = useAxiosSecure();
  const [commentText, setCommentText] = useState("");
  const [totalPostCount, setTotalPostcount] = useState(0);
  const [selectedPage, setSelectedPage] = useState(0);
  const itemsPerPage = 10;
  const numberOfPages = Math.ceil(totalPostCount / itemsPerPage);
  const pages = [...Array(numberOfPages).keys()];

  const {
    data: comments = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["reported-comments", selectedPage],
    queryFn: async () => {
      const { data } = await axiosSecure(
        `/reported-comments?page=${selectedPage}&itemsPerPage=${itemsPerPage}`
      );
      return data;
    },
  });

  const handleReadMore = (comment) => {
    setCommentText(comment?.comment);
    document.getElementById("my_modal_2").showModal();
  };

  const handleCommentDelete = async (comment) => {
    const { data } = await axiosSecure.delete(`/comments/${comment._id}`);
    console.log(data);
    if (data.deletedCount) {
      Swal.fire({
        icon: "success",
        title: "Comment deleted.",
        showConfirmButton: false,
        timer: 1500,
      });
      refetch();
    }
  };

  const handleCommentRestore = async (comment) => {
    const { data } = await axiosSecure.get(`/comments-restore/${comment._id}`);
    if (data.modifiedCount) {
      Swal.fire({
        icon: "success",
        title: "Comment Restored.",
        showConfirmButton: false,
        timer: 1500,
      });
      refetch();
    }
  };
  useEffect(() => {
    const fetchCount = async () => {
      const { data } = await axiosSecure(`/reported-commentsCount`);
      setTotalPostcount(data.count);
      // console.log(data);
    };
    fetchCount();
  }, []);

  console.log(selectedPage);

  if (isLoading) return <LoadingSpinner />;
  return (
    <div className="p-4">
      <div className="overflow-x-auto rounded-lg border border-gray-300">
        <table className="table">
          {/* head */}
          <thead className="bg-gray-200 text-gray-700">
            <tr className="border-gray-400">
              <th></th>
              <th>Comment</th>
              <th>Feedback</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody className=" *:border-gray-300 *:text-gray-600">
            {/* row 1 */}
            {comments.map((comment, i) => (
              <tr key={comment._id}>
                <th>{i + 1}</th>
                <td>
                  {comment?.comment?.length > 20 ? (
                    <span>
                      {comment?.comment?.slice(0, 20)}...
                      <button
                        onClick={() => handleReadMore(comment)}
                        className="text-blue-500"
                      >
                        Read more
                      </button>
                    </span>
                  ) : (
                    comment?.comment
                  )}
                </td>
                <td>{comment.feedback}</td>
                <td className="flex gap-3">
                  <button
                    onClick={() => handleCommentRestore(comment)}
                    className="btn btn-outline border-primary-orange text-primary-orange"
                  >
                    Restore
                  </button>
                  <button
                    className="btn btn-outline btn-error"
                    // disabled={feedback === ""}
                    onClick={() => handleCommentDelete(comment)}
                  >
                    Delete
                  </button>
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
      <CommentModel text={commentText} />
    </div>
  );
};

export default Activities;
