import React from "react";
import { FcNightPortrait } from "react-icons/fc";
import { ImBullhorn } from "react-icons/im";
import { MdOutlineHomeRepairService } from "react-icons/md";

const SupportSyestem = () => {
  return (
    <div className="w-[95%] mx-auto grid grid-cols-3 my-10">
      <div className="clintReview items-center text-center">
        <MdOutlineHomeRepairService className="w-20 h-20 mx-auto text-yellow-600" />
        <h2 className="text-3xl font-bold">415</h2>
        <h4 className="font-semibold text-xl text-gray-600">Happy Clients</h4>
      </div>
      <div className="clintReview items-center text-center">
        <FcNightPortrait className="w-20 h-20 mx-auto text-yellow-600" />
        <h2 className="text-3xl font-bold">9</h2>
        <h4 className="font-semibold text-xl text-gray-600">Online Courses</h4>
      </div>
      <div className="clintReview items-center text-center">
        <ImBullhorn className="w-20 h-20 mx-auto text-yellow-600" />
        <h2 className="text-3xl font-bold">24/07</h2>
        <h4 className="font-semibold text-xl text-gray-600">Clints Support</h4>
      </div>
    </div>
  );
};

export default SupportSyestem;
