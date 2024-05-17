import { useState } from "react";
import { HashLoader } from "react-spinners";
import { FaLink } from "react-icons/fa";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AddUrl = () => {
  const { currentUser, token } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    originalLink: "",
    name: "",
    length: "",
  });

  const navigate = useNavigate();
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const result = async (event) => {
    event.preventDefault();
    setLoading(true);

    if (!currentUser) {
      setLoading(false);
      return toast.warning("Please login");
    }

    if (!formData.originalLink) {
      setLoading(false);
      return toast.error("Please enter the url");
    }

    if (parseInt(formData.length) < 0) {
      setLoading(false);
      return toast.error("Enter a positive number");
    }

    try {
      axios.defaults.withCredentials = true;
      const { data } = await axios.post(
        "https://url-server-git-main-nihalms-projects.vercel.app/api/url",
        formData,
        {
          headers: {
            Authorization: token,
          },
          withCredentials: true,
        }
      );

      setLoading(false);

      toast.success(data.message);
      navigate("/urls");
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error(error.response.data.message);
    }
  };
  return (
    <section className="px-5 lg:px-0 mt-32 md:mt-24 h-[60vh] md:h-auto">
      <div className="w-full max-w-[800px] mx-auto rounded-lg shadow-md md:p-10">
        <div className="flex items-center justify-center">
          <h3 className="text-headingColor text-[22px] leading-9 font-bold mb-10">
            Create A New Short <span className="text-primaryColor">URL</span>
          </h3>
          <FaLink size={50} className="text-primaryColor hover:scale-150" />
        </div>
        <form className="py-4 md:py-0 " onSubmit={result}>
          <div className="mb-5">
            <p className="form__label">Enter the original link*</p>
            <input
              type="text"
              placeholder="Copy the link here"
              name="originalLink"
              value={formData.originalLink}
              onChange={handleInputChange}
              className="w-full px-4 py-3 rounded-lg border border-solid border-black focus:outline-none focus:border-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor cursor-pointer required:"
            />
          </div>
          <div className="mb-5">
            <p className="form__label">Enter the name</p>
            <input
              type="text"
              placeholder="Enter a name (optional)"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-4 py-3 rounded-lg border border-solid border-black focus:outline-none focus:border-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor cursor-pointer required:"
            />
          </div>
          <div className="mb-5">
            <p className="form__label">Enter the length of the url</p>
            <input
              type="number"
              placeholder="Enter a length (optional)"
              name="length"
              value={formData.length}
              onChange={handleInputChange}
              className="w-full px-4 py-3 rounded-lg border border-solid border-black focus:outline-none focus:border-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor cursor-pointer required:"
            />
          </div>
          <div className="mt-7">
            <button
              disabled={loading}
              className="w-full bg-primaryColor text-white text-[18px] leading-[30px] rounded-lg px-4 py-3"
              type="submit"
            >
              {loading ? (
                <HashLoader size={25} color="#ffffff" />
              ) : (
                <span className="text-xl font-bold ">Short Url</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default AddUrl;
