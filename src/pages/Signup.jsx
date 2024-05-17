import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HashLoader } from "react-spinners";
import { toast } from "react-toastify";

const Signup = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    if (!formData.email && !formData.name && !formData.password) {
      setLoading(false);
      return toast.error("All fields are required");
    } else if (!formData.email) {
      setLoading(false);
      return toast.error("Email is required");
    } else if (!formData.name) {
      setLoading(false);
      return toast.error("Name is required");
    } else if (!formData.password) {
      setLoading(false);
      return toast.error("Password is required");
    } else if (formData.password.length < 6) {
      setLoading(false);
      return toast.error("Password should be minimum 6 charecters");
    }

    try {
      const res = await axios.post(
        "http://localhost:4000/api/user/signup",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = res.data;

      console.log(data);

      if (res.status === 200) {
        setLoading(false);
        toast.success(data.message);
        navigate("/login");
      } else if (res.status === 409) {
        setLoading(false);
        toast.error("user already exists");
      } else {
        setLoading(false);
        toast.error("signup failed");
      }
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.message);
      setLoading(false);
    }
  };

  return (
    <section className="px-5 xl:px-0 mt-24">
      <div className="w-full max-w-[570px] mx-auto rounded-lg shadow-md md:p-10">
        <h3 className="text-headingColor text-[22px] leading-9 font-bold mb-10">
          Create an <span className="text-primaryColor">Account</span>
        </h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-5">
            <input
              type="text"
              placeholder="Enter your full name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full pr-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor cursor-pointer required:"
            />
          </div>
          <div className="mb-5">
            <input
              type="email"
              placeholder="Enter your email address"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full pr-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor cursor-pointer required:"
            />
          </div>
          <div className="mb-5">
            <input
              type="password"
              placeholder="Enter your password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full pr-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor cursor-pointer required:"
            />
          </div>
          <div className="mt-7">
            <button
              disabled={loading && true}
              className="w-full bg-primaryColor text-white text-[18px] leading-[30px] rounded-lg px-4 py-3"
              type="submit"
            >
              {loading ? <HashLoader size={35} color="#ffffff" /> : "Register"}
            </button>
          </div>
          <p className="text-textColor mt-5 text-center">
            Already have an account?{" "}
            <Link to="/login" className="text-primaryColor font-medium ml-1">
              Login
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
};

export default Signup;
