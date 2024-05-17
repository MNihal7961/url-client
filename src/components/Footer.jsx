import { FaLink } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-white rounded-lg m-10">
      <div className="w-full max-w-screen-xl mx-auto">
        <div className="sm:flex sm:items-center sm:justify-between">
          <a
            href="/"
            className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse"
          >
            <FaLink className="text-primaryColor hover:scale-150 transition" size={50}/>
            <span className="self-center text-2xl font-semibold whitespace-nowrap">
              short <span className="text-primaryColor font-extrabold">URL</span>
            </span>
          </a>
        </div>
        <hr className="my-6 sm:mx-auto border-gray-700 lg:my-8" />
        <span className="block text-sm sm:text-center text-gray-400">
          © 2024{" "}
          <a href="/" className="hover:underline hover:text-primaryColor">
            shortURL™
          </a>
          . developed by Nihal M .
        </span>
      </div>
    </footer>
  );
};

export default Footer;
