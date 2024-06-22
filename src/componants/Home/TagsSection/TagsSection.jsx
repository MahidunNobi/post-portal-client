import Tag from "./Tag/Tag";
import Title from "../../SharedComponants/Title/Title";
import Desc from "../../SharedComponants/Desc/Desc";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import LoadingSpinner from "../../SharedComponants/LoadingSpinner/LoadingSpinner";

const Tags = () => {
  const axiosPublic = useAxiosPublic();

  const { data: tags = [], isLoading } = useQuery({
    queryKey: ["tags"],
    queryFn: async () => {
      const { data } = await axiosPublic("/tags");
      return data;
    },
  });

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="container mx-auto px-3 my-12">
      <Title normal={"Explore"} colored={"Tags"} />
      <Desc desc="Easily find posts that interest you by browsing our tag directory. Choose a tag to view all associated posts and explore new content." />
      <div className=" flex justify-center items-center flex-wrap gap-4">
        {tags.tagsData
          ? tags.tagsData.map((tag) => <Tag key={tag._id} tag={tag} />)
          : tags.map((tag) => <Tag key={tag._id} tag={tag} />)}
      </div>
    </div>
  );
};

export default Tags;
