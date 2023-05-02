import React, {useLayoutEffect, useRef } from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import styled from "styled-components";
import { SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import axios from "axios";
import { ExerciseCard } from "@/components/ThirdSection";
import { ExercisesContainer } from "@/components/ThirdSection";
import "swiper/swiper-bundle.min.css";
import dynamic from "next/dynamic";
import Loading from "@/components/Loading";
const ForSwiper = dynamic(() => import("@/components/ForSwiper"), {
  ssr: false,
  loading: () => <Loading />,
  suspense: true,
});


type Props = {};

const Main = styled.div`
  margin-top: 100px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 40px;
`;




const SecondSection = ({ NameOfExercise  }: any) => {
  useLayoutEffect(() => {
    localStorage.setItem("Youtube", JSON.stringify([]));
    localStorage.setItem("loading", "false");
    const func = async () => {
      const options = {
        method: "GET",
        url: "https://simple-youtube-search.p.rapidapi.com/search",
        params: {
          query: NameOfExercise + " exercise",
          safesearch: "false",
        },
        headers: {
          "content-type": "application/octet-stream",
          "X-RapidAPI-Key":
            "44a7c0af56msh63e4b6a53bd328cp1544dajsn6b850a3623bb",
          "X-RapidAPI-Host": "simple-youtube-search.p.rapidapi.com",
        },
      };

      try {
        const response = await axios.request(options);
        localStorage.setItem("Youtube", JSON.stringify(response.data.results));
        localStorage.setItem("loading", "false");
      } catch (error) {
        console.error(error);
      }
    };
    func();
  }, [NameOfExercise]);
  const SlideRef: any = useRef();
  const loading = localStorage.getItem("loading") === "true";
  const Youtube = JSON.parse(localStorage.getItem("Youtube") || "[]");
  if(loading){
    return <Loading/>
  }
  return (
    <Main style={{  animation: "animate 1s 1" , transition: "all 1s ease-in-out"}} >
  
      <h1 className="mobile:text-[24px] tablet:text-[30px] text-center w-full font-bold">
        Similar <span className="text-red-500">Youtube </span> Videos
      </h1>
      <ExercisesContainer>
        {Youtube.length > 1 && <ForSwiper SlideRef={SlideRef}>
          {Youtube.map((item: any, index: number) => {
            return (
              <ExerciseCard key={index} className="!rounded-lg">
                <SwiperSlide
                 key={index}
                  className="!h-[100%] !w-full !flex !justify-center mb-10 flex-col "
                >
                  <div className="!rounded-lg !h-[300px] !w-full bg-white"
                  >
                  {/* <iframe allowFullScreen className="!w-[100%]  !h-[300px] !rounded-lg block" width="420" height="345" src="https://embed.lottiefiles.com/animation/142649">\ */}
                    <iframe allowFullScreen className="!w-[100%]  !h-[300px] !rounded-lg block" width="420" height="345" src={"https://www.youtube.com/embed/" + item.id}></iframe>
                  {/* </iframe> */}
                  </div>
                </SwiperSlide>
              </ExerciseCard>
            );
          })}
        </ForSwiper>}
        {Youtube.length < 1 && <h1 className='text-2xl text-center mb-10 font-bold'>No Exercises loaded <br/>Please refresh The Page </h1>}
      </ExercisesContainer>
    </Main>
  );
};

export default SecondSection;
