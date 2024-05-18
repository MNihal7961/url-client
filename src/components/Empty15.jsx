import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { HashLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";

const Empty15 = () => {
  const { token } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handle15 = async () => {
    try {
      axios.defaults.withCredentials = true;
      const { data } = await axios.get(
        "https://url-server-git-main-nihalms-projects.vercel.app/api/custom",
        {
          headers: {
            Authorization: token,
          },
          withCredentials: true,
        }
      );

      setLoading(false);

      toast.success(data.message);
      navigate("/custom");
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error(error.response.data.message);
    }
  };
  return (
    <>
      <div className="flex items-center justify-center w-full h-[60vh]">
        <div>
          <h3 className="text-headingColor text-[20px] leading-[30px] font-semibold ">
            Empty <br /> Click below to add{" "}
            <span className="text-primaryColor">15 url</span>
          </h3>
        </div>
        <div className="p-5">
          <button
            disabled={loading}
            onClick={handle15}
            className="p-3 bg-gray-300 rounded-md font-semibold hover:cursor-pointer"
          >
            {loading ? (
              <HashLoader />
            ) : (
              <>
                Add <span className="text-primaryColor">15 url</span>
              </>
            )}
          </button>
        </div>
      </div>
    </>
  );
};

export default Empty15;
