import React from "react";

import hotline from "../../../assets/Image/call_center.jpg";

const LeftSideBar = () => {
  return (
    <div className="md:w-3/12 ">
      <div className="socialShare grid text-center   justify-center">
        <span className="text-xl font-bold"> Emargency Help Line</span>
        <img className="rounded-2xl mt-3 " src={hotline} alt="" />
      </div>
    </div>
  );
};

export default LeftSideBar;
