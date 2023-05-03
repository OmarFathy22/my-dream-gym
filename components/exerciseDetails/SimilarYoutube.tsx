import React, {useEffect, useLayoutEffect, useRef, useState } from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import styled from "styled-components";
import { SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import axios from "axios";
import { ExerciseCard } from "@/components/ThirdSection/index";
import { ExercisesContainer } from "@/components/ThirdSection/index";
import "swiper/swiper-bundle.min.css";
import Loading from "@/components/Loading/index";
import ForSwiper from "../ForSwiper";




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
  const [isLoading, setisLoading] = useState(true)
  const [Data, setData] = useState([]);
  console.log("Youtube Section" , NameOfExercise);
  useEffect(() => {
    console.log("data is" , Data);
  }, [Data])
  useEffect(() => {
    localStorage.setItem("Youtube", JSON.stringify([]));
    localStorage.setItem("loading", "false");
    const func = async () => {
      const options = {
        method: 'GET',
        url: 'https://youtube-v3-alternative.p.rapidapi.com/search',
        params: {
          query:NameOfExercise + " Workout",
          geo: 'US',
          lang: 'en'
        },
        headers: {
          'X-RapidAPI-Key': '8922bb81bemsha3476b0f910c70dp1f3246jsn0a9380fb1e3b',
          'X-RapidAPI-Host': 'youtube-v3-alternative.p.rapidapi.com'
        }
      };

      try {
        const response = await axios.request(options);
        // localStorage.setItem("Youtube", JSON.stringify(response.data.data));
        localStorage.setItem("loading", "false");
        console.log("api array " , response.data.data);
        // const Youtube = JSON.parse(localStorage.getItem("Youtube") || "[]");
        // console.log("youtube array " , Youtube);
        setData(response.data.data)

      } catch (error) {
        console.log(error);
      }
    };
    func();
  }, [NameOfExercise]);
  const SlideRef: any = useRef();
  const LOADING = localStorage.getItem("loading") === "true";
  // const Youtube = JSON.parse(localStorage.getItem("Youtube") || "[]");
  if(LOADING ){
    return <Loading/>
  }
  return (
    <Main style={{  animation: "animate 1s 1" , transition: "all 1s ease-in-out"}} >
  
      <h1 className="mobile:text-[24px] tablet:text-[30px] text-center w-full font-bold">
        Similar <span className="text-red-500">Youtube </span> Videos
      </h1>
      <ExercisesContainer>
        { Data.length && <ForSwiper SlideRef={SlideRef} Delay = {600000}>
          {Data.length && Data.map((item: any, index: number) => {
            return (
              <ExerciseCard key={index} className="!rounded-lg">
                <SwiperSlide
                 key={index}
                  className="!h-[100%] !w-full !flex !justify-center mb-10 flex-col "
                >
                  <div className="!rounded-lg !h-[300px] !w-full bg-white"
                  >
                   {item?.videoId  ?   <iframe allowFullScreen className="!w-[100%]  !h-[300px] !rounded-lg block" width="420" height="345" src={"https://www.youtube.com/embed/" + item?.videoId}></iframe>
                   : <Loading/>
                   }
                  </div>
                </SwiperSlide>
              </ExerciseCard>
            );
          })}
        </ForSwiper>}
        {!Data.length && <h1 className='text-2xl text-center mb-10 font-bold'>No Exercises loaded <br/>Please refresh The Page {NameOfExercise} </h1>}
      </ExercisesContainer>
    </Main>
  );
};

export default SecondSection;
