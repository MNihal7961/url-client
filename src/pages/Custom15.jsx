import { useState, useEffect } from "react";
import axios from "axios";
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import Loading from "../components/Loading";
import Empty15 from "../components/Empty15";

const MyUrls = () => {
  const { token } = useSelector((state) => state.user);
  const [urls, setUrls] = useState([]);
  const [loading, setLoading] = useState(false);

  axios.defaults.withCredentials = true;

  const fetchUrls = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "https://url-server-git-main-nihalms-projects.vercel.app/api/custom/mycustom15",
        {
          headers: {
            Authorization: token,
          },
          withCredentials: true,
        }
      );
      setLoading(false);
      setUrls(response.data.data);
    } catch (error) {
      setLoading(false);
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchUrls();
  }, []);

  const handleDelete = async (code) => {
    try {
      const { data } = await axios.put(
        `https://url-server-git-main-nihalms-projects.vercel.app/api/custom/${code}`,
        {},
        {
          headers: {
            Authorization: token,
          },
          withCredentials: true,
        }
      );
      fetchUrls();
      toast.success(data.message);
    } catch (error) {
      console.error(error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <>
      <div className="mt-32 px-10">
        {urls.length === 0 && !loading && <Empty15 />}
        {loading && <Loading />}
        {urls.length > 0 && !loading && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {urls.map((url, index) => (
              <div
                key={index}
                className="max-w-md bg-white border border-gray-200 rounded-lg shadow p-4"
              >
                <h5 className="text-xl font-bold text-center leading-none text-gray-900 mb-4">
                  {index + 1}
                </h5>
                {url.map((item, idx) => (
                  <div className="flex items-center" key={idx}>
                    {" "}
                    {/* Add key={idx} here */}
                    <div>{idx + 1}</div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        code: {item.code}
                      </p>
                      <p className="text-sm text-gray-500 truncate">
                        {" "}
                        url: {item.url}
                      </p>
                    </div>
                  </div>
                ))}

                <div className="flex justify-end mt-4">
                  <MdDelete
                    key={index}
                    onClick={() => handleDelete(url[0].code)}
                    className="text-red-600 cursor-pointer"
                    size={24}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default MyUrls;
