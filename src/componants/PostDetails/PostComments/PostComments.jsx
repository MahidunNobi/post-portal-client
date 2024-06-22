import { useQuery } from "@tanstack/react-query";
import Comment from "./Comment";
import CreateComment from "./CreateComment";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { useParams } from "react-router-dom";
import LoadingSpinner from "../../SharedComponants/LoadingSpinner/LoadingSpinner";

const PostComments = ({ refetchPost }) => {
  const { id } = useParams();
  const axiosPublic = useAxiosPublic();
  const {
    data: comments = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["comments"],
    queryFn: async () => {
      const { data } = await axiosPublic(`/comments/${id}`);
      return data;
    },
  });

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="my-6">
      <h3 className="text-3xl font-semibold font-roboto-title"> Comments</h3>
      <div>
        <CreateComment refetch={refetch} refetchPost={refetchPost} />
        {comments.map((comment) => (
          <Comment key={comment._id} comment={comment} />
        ))}
      </div>
    </div>
  );
};

export default PostComments;
