import { useState, useEffect } from "react";
import axios from "axios";
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import Loading from "../components/Loading";
import Empty from "../components/Empty";

const Custom15 = () => {
  const { token } = useSelector((state) => state.user);
  const [urls, setUrls] = useState([]);
  const [loading, setLoading] = useState(false);

  axios.defaults.withCredentials = true;

  const fetchUrls = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "https://url-server-git-main-nihalms-projects.vercel.app/api/url/myurls",
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
      setUrls(response.data.data.urls);
    } catch (error) {
      setLoading(false);
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchUrls();
  }, []);

  const insertLineBreaks = (url) => {
    const chunks = [];
    for (let i = 0; i < url.length; i += 50) {
      chunks.push(url.substring(i, i + 50));
    }
    return chunks.join("\n");
  };

  const goToOriginalLink = (link) => {
    window.location.href = link;
  };

  const goToUrl = (code) => {
    try {
      window.location.href = `https://url-server-git-main-nihalms-projects.vercel.app/api/url/${code}?token=${token}`;
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  const handleDelete = async (code) => {
    try {
      const { data } = await axios.put(
        `http://localhost:4000/api/url/${code}`,
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
      {urls.length === 0 && !loading && <Empty />}
      {loading && <Loading />}
      {urls.length > 0 && !loading && (
        <div className="relative min-h-[60vh] overflow-x-auto mt-32">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
            <thead className="text-xs text-gray-700 uppercase bg-gray-100">
              <tr>
                <th scope="col" className="px-6 py-3">
                  NO
                </th>
                <th scope="col" className="px-6 py-3 ">
                  NAME
                </th>
                <th scope="col" className="px-6 py-3">
                  URL
                </th>
                <th scope="col" className="px-6 py-3 ">
                  SHORTED URL
                </th>
                <th scope="col" className="px-6 py-3 ">
                  DELETE URL
                </th>
              </tr>
            </thead>
            <tbody>
              {urls.map((url, index) => (
                <tr key={index}>
                  <td className="px-6 py-4">{index + 1}</td>
                  <td className="px-6 py-4">{url.name || "NA"}</td>
                  <td
                    onClick={() => goToOriginalLink(url.originalLink)}
                    className="px-6 py-4 hover:text-blue-600 cursor-pointer"
                  >
                    <span style={{ whiteSpace: "pre-wrap" }}>
                      {insertLineBreaks(url.originalLink)}
                    </span>
                  </td>
                  <td
                    className="px-6 py-4 hover:text-primaryColor cursor-pointer"
                    onClick={() => goToUrl(url.urlCode)}
                  >
                    {url.urlCode}
                  </td>
                  <td className="px-6 py-4">
                    <MdDelete
                      onClick={() => handleDelete(url.urlCode)}
                      className="text-red-600 cursor-pointer"
                      size={30}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default Custom15;
