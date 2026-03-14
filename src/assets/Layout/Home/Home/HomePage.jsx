import React from "react";
import SlideCarosol from "../../../Slider/SlideCarosol";
import Slider1 from "../../../Slider/Slider1";
import SupportSyestem from "../../../../Pages/SupportSyestem/SupportSyestem";
import LarningSupport from "../../../../Pages/LarnigSupport/LarningSupport";

import PricingCards from "../../../../Pages/PricingCards/PricingCards";
import { Outlet } from "react-router";
import HomePostLayout from "../HomeLayout/HomePostLayout";

const HomePage = () => {
  return (
    <div>
      {/* <SlideCarosol></SlideCarosol> */}
      {/* <Slider1></Slider1> */}
      <SupportSyestem></SupportSyestem>
      <LarningSupport></LarningSupport>
      
     
      <HomePostLayout></HomePostLayout>
      
      <PricingCards></PricingCards>
    </div>
  );
};

export default HomePage;
