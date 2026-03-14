import React from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const Loding = () => {
  return (
    <div className="">
      <p className="font-stretch-semi-expanded text-center mt-10 font-bold text-2xl ">Wait Please</p>
      <DotLottieReact
        src="https://lottie.host/a37b5843-6eca-4226-b3b6-e4eb374ceef4/T4TH37HorD.lottie"
        className="w-99 h-99 mx-auto  "
        loop
        autoplay
      />
    </div>
  );
};

export default Loding;
