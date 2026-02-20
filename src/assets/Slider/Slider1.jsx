import React from "react";
import "swiper/css";
import image1 from "../../assets/Image/1.jpg";
import image2 from "../../assets/Image/2.jpg";
import image3 from "../../assets/Image/3.jpg";
import { Swiper, SwiperSlide } from "swiper/react";
const Slider1 = () => {
  return (
    <Swiper slidesPerView={6} centeredSlides={true} spaceBetween={30}>
      <SwiperSlide>
        <img className="w-[250px] h-[150px]" src={image1} alt="" />
      </SwiperSlide>
      <SwiperSlide>
        <img className="w-[250px] h-[150px]" src={image2} alt="" />
      </SwiperSlide>
      <SwiperSlide>
        <img className="w-[250px] h-[150px]" src={image3} alt="" />
      </SwiperSlide>
    </Swiper>
  );
};

export default Slider1;
