import React from "react";
import { AiFillAlert } from "react-icons/ai";
import { GoArrowRight } from "react-icons/go";
import { PiGraduationCapFill } from "react-icons/pi";
import { TfiBarChart } from "react-icons/tfi";

const LarningSupport = () => {
  const cards = [
    {
      icon: <PiGraduationCapFill className="w-20 h-20 mb-2 mx-auto text-yellow-600" />,
      title: "Coaching",
      description:
        "Business Consultancy International is your gateway to a successful future in business consulting.",
    },
    {
      icon: <AiFillAlert className="w-20 h-20 mb-2 mx-auto text-yellow-600" />,
      title: "Life Programs",
      description: "Build practical life skills that help you grow with confidence and purpose.",
    },
    {
      icon: <TfiBarChart className="w-20 h-20 mb-2 mx-auto text-yellow-600" />,
      title: "Consultation",
      description: "Get expert guidance to make informed decisions for your personal growth.",
    },
  ];

  return (
    <div className="bg-amber-100 py-20">
      <div className="w-[95%] mx-auto">
        <h2 className="text-center text-3xl font-bold mb-10 text-black">I can help you with</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 sm:gap-10 gap-5">
          {cards.map((card, index) => (
            <div
              key={index}
              className="sm:p-5 p-3 text-center bg-white rounded-xl hover:shadow-lg transition"
            >
              {card.icon}

              <h3 className="sm:text-3xl text-xl font-bold text-black">{card.title}</h3>

              <p className="font-semibold text-gray-600 sm:my-3 my-1 text-sm sm:text-xl">
                {card.description}
              </p>

              <div className="text-yellow-600 flex justify-center items-center gap-1 font-bold cursor-pointer">
                Start Here <GoArrowRight />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LarningSupport;
