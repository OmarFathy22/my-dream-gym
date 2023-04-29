import React from 'react'
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react'
import { Navigation, Pagination, A11y } from 'swiper'

type Props = {}

const SWIPER2 = ({SlideRef , children}:any) => {
  return (
    <Swiper
     className='!h-[250px] 200screen:!w-[300px] 600screen:!w-[700px] 910screen:!w-[110px] 1000screen:!w-[1100px] 1300screen:!w-full '
    breakpoints={{
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
     1300: {
       width: 1300,
       slidesPerView: 4,
       slidesPerGroup:4,

     },
   }}
     modules={[Navigation, Pagination, A11y]}
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

export default SWIPER2;