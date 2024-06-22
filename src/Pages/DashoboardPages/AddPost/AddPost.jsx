import { useQuery } from "@tanstack/react-query";
import Select from "react-select";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import LoadingSpinner from "../../../componants/SharedComponants/LoadingSpinner/LoadingSpinner";

const AddPost = () => {
  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedTagsError, setSelectedTagsError] = useState(false);
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const {
    data: tagsData = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["tags"],
    queryFn: async () => {
      const { data } = await axiosPublic("/tags");
      return data;
    },
  });

  const {
    data: postAble = {},
    isLoading: postAbleLoding,
    refetch: refetchPostAble,
  } = useQuery({
    queryKey: ["post-able"],
    queryFn: async () => {
      const { data } = await axiosSecure(`/post-ability/${user?.email}`);
      return data;
    },
  });

  const options = tagsData.map((tag) => {
    return { ...tag, value: tag.name, label: tag.name };
  });

  const colorStyles = {
    control: (styles) => ({
      ...styles,
      backgroundColor: "#d1d5db",
      paddingTop: "6px",
      paddingBottom: "6px",
      fontSize: "16px",
      lineHeight: "20px",
    }),
  };

  const onSubmit = async (data) => {
    setSelectedTagsError(false);
    if (selectedTags.length === 0) {
      return setSelectedTagsError(true);
    }
    const reqObj = { ...data, selectedTags };
    const res = await axiosSecure.post("/posts", reqObj);
    if (res.data.insertedId) {
      Swal.fire({
        icon: "success",
        title: "Post Added Successfully!",
        showConfirmButton: false,
        timer: 1500,
      });
      reset();
      setSelectedTags([]);
      refetch();
    }
  };

  const handleSelectChange = (selectedOptions) => {
    setSelectedTags(selectedOptions);
  };

  if (isLoading || postAbleLoding) return <LoadingSpinner />;

  if (postAble.status) {
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
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text text-gray-600 font-medium">
                    POST TITLE
                  </span>
                </div>
                <input
                  type="text"
                  {...register("post_title", { required: true })}
                  placeholder="e.g. Modi is the prime minister"
                  className="input  w-full max-w-sm bg-gray-300 text-gray-600"
                />
                {errors.post_title && (
                  <span className="text-red-600">This field is required</span>
                )}
              </label>
              {/* Tags */}
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text text-gray-600 font-medium">
                    TAGS
                  </span>
                </div>
                <Select
                  // defaultValue={[options[2]]}
                  isMulti
                  name="tags"
                  onChange={handleSelectChange}
                  options={options}
                  value={selectedTags}
                  styles={colorStyles}
                  className="basic-multi-select "
                  classNamePrefix="select"
                />
                {selectedTagsError && (
                  <span className="text-red-600">This field is required</span>
                )}
              </label>
              {/* Description */}
              <label className="form-control w-full md:col-span-2">
                <div className="label">
                  <span className="label-text text-gray-600 font-medium">
                    POST DESCRIPTION
                  </span>
                </div>
                <textarea
                  {...register("post_description")}
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
  }
  return (
    <div className="p-4 max-w-[550px] mx-auto flex flex-col items-center">
      <h3 className="text-center mb-3">
        You have accided the max number posts as a Bronze user. You need to
        purches the Gold subscription.
      </h3>
      <Link to={"/membership"}>
        <button className="btn bg-primary-orange border-none text-white">
          Become a Gold Member
        </button>
      </Link>
    </div>
  );
};

export default AddPost;
