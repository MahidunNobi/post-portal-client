import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { v4 as uuidv4 } from "uuid";
import Swal from "sweetalert2";

const AddSurvey = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [options, setOptions] = useState([]);

  const handleOptionInputChange = (e, id) => {
    const newOptions = options.map((op) =>
      op.id === id ? { ...op, name: e.target.value } : op
    );

    setOptions(newOptions);
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    if (options.length < 2) {
      return Swal.fire({
        icon: "error",
        title: "Two Options Required",
        text: "Please pass at least 2 to a survey.",
        showConfirmButton: false,
        timer: 1500,
      });
    }
    const reqObj = {
      ...data,
      options,
    };
    // console.log(reqObj);

    const res = await axiosSecure.post("/survey", reqObj);
    if (res.data.success) {
      Swal.fire({
        icon: "success",
        title: "Survey created.",
        showConfirmButton: false,
        timer: 1500,
      });
      reset();
      setOptions([]);
    }
  };

  return (
    <div className="p-4 max-w-[550px] mx-auto">
      <div className="bg-gray-200 p-3 rounded-md my-6 flex flex-col items-center gap-6">
        {/* ------- Title section--------- */}
        <div>
          <h2 className="text-3xl  mt-6 font-bold">Run New Survey</h2>
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
                  SURVEY TITLE
                </span>
              </div>
              <input
                type="text"
                {...register("survey_title", { required: true })}
                placeholder="e.g. Post Interest Survey"
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
                  SURVEY DESCRIPTION
                </span>
              </div>
              <textarea
                {...register("survey_description")}
                className="textarea textarea-bordered bg-gray-300 text-gray-600"
                placeholder="Description...."
              ></textarea>
            </label>
            {/* Survey Options */}
            <label className="form-control w-full md:col-span-2">
              <div className="label">
                <span className="label-text text-gray-600 font-medium">
                  SURVEY OPTIONS
                </span>
              </div>
              <div className=" space-y-3">
                {options.map((op) => (
                  <div
                    key={op.id}
                    className="border-2 flex  justify-between gap-6"
                  >
                    <input
                      type="text"
                      className="input w-full bg-gray-300 text-gray-600"
                      value={op.name}
                      onChange={(e) => handleOptionInputChange(e, op.id)}
                    />
                    <button
                      onClick={() =>
                        setOptions(options.filter((opt) => opt.id !== op.id))
                      }
                    >
                      <RiDeleteBin6Line size={18} />
                    </button>
                  </div>
                ))}

                <button
                  className="btn btn-outline border-primary-orange text-primary-orange border-2 w-full text-center"
                  onClick={(e) => {
                    e.preventDefault();
                    setOptions([
                      ...options,
                      {
                        id: uuidv4(),
                        name: "",
                      },
                    ]);
                  }}
                >
                  Add Option
                </button>
              </div>
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

export default AddSurvey;
