import { FiArrowLeft } from "react-icons/fi";
import { Link, useLocation, useParams } from "react-router-dom";
import Image from "../../componants/PostDetails/Image/Image";
import PersonalInfo from "../../componants/PostDetails/PersonalInfo/PersonalInfo";
import PostDesc from "../../componants/PostDetails/PostDesc/PostDesc";
import PostComments from "../../componants/PostDetails/PostComments/PostComments";
import PostActions from "../../componants/PostDetails/PostActions/PostActions";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import LoadingSpinner from "../../componants/SharedComponants/LoadingSpinner/LoadingSpinner";
const PostDetails = () => {
  const { id } = useParams();
  const axiosPublic = useAxiosPublic();

  const {
    data: post = {},
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["post"],
    queryFn: async () => {
      const { data } = await axiosPublic(`/post/${id}`);
      return data;
    },
  });

  if (isLoading) return <LoadingSpinner />;

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
  } = post[0];
  return (
    <div className="container mx-auto px-3 py-6">
      <Link to={"/"} className="flex gap-2 items-center">
        <FiArrowLeft /> Back to Home
      </Link>
      {/* <Image /> */}
      <div className="my-12 md:flex gap-3">
        <PersonalInfo user={user} posted={posted} />
        <div className="flex-1 md:border-l border-gray-300 md:pl-6 mt-6 md:mt-0">
          <PostDesc
            selectedTags={selectedTags}
            post_title={post_title}
            post_description={post_description}
          />
          <div className="flex justify-between text-gray-500 text-sm my-6">
            <span className="underline">
              {" "}
              {upvotes?.length + downvotes?.length} Votes
            </span>
            <span className="underline"> {comments.length} Comments</span>
          </div>
          <PostActions refetchPost={refetch} />
          <PostComments refetchPost={refetch} />
        </div>
      </div>
    </div>
  );
};

export default PostDetails;
