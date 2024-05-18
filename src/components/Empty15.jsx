import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Empty15 = () => {
  return (
    <>
      <div className="flex items-center justify-center w-full h-[60vh]">
        <div>
          <h3 className="text-headingColor text-[20px] leading-[30px] font-semibold ">
            Empty <br /> Go home  to add{" "}
            <span className="text-primaryColor">15 url</span>
          </h3>
        </div>
      </div>
    </>
  );
};

export default Empty15;
