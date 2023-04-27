import React from 'react'
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react'
import { Navigation, Pagination, A11y } from 'swiper'

type Props = {}

const SWIPER = ({SlideRef , children}:any) => {
  return (
    <Swiper
    breakpoints={{
     // when window width is >= 640px
     200: {
       width: 200,
       slidesPerView: 1,
       slidesPerGroup:1,

     },
     // when window width is >= 768px
     600: {
       width: 600,
       slidesPerView: 2,
       slidesPerGroup:2,

     },
     910: {
       width: 910,
       slidesPerView: 3,
       slidesPerGroup:3,

     },
     1000: {
       width: 1000,
       slidesPerView: 3,
       slidesPerGroup:3,
     },
     1300: {
       width: 1300,
       slidesPerView: 3,
       slidesPerGroup:3,

     },
   }}
     modules={[Navigation, Pagination, A11y]}
     spaceBetween={10}
     ref={SlideRef}
     // slidesPerView={5}
     // navigation
    //  pagination={{ clickable: true }}
     // onSwiper={(swiper) => console.log(swiper)}
     // onSlideChange={() => console.log("slide change")}
   >
    {children}
    </Swiper>
  )
}

export default SWIPER