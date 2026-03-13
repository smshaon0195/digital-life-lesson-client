import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import image1 from "../../assets/Image/1.jpg";
import image2 from "../../assets/Image/2.jpg";
import image3 from "../../assets/Image/3.jpg";
const SlideCarosol = () => {
  return (
   <div className="">
     <Carousel className="" autoPlay={true}  infiniteLoop={true}>
      <div class="carousel-item ">
        <img class="d-block " src={image1} />
        <p className="legend">Legend 1</p>
      </div>
      <div>
        <img class="d-block " src={image2} />
        <p className="legend">Legend 2</p>
      </div>
      <div>
        <img class="d-block " src={image3} />
        <p className="legend">Legend 3</p>
      </div>
    </Carousel>
   </div>
  );
};

export default SlideCarosol;
