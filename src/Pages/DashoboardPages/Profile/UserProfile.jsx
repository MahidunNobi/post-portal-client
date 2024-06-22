import { useQuery } from "@tanstack/react-query";
import BronzeBadgeImg from "../../../assets/BronzeBadge.png";
import GoldBadgeImg from "../../../assets/GoldBadge.png";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../componants/SharedComponants/LoadingSpinner/LoadingSpinner";
import Post from "../../../componants/SharedComponants/Post/Post";

const UserProfile = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data: userData = {}, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const { data } = await axiosSecure(`/user/${user?.email}`);
      return data;
    },
  });

  const { data: posts = [], isLoading: PostIsLoading } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const { data } = await axiosSecure("/posts?page=0&itemsPerPage=5");
      return data;
    },
  });

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="p-4">
      <h1 className="font-roboto-title text-4xl">Hi, User. Wellcome Back.</h1>
      {/* ---------Profile section-------- */}
      <div className="bg-gray-200 p-3 rounded-md my-6 flex flex-col md:flex-row gap-6">
        {/* -------Image section--------- */}
        <div className="avatar md:mr-6">
          <div className="w-56 rounded-full">
            <img
              src={
                userData?.photoURL ||
                "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
              }
            />
          </div>
        </div>
        {/* ---------Profile details section-------- */}
        <form className=" space-y-3">
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text text-gray-600 font-medium">
                USER NAME
              </span>
            </div>
            <input
              type="text"
              placeholder="e.g. Mahidun"
              value={userData?.name}
              readOnly
              className="input  w-full max-w-sm bg-gray-300 text-gray-600"
            />
          </label>
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text text-gray-600 font-medium">
                USER EMAIL
              </span>
            </div>
            <input
              type="email"
              placeholder="e.g. ma@hidun.com"
              value={user?.email}
              readOnly
              className="input  w-full max-w-sm bg-gray-300 text-gray-600"
            />
          </label>

          {/* <button className="btn">Submit</button> */}
        </form>
        {/* --------Badges------ */}
        <div>
          <h4 className="text-roboto-title text-xl font-semibold">
            YOUR BADGES
          </h4>
          <div className="flex gap-3">
            <div className="w-[150px] h-[120px] bg-white shadow-md shadow-gray-500 border border-gray-300 p-3 rounded-lg">
              <img
                src={BronzeBadgeImg}
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
            {userData.subscription === "Gold" && (
              <div className="w-[150px] h-[120px] bg-white shadow-md shadow-gray-500 border border-gray-300 p-3 rounded-lg">
                <img
                  src={GoldBadgeImg}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* --------Latest posts------- */}
      <div>
        <h1 className="font-roboto-title text-3xl">Latest posts</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {posts.slice(0, 3).map((post) => (
            <Post key={post._id} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
