import { useState } from "react";
import AddUrl from "../components/Addurl";

const Home = () => {
  const [loading, setLoading] = useState(false);
  return (
    <div>
      <AddUrl />
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
    </div>
  );
};

export default Home;
