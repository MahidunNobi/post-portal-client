import { BiSolidUpvote, BiSolidDownvote } from "react-icons/bi";
import { FaShare } from "react-icons/fa6";
import { useParams } from "react-router-dom";
import {
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  RedditIcon,
  RedditShareButton,
  TwitterIcon,
  TwitterShareButton,
} from "react-share";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";

const PostActions = ({ refetchPost }) => {
  const shareUrl = window.location.href;
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const handleUpvote = async () => {
    const reqObj = {
      user_email: user?.email,
      vote_type: "upvote",
    };
    const { data } = await axiosSecure.post(`/votes/${id}`, reqObj);
    refetchPost();
  };

  const handleDownVote = async () => {
    const reqObj = {
      user_email: user?.email,
      vote_type: "downvote",
    };
    const { data } = await axiosSecure.post(`/votes/${id}`, reqObj);
    refetchPost();
  };

  return (
    <div className="border-y border-gray-300 flex">
      <button
        onClick={handleUpvote}
        className="btn btn-outline border-none flex-1 rounded-none"
      >
        <BiSolidUpvote size={20} />
      </button>
      <div className="border-x border-gray-300 flex-1">
        <button
          onClick={handleDownVote}
          className="btn w-full btn-outline border-none rounded-none"
        >
          <BiSolidDownvote size={20} />
        </button>
      </div>
      <button
        className="btn btn-outline border-none rounded-none flex-1"
        onClick={() => document.getElementById("my_modal_1").showModal()}
      >
        <FaShare size={20} />
      </button>
      <dialog id="my_modal_1" className="modal ">
        <div className="modal-box bg-white">
          <h3 className="font-bold text-lg">Share post</h3>
          <div className="flex justify-center gap-3">
            <FacebookShareButton
              url={shareUrl}
              className="Demo__some-network__share-button"
            >
              <FacebookIcon size={36} round />
            </FacebookShareButton>

            <TwitterShareButton
              url={shareUrl}
              className="Demo__some-network__share-button"
            >
              <TwitterIcon size={36} round />
            </TwitterShareButton>
            <LinkedinShareButton
              url={shareUrl}
              className="Demo__some-network__share-button"
            >
              <LinkedinIcon size={32} round />
            </LinkedinShareButton>
            <RedditShareButton
              url={shareUrl}
              // title={title}
              // windowWidth={660}
              // windowHeight={460}
              className="Demo__some-network__share-button"
            >
              <RedditIcon size={32} round />
            </RedditShareButton>
          </div>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default PostActions;
