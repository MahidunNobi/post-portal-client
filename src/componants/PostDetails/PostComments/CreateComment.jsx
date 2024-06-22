import React, { useRef } from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import {
  Navigate,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import Swal from "sweetalert2";
import LoadingSpinner from "../../SharedComponants/LoadingSpinner/LoadingSpinner";

const CreateComment = ({ refetch, refetchPost }) => {
  const { id } = useParams();
  const { user } = useAuth();
  const commentRef = useRef();
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const location = useLocation();
  const navigate = useNavigate();

  const { data: post = {}, isLoading } = useQuery({
    queryKey: ["post"],
    queryFn: async () => {
      const { data } = await axiosPublic(`/post/${id}`);
      return data;
    },
  });

  const handleCommentClick = async () => {
    if (!user) return navigate("/login");
    const comment = commentRef.current.value;
    const reqObj = {
      post_id: post[0]._id,
      comment,
      user_email: user.email,
    };
    const { data } = await axiosSecure.post("/comments", reqObj);
    if (data.insertedId) {
      Swal.fire({
        icon: "success",
        title: "Comment successfull.",
        showCancelButton: false,
        timer: 1500,
      });
      commentRef.current.value = "";
      refetch();
      refetchPost();
    }
  };
  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="border border-gray-300 rounded-lg p-3 my-3 space-y-3">
      {/*------- Author ----------*/}
      <div className="flex items-center gap-3">
        <div className="avatar">
          <div className="w-10 rounded-full">
            <img
              src={
                user?.photoURL ||
                "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
              }
            />
          </div>
        </div>
        <div>
          <h6 className="font-medium"> {user?.displayName} </h6>
        </div>
      </div>
      <textarea
        className="textarea textarea-bordered bg-transparent  w-full"
        placeholder="Comment here."
        ref={commentRef}
      ></textarea>
      <div className="flex justify-end">
        <button
          onClick={handleCommentClick}
          className="btn bg-primary-orange border-none text-white"
        >
          Comment
        </button>
      </div>
    </div>
  );
};

export default CreateComment;
