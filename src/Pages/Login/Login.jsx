import { useForm } from "react-hook-form";
import Logo from "../../componants/SharedComponants/Logo/Logo";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import Swal from "sweetalert2";
import { FcGoogle } from "react-icons/fc";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const Login = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const axiosPublic = useAxiosPublic();
  const { login, googleLogin } = useContext(AuthContext);
  const navigate = useNavigate();

  const onSubmit = (data) => {
    login(data.email, data.password)
      .then((res) => {
        const loggedInUser = res.user;
        Swal.fire({
          // position: "top-end",
          icon: "success",
          title: "Login successfull!",
          showConfirmButton: false,
          timer: 1500,
        });
        reset();
        navigate("/");
      })
      .catch((err) => {
        Swal.fire({
          title: err.message,
          icon: "error",
        });
        console.log(err);
      });
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
        className="bg-gray-100 px-6 py-12 rounded-lg flex flex-col border border-primary-orange space-y-4 md:min-w-[350px]"
      >
        <div className="h-8 flex justify-center">
          <Logo />
        </div>
        <h5 className="text-xl text-center text-gray-600 font-semibold">
          Login
        </h5>

        <span
          onClick={handleGoogleClick}
          className="cursor-pointer px-2 py-1 border border-gray-400 rounded-md flex items-center gap-3 justify-center text-gray-600"
        >
          <FcGoogle />
          Log in with Google
        </span>
        {/* register your input into the hook by invoking the "register" function */}
        <div>
          <span className="label-text p-2">EMAIL</span>
          <br />
          <input
            placeholder="abc@mail.com"
            type="email"
            {...register("email", { required: true })}
            className="bg-transparent p-2 border rounded-lg text-gray-700 outline-none focus:border-2 border-primary-orange w-full"
          />
        </div>
        <div>
          <span className="label-text p-2">PASSWORD</span>
          <br />
          <input
            placeholder="*******"
            type="password"
            {...register("password", { required: true })}
            className="bg-transparent p-2 border rounded-lg text-gray-700 outline-none focus:border-2 border-primary-orange w-full"
          />
        </div>

        {/* errors will return when field validation fails  */}
        {errors.email && (
          <span className="text-red-600">Email is required</span>
        )}
        {errors.password && (
          <span className="text-red-600">Password is required</span>
        )}

        <p>
          Don&apos;t have an account?{" "}
          <Link to="/register" className="text-blue-600">
            Register
          </Link>
        </p>

        <input
          type="submit"
          className="btn bg-primary-orange border-none text-white"
          value="Login"
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

export default Login;
