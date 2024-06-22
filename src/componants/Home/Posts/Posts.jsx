import { useQuery } from "@tanstack/react-query";
import Desc from "../../SharedComponants/Desc/Desc";
import Post from "../../SharedComponants/Post/Post";
import Title from "../../SharedComponants/Title/Title";

const Posts = ({
  posts,
  handleSortByPopularity,
  pages,
  selectedPage,
  setSelectedPage,
}) => {
  return (
    <div className="container mx-auto px-3 my-12">
      <Title normal={"Trending"} colored={"Posts"} />
      <Desc
        desc={
          "Discover what's trending in our community. Check out the most popular posts and join the conversation on hot topics."
        }
      />
      {/* Sort by popularity */}
      <div className="flex justify-end max-w-[650px] mx-auto">
        <button
          onClick={handleSortByPopularity}
          className="btn bg-primary-orange border-none text-white"
        >
          Sort By Popularity
        </button>
      </div>

      <div>
        {posts.map((post) => (
          <Post key={post._id} post={post} />
        ))}
      </div>
      {/* ----Pagination---- */}
      <div className="join w-full justify-center">
        {pages.map((page, i) => (
          <button
            key={i}
            onClick={() => setSelectedPage(i)}
            className={`join-item btn ${selectedPage === i && "btn-active"}`}
          >
            {page + 1}
          </button>
        ))}
        {/* <button className="join-item btn btn-active">2</button> */}
      </div>
    </div>
  );
};

export default Posts;
