import { useState, useEffect } from "react";
import axios from "axios";
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import Loading from "../components/Loading";
import Empty15 from "../components/Empty15";

const MyUrls = () => {
  const { token } = useSelector((state) => state.user);
  const [urls, setUrls] = useState([[{}]]);
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
      if (response) {
        setLoading(false);
      }
      console.log(response.data.data);
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
        `https://url-server-git-main-nihalms-projects.vercel.app/api/custom/remove1/${code}`,
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
      {urls.length === 0 && !loading && <Empty15 />}
      {loading && <Loading />}
      {urls.length > 0 && !loading && (
        <>
          <div className="relative min-h-[60vh] overflow-x-auto mt-32 -z-10">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-100">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    NO
                  </th>
                  <th scope="col" className="px-6 py-3">
                    URL
                  </th>
                  <th scope="col" className="px-6 py-3">
                    CODE
                  </th>
                  <th scope="col" className="px-6 py-3">
                    DELETE URL
                  </th>
                </tr>
              </thead>
              <tbody>
                {urls.flat().map((url, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4">{index + 1}</td>
                    <td className="px-6 py-4 hover:text-blue-600 cursor-pointer">
                      <span style={{ whiteSpace: "pre-wrap" }}>{url.url}</span>
                    </td>
                    <td className="px-6 py-4">{url.code}</td>
                    <td className="px-6 py-4">
                      <MdDelete
                        onClick={() => handleDelete(url.code)}
                        className="text-red-600 cursor-pointer"
                        size={30}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </>
  );
};

export default MyUrls;
