import { Link } from "react-router-dom";
import { timeElapsed } from "../../../utils";

const Post = ({ post }) => {
  const {
    _id,
    user,
    post_title,
    post_description,
    upvotes,
    downvotes,
    comments,
    posted,
    selectedTags,
  } = post;
  return (
    <Link to={`/post/${_id}`}>
      <div className="p-3 space-y-3 max-w-[650px] mx-auto border border-gray-200 rounded-lg overflow-hidden my-3">
        {/* -----Tags----- */}
        <div className=" flex gap-2">
          {selectedTags.map((tag) => (
            <span
              key={tag._id}
              className="text-sm text-white bg-gray-400 px-4 py-1 rounded-md"
            >
              {tag.name}
            </span>
          ))}
        </div>
        {/* PersonalInfo */}
        <div className="flex items-center gap-3">
          <div className="avatar">
            <div className="w-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <img
                src={
                  user?.photoURL ||
                  "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                }
              />
            </div>
          </div>
          <div>
            <h6 className="font-semibold"> {user?.name} </h6>
            <span className="text-sm text-gray-400">{timeElapsed(posted)}</span>
          </div>
        </div>
        <h2 className="text-4xl font-roboto-title font-semibold">
          {post_title}
        </h2>
        <div className="flex justify-between text-gray-500 text-sm">
          <span className="underline">
            {" "}
            {upvotes?.length + downvotes?.length} Votes
          </span>
          <span className="underline"> {comments.length} Comments</span>
        </div>
      </div>
    </Link>
  );
};

export default Post;
