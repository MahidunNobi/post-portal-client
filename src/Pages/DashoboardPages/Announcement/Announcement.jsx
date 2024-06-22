import { useForm } from "react-hook-form";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";

const Announcement = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const res = await axiosSecure.post("/announcements", data);
    if (res.data.insertedId) {
      Swal.fire({
        icon: "success",
        title: "Announcement created.",
        showConfirmButton: false,
        timer: 1500,
      });
      reset();
    }
  };

  return (
    <div className="p-4 max-w-[550px] mx-auto">
      <div className="bg-gray-200 p-3 rounded-md my-6 flex flex-col items-center gap-6">
        {/* -------Image section--------- */}
        <div className="avatar md:mr-6">
          <div className="w-24 rounded-full">
            <img
              src={
                user?.photoURL ||
                "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
              }
            />
          </div>
        </div>
        {/* ---------Profile details section-------- */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className=" grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
            {/* User name */}
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text text-gray-600 font-medium">
                  USER NAME
                </span>
              </div>
              <input
                type="text"
                {...register("user_name")}
                value={user?.displayName}
                readOnly
                placeholder="e.g. Mahidun"
                className="input  w-full max-w-sm bg-gray-300 text-gray-600"
              />
            </label>
            {/* User email */}
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text text-gray-600 font-medium">
                  USER EMAIL
                </span>
              </div>
              <input
                type="email"
                {...register("user_email")}
                value={user?.email}
                readOnly
                placeholder="e.g. ma@hidun.com"
                className="input w-full max-w-sm bg-gray-300 text-gray-600"
              />
            </label>
            {/* Title */}
            <label className="form-control w-full md:col-span-2">
              <div className="label">
                <span className="label-text text-gray-600 font-medium">
                  ANNOUNCEMENT TITLE
                </span>
              </div>
              <input
                type="text"
                {...register("announcement_title", { required: true })}
                placeholder="e.g. Modi is the prime minister"
                className="input  w-full bg-gray-300 text-gray-600"
              />
              {errors.post_title && (
                <span className="text-red-600">This field is required</span>
              )}
            </label>
            {/* Description */}
            <label className="form-control w-full md:col-span-2">
              <div className="label">
                <span className="label-text text-gray-600 font-medium">
                  ANNOUNCEMENT DESCRIPTION
                </span>
              </div>
              <textarea
                {...register("announcement_description")}
                className="textarea textarea-bordered bg-gray-300 text-gray-600"
                placeholder="Description...."
              ></textarea>
            </label>
          </div>
          <div className="flex justify-center">
            <input
              className="btn bg-primary-orange border-none text-white"
              type="submit"
              value="POST"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Announcement;
