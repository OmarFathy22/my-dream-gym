import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";


// import required modules
import { Autoplay, Pagination, Navigation , EffectCube } from "swiper";
import Move from "@/components/MoveSlider";
export default function App({SlideRef , children}:any) {
  // const SlideRef: any = useRef();
  const handleNext = () => {
    SlideRef.current.swiper.slideNext();
  };

  const handlePrev = () => {
    SlideRef.current.swiper.slidePrev();
  };
  return (
    <div className="flex flex-col gap-10 justify-center items-center">

      <Swiper
      
        ref={SlideRef}
        effect={"cube"}
        grabCursor={true}
        cubeEffect={{
          shadow: true,
          slideShadows: true,
          shadowOffset: 20,
          shadowScale: 0.94,
        }}
        autoplay={{
          delay: 7000,
          disableOnInteraction: false,
        }}
        // pagination={true}
        modules={[EffectCube, Pagination]}
        className="mySwiper-1!h-[420px] !w-[350px] !flex !justify-center !items-center"
      >
        {children}
      </Swiper>
      <Move handleNext = {handleNext} handlePrev = {handlePrev}/>
    </div>
  );
}
