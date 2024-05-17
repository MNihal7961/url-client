import { useState } from "react";
import { FaLink } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { signOut } from "../redux/userSlice";
import { toast } from "react-toastify";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let Links = [
    { name: "HOME", link: "/" },
    { name: "MY URLS", link: "/urls" },
  ];
  let [open, setOpen] = useState(false);
  const { currentUser } = useSelector((state) => state.user);

  const handleLogout = async () => {
    try {
      axios.get("http://localhost:4000/api/user/logout").then(() => {
        dispatch(signOut());
        navigate("/login");
        toast.success("Logout Success");
      });
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

  return (
    <div className="shadow-md w-full  top-0 left-0 fixed ">
      <div className="md:flex items-center justify-between bg-white py-4 md:px-10 px-7">
        <div className="font-bold text-2xl cursor-pointer flex items-center gap-1">
          <FaLink
            size={50}
            className="text-primaryColor transition hover:scale-150 cursor-pointer"
          />
          <span>
            short <span className="text-primaryColor">URL</span>
          </span>
        </div>
        <div
          onClick={() => setOpen(!open)}
          className="absolute right-8 top-6 cursor-pointer md:hidden w-7 h-7"
        >
          {open ? <IoMdClose /> : <GiHamburgerMenu />}
        </div>
        <ul
          className={`md:flex md:items-center md:pb-0 pb-12 absolute md:static bg-white md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${
            open ? "top-12" : "top-[-490px]"
          }`}
        >
          {Links.map((link, index) => (
            <li className="md:ml-8 md:my-0 my-7 font-semibold" key={index}>
              <a
                href={link.link}
                className="text-gray-800 hover:text-primaryColor duration-500"
              >
                {link.name}
              </a>
            </li>
          ))}
          {!currentUser && (
            <Link to="/login">
              <button className=" bg-primaryColor text-white md:ml-8 font-semibold px-3 py-1 rounded duration-500 md:static">
                Login
              </button>
            </Link>
          )}
          {currentUser && (
            <button
              onClick={handleLogout}
              className=" bg-red-600 text-white md:ml-8 font-semibold px-3 py-1 rounded duration-500 md:static"
            >
              Logout
            </button>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Header;
