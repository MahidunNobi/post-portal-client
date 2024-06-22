import { useForm } from "react-hook-form";
import Logo from "../../componants/SharedComponants/Logo/Logo";
import { Link, useNavigate } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { updateProfile } from "firebase/auth";
import auth from "../../firebase/firebase.config";
import Swal from "sweetalert2";
import { FcGoogle } from "react-icons/fc";
import { imageUpload } from "../../utils";

const imgbb_key = import.meta.env.VITE_IMGBB_API;
const imgbb_url = `https://api.imgbb.com/1/upload?key=${imgbb_key}`;

const Register = () => {
  const axiosPublic = useAxiosPublic();
  const { createAccount, updateAccount, googleLogin, setLoading } =
    useContext(AuthContext);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const displayName = data.displayName;
    const email = data.email;
    const password = data.password;
    const ImageFile = data.image[0];

    try {
      setLoading(true);
      // 1. Upload the image and get the image url.
      const image_url = await imageUpload(ImageFile);
      console.log(image_url);
      // 2. Create an account with email and password & update the name and photo.
      const res = await createAccount(email, password);
      await updateAccount(displayName, image_url);
      // 3. Create entry to the database with role.
      const userInfo = {
        email: res.user.email,
        name: displayName,
        role: "user",
        photoURL: image_url,
      };
      const { data: userData } = await axiosPublic.post("/users", userInfo);
      if (userData.insertedId) {
        Swal.fire({
          // position: "top-end",
          icon: "success",
          title: "User created successfully.",
          showConfirmButton: false,
          timer: 1500,
        });
      }
      reset();
      navigate("/");
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: error.message,
        icon: "error",
      });
    }
  };

  const handleGoogleClick = async () => {
    try {
      const res = await googleLogin();
      const userInfo = {
        email: res.user.email,
        name: res.user.displayName,
        role: "user",
        photoURL: res.user.photoURL,
      };
      await axiosPublic.post("/users", userInfo);
      Swal.fire({
        // position: "top-end",
        icon: "success",
        title: "Login successfull!",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/");
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: error.message,
        icon: "error",
      });
    }
  };
  return (
    <div className="bg-white min-w-[100vw] md:min-w-[98.5vw] min-h-screen flex justify-center items-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-gray-100 px-6 py-12 my-6 rounded-lg flex flex-col border border-primary-orange space-y-4 md:w-[450px]"
      >
        <div className="h-8 flex justify-center">
          <Logo />
        </div>

        <h5 className="text-xl text-center text-gray-600 font-semibold">
          Register
        </h5>

        <span
          onClick={handleGoogleClick}
          className="cursor-pointer px-2 py-1 border border-gray-400 rounded-md flex items-center gap-3 justify-center text-gray-600"
        >
          <FcGoogle />
          Log in with Google
        </span>

        {/* ------ User Name ------- */}
        <div>
          <span className="label-text p-2">User Name</span>
          <br />
          <input
            placeholder="MD. Abcd"
            type="text"
            {...register("displayName", { required: true })}
            className="bg-transparent p-2 border rounded-lg text-gray-700 outline-none focus:border-2 border-primary-orange w-full"
          />
          {errors.displayName && (
            <span className="text-red-600">Username is required</span>
          )}
        </div>
        {/* --------Email--------- */}
        <div>
          <span className="label-text p-2">EMAIL</span>
          <br />
          <input
            placeholder="abc@mail.com"
            type="email"
            {...register("email", { required: true })}
            className="bg-transparent p-2 border rounded-lg text-gray-700 outline-none focus:border-2 border-primary-orange w-full"
          />
          {errors.email && (
            <span className="text-red-600">Email is required</span>
          )}
        </div>
        {/* ---------Password------- */}
        <div>
          <span className="label-text p-2">PASSWORD</span>
          <br />
          <input
            placeholder="*******"
            type="password"
            {...register("password", {
              required: true,
              minLength: 6,
              pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/,
            })}
            className="bg-transparent p-2 border rounded-lg text-gray-700 outline-none focus:border-2 border-primary-orange w-full"
          />
          {errors.password?.type === "required" && (
            <span className="text-red-600">Password is required</span>
          )}
          {errors.password?.type === "minLength" && (
            <span className="text-red-600">
              Password should be at least 6 character
            </span>
          )}
          {errors.password?.type === "pattern" && (
            <span className="text-red-600">
              Password should be at least one uppercase, one lowercase, one
              number and one special character.
            </span>
          )}
        </div>
        {/* ------Profile Picture------ */}
        <div className="form-control w-full my-6">
          <input
            {...register("image", { required: true })}
            type="file"
            className=" file-input bg-transparent p-2 border rounded-lg text-gray-700 outline-none focus:border-2 border-primary-orange w-full"
          />
          {errors.image && (
            <span className="text-red-600"> Profile pictuer is required</span>
          )}
        </div>

        <p>
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600">
            Login
          </Link>
        </p>
        <input
          type="submit"
          className="btn bg-primary-orange border-none text-white"
          value="Register"
        />
        {/* <button
      type="submit"
      
    >
      Login
    </button> */}
      </form>
    </div>
  );
};

export default Register;
