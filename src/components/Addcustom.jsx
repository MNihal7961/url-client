import React from "react";
import { FaLink } from "react-icons/fa";
import { HashLoader } from "react-spinners";
const Addcustom = () => {
  return (
    <section className="px-5 lg:px-0 mt-32 md:mt-24 h-[60vh] md:h-auto">
      <div className="w-full max-w-[800px] mx-auto rounded-lg shadow-md md:p-10">
        <div className="flex items-center justify-center">
          <h3 className="text-headingColor text-[22px] leading-9 font-bold mb-10">
            Create A 15 Custom <span className="text-primaryColor">URL</span>
          </h3>
          <FaLink size={50} className="text-primaryColor hover:scale-150" />
        </div>
      </div>
    </section>
  );
};

export default Addcustom;
