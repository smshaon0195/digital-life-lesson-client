import React from "react";
import SlideCarosol from "../../../Slider/SlideCarosol";
import Slider1 from "../../../Slider/Slider1";
import SupportSyestem from "../../../../Pages/SupportSyestem/SupportSyestem";
import LarningSupport from "../../../../Pages/LarnigSupport/LarningSupport";
import RecenCourse from "../../../../Pages/RecentCourse/RecenCourse";

import PricingCards from "../../../../Pages/PricingCards/PricingCards";

const HomePage = () => {
  return (
    <div>
      {/* <SlideCarosol></SlideCarosol> */}
      {/* <Slider1></Slider1> */}
      <SupportSyestem></SupportSyestem>
      <LarningSupport></LarningSupport>
      <RecenCourse></RecenCourse>
      <PricingCards></PricingCards>
    </div>
  );
};

export default HomePage;
