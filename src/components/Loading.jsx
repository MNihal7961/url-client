import React from "react";
import HashLoader from "react-spinners/HashLoader";

const Loading = () => {
  return (
    <div className="w-full h-[60vh] flex items-center justify-center">
      <HashLoader color="#00b8ff"/>
    </div>
  );
};

export default Loading;
