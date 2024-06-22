import React, { useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";

const CommentRow = ({ comment, i, handleReadMore, refetch }) => {
  const [feedback, setFeedBack] = useState("");
  const axiosSecure = useAxiosSecure();

  const handleReport = async () => {
    Swal.fire({
      title: "Are you sure?",
      text: "The comment will be hidden. You won't be able to revert this before the admin does.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, report it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const reqObj = {
          reported: true,
          feedback,
        };
        const { data } = await axiosSecure.post(
          `/report/${comment._id}`,
          reqObj
        );
        if (data.modifiedCount > 0) {
          refetch();
          Swal.fire({
            title: "Reported!",
            text: "Comment has been reported.",
            icon: "success",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      }
    });
  };

  return (
    <tr className="">
      <th>{i + 1}</th>
      <td>{comment?.user_email}</td>
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
      <td>
        <div className="flex items-center gap-3">
          {comment.reported ? (
            <span className="px-4 py-2 border-2 border-red-600 text-red-600 font-semibold cursor-not-allowed rounded-lg btn-error">
              Reported
            </span>
          ) : (
            <>
              <select
                className="select select-bordered bg-gray-300"
                value={feedback}
                onChange={(e) => setFeedBack(e.target.value)}
              >
                <option disabled value="">
                  Feedback
                </option>
                <option value="Inappropriate Comment">
                  Inappropriate Comment
                </option>
                <option value="Spam or Misleading">Spam or Misleading</option>
                <option value="Harmful or Dangerous">
                  Harmful or Dangerous
                </option>
              </select>
              <button
                className="btn btn-outline btn-error"
                disabled={feedback === ""}
                onClick={handleReport}
              >
                Report
              </button>
            </>
          )}
        </div>
      </td>
    </tr>
  );
};

export default CommentRow;
