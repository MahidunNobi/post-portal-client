import { Helmet } from "react-helmet";
import Banner from "../../componants/Home/Banner/Banner";
import TagsSection from "../../componants/Home/TagsSection/TagsSection";
import Announcement from "../../componants/Home/Announcement/Announcement";
import Posts from "../../componants/Home/Posts/Posts";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLoaderData } from "react-router-dom";

const Home = () => {
  const axiosPublic = useAxiosPublic();
  const [posts, setPosts] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedPage, setSelectedPage] = useState(0);
  const { count } = useLoaderData();
  const itemsPerPage = 5;
  const numberOfPages = Math.ceil(count / itemsPerPage);
  const pages = [...Array(numberOfPages).keys()];

  const [sortPopularity, setSortPopularity] = useState(false);

  const { data, refetch, isLoading } = useQuery({
    queryKey: ["posts", selectedPage, sortPopularity],
    queryFn: async () => {
      const { data } = await axiosPublic(
        `/posts?page=${selectedPage}&itemsPerPage=${itemsPerPage}&sortByPopularity=${sortPopularity}`
      );
      setPosts(data);
      return data;
    },
  });

  const handleSortByPopularity = async () => {
    setSortPopularity(true);
  };

  console.log(posts);

  const handleSearch = async () => {
    const tagIds = selectedTags.map((tag) => tag._id);
    const res = await axiosPublic(
      `/posts?tags=${tagIds.join(
        ","
      )}&page=${selectedPage}&itemsPerPage=${itemsPerPage}`
    );
    setPosts(res.data);
    scroll(0, 1400);
  };

  return (
    <div>
      <Helmet>
        <title>Home</title>
      </Helmet>
      <Banner
        selectedTags={selectedTags}
        setSelectedTags={setSelectedTags}
        handleSearch={handleSearch}
        refetchInitialPosts={refetch}
      />
      <TagsSection />
      <Announcement />
      <Posts
        posts={posts}
        handleSortByPopularity={handleSortByPopularity}
        pages={pages}
        selectedPage={selectedPage}
        setSelectedPage={setSelectedPage}
      />
    </div>
  );
};

export default Home;
