import { useQuery } from "@tanstack/react-query";
import BronzeBadgeImg from "../../../assets/BronzeBadge.png";
import GoldBadgeImg from "../../../assets/GoldBadge.png";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../componants/SharedComponants/LoadingSpinner/LoadingSpinner";
import { BsSignpostSplitFill } from "react-icons/bs";
import { FaRegCommentAlt, FaRegUser } from "react-icons/fa";
import AdminPieChats from "./AdminPieChats";
import Swal from "sweetalert2";

const AdminProfile = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data: userData = {}, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const { data } = await axiosSecure(`/user/${user?.email}`);
      return data;
    },
  });

  const { data: state = {}, isLoading: stateIsLoaing } = useQuery({
    queryKey: ["admin-state"],
    queryFn: async () => {
      const { data } = await axiosSecure(`/admin-state/${user?.email}`);
      return data;
    },
  });

  const handleAddTag = async (e) => {
    e.preventDefault();
    const form = e.target;
    const tag = form.tag.value;
    const tag_icon_url = form.tag_icon_url.value;
    const { data } = await axiosSecure.post("/tags", { tag, tag_icon_url });
    console.log(data);
    if (data.insertedId) {
      Swal.fire({
        icon: "success",
        title: "Tag created.",
        showConfirmButton: false,
        timer: 1500,
      });
      form.reset();
    }
  };

  if (isLoading || stateIsLoaing) return <LoadingSpinner />;

  return (
    <div className="p-4">
      <h1 className="font-roboto-title text-4xl">Hi, Admin. Wellcome Back.</h1>
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
              value={userData?.email}
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
            <div className="w-[150px] h-[120px] bg-white shadow-md shadow-gray-500 border border-gray-300 p-3 rounded-lg">
              <img
                src={GoldBadgeImg}
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* --------Stats------- */}
      <div className="my-6">
        <h1 className="font-roboto-title text-3xl">Stats</h1>
        <div className="md:flex md:justify-between">
          {/*------- Written states------- */}
          <div className="stats md:w-1/3 stats-vertical shadow bg-transparent text-gray-700 w-full border border-gray-300">
            <div className="stat *:text-gray-600">
              <div className="stat-figure text-">
                <BsSignpostSplitFill
                  size={24}
                  className="text-primary-orange"
                />
              </div>
              <div className="stat-title font-medium text-primary-orange">
                Total Posts
              </div>
              <div className="stat-value">{state?.totalPosts}</div>
            </div>

            <div className="stat *:text-gray-600 md:border-x border-gray-300">
              <div className="stat-figure text-">
                <FaRegCommentAlt size={24} className="text-primary-orange" />
              </div>
              <div className="stat-title font-medium text-primary-orange">
                Total Comments
              </div>
              <div className="stat-value">{state?.totalComments}</div>
            </div>

            <div className="stat *:text-gray-600 p-2 md:border-x border-gray-300">
              <div className="stat-figure text-">
                <FaRegUser size={24} className="text-primary-orange" />
              </div>
              <div className="stat-title">Total Users</div>
              <div className="stat-value">{state?.totalUsers}</div>
            </div>
          </div>
          {/* -------Chart States------- */}
          <div className="md:flex-1 flex justify-center">
            <AdminPieChats state={state} />
          </div>
        </div>
      </div>
      {/* ----Add tag----- */}
      <div className="max-w-[300px] mx-auto">
        <h1 className="font-roboto-title text-3xl">Add New Tag</h1>
        <form onSubmit={handleAddTag} className="flex flex-col gap-3 my-6">
          <input
            type="text"
            placeholder="Tag"
            name="tag"
            className="bg-transparent p-2 border max-w-xs rounded-lg text-gray-700 outline-none focus:border-2 border-primary-orange w-full"
          />
          <input
            type="text"
            placeholder="Tag Icon Url"
            name="tag_icon_url"
            className="bg-transparent p-2 border max-w-xs rounded-lg text-gray-700 outline-none focus:border-2 border-primary-orange w-full"
          />
          <button
            className="btn bg-primary-orange border-none text-white"
            type="submit"
          >
            ADD
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminProfile;
