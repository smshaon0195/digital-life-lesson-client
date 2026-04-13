import React from "react";

// Swiper core
import { Swiper, SwiperSlide } from "swiper/react";

// modules
import { EffectCoverflow, Pagination, Navigation, Autoplay } from "swiper/modules";

// styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/autoplay";

// images
import img1 from "../../assets/Image/1.jpg";
import img2 from "../../assets/Image/2.jpg";
import img3 from "../../assets/Image/3.jpg";
import img4 from "../../assets/Image/4.jpg";
import img5 from "../../assets/Image/5.jpg";
const Slider1 = () => {
  return (
    <div className="w-full py-10 border-b-2 border-gray-200">
      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={3}
        loop={true}
        autoplay={{
          delay: 2500, // ⏱️ 2.5 second পর slide change
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        speed={1000}
        coverflowEffect={{
          rotate: 25,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        pagination={{ clickable: true }}
        navigation={true}
        modules={[EffectCoverflow, Pagination, Navigation, Autoplay]}
        className="w-[100%] mx-auto"
      >
        <SwiperSlide>
          <img src={img1} className=" rounded-2xl transition-all duration-500 hover:scale-110 " />
        </SwiperSlide>

        <SwiperSlide>
          <img src={img2} className="rounded-2xl transition-all duration-500 hover:scale-110" />
        </SwiperSlide>

        <SwiperSlide>
          <img src={img3} className="rounded-2xl transition-all duration-500 hover:scale-110" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={img4} className="rounded-2xl transition-all duration-500 hover:scale-110" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={img5} className="rounded-2xl transition-all duration-500 hover:scale-110" />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Slider1;
