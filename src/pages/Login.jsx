import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HashLoader } from "react-spinners";
import { toast } from "react-toastify";
import { logInStart, logInSuccess, logInFailure } from "../redux/userSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

const Login = () => {
  const { loading } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formData.email && !formData.password) {
      return toast.error("Fill the fields");
    } else if (!formData.password) {
      return toast.error("Password is required");
    } else if (!formData.email) {
      return toast.error("Email is required");
    }

    try {
      axios.defaults.withCredentials = true;
      dispatch(logInStart());
      const res = await axios.post(
        "https://url-server-git-main-nihalms-projects.vercel.app/api/user/login",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = res.data;

      if (res.status === 200) {
        dispatch(logInSuccess(data));
        toast.success(data.message);
        navigate("/");
      } else if (res.status === 404) {
        toast.error("User Not Found");
        dispatch(logInFailure(data.message));
      } else {
        toast.error("Login Failed");
        dispatch(logInFailure(data.message));
      }
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.message);
      dispatch(logInFailure(err));
    }
  };

  return (
    <section className="px-5 lg:px-0 mt-20 h-[70vh]">
      <div className="w-full max-w-[570px] mx-auto rounded-lg shadow-md p-3 md:p-10">
        <h3 className="text-headingColor text-[22px] leading-9 font-bold mb-10">
          Hello! <span className="text-primaryColor">Welcome</span> Back 🖐️
        </h3>
        <h2 className="text-headingColor text-[22px] leading-9 font-bold mb-10 underline">
          Sample user
        </h2>
        <h5 className="text-headingColor text-[22px] leading-9 font-bold">
          Email: test@gmail.com
        </h5>
        <h5 className="text-headingColor text-[22px] leading-9 font-bold mb-10">
          Password: 123456
        </h5>
        <form className="py-4 md:py-0 " onSubmit={handleSubmit}>
          <div className="mb-5">
            <input
              type="email"
              placeholder="Enter your registered Email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor cursor-pointer required:"
            />
          </div>
          <div className="mb-5">
            <input
              type="password"
              placeholder="Enter your Password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor cursor-pointer required:"
            />
          </div>
          <div className="mt-7">
            <button
              disabled={loading}
              className="w-full bg-primaryColor text-white text-[18px] leading-[30px] rounded-lg px-4 py-3"
              type="submit"
            >
              {loading ? <HashLoader size={25} color="#ffffff" /> : "Login"}
            </button>
          </div>
          <p className="text-textColor mt-5 text-center">
            Don&apos;t have an account?{" "}
            <Link to="/signup" className="text-primaryColor font-medium ml-1">
              Register
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
};

export default Login;
