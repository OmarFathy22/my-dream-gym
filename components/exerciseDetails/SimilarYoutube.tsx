import React, { useEffect, useRef, useState } from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";
import { SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import axios from "axios";
import { ExerciseName } from "@/pages/ThirdSection";
import { ExercisesContainer } from "@/pages/ThirdSection";
import "swiper/swiper-bundle.min.css";
import ForSwiper from "@/pages/ForSwiper";
import Loading from "@/pages/Loading";

type Props = {};

const Main = styled.div`
  margin-top: 100px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 40px;
`;

export const ExerciseCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 30px;
  cursor: pointer;
  height: 420px;
  width: 320px;
  border-radius: 3px;
  background-color: white;
  border-radius: 3px;
  scale: 0.9;
  transition: all 0.5s;
  &:hover {
    scale: 1;
  }
`;
export const ExercisesName = styled.h1`
  font: 20px;
  font-weight: 700;
`;

const SecondSection = ({ NameOfExercise }: any) => {
  const [Youtube, setYoutube] = useState([]);
  const [loading, setloading] = useState(true)
  useEffect(() => {
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
        setYoutube(response.data.results);
        setTimeout(() => {
          setloading(false)
        }, 2000);
      } catch (error) {
        console.error(error);
      }
    };
    func();
  }, [NameOfExercise]);
  const SlideRef: any = useRef();
  if(loading){
    return <Loading/>
  }
  return (
    <Main>
      <h1 className="text-[30px] pl-[40px] text-left w-full  font-bold">
        Similar <span className="text-red-500">Youtube </span> Videos
      </h1>
      <ExercisesContainer>
        <ForSwiper SlideRef={SlideRef}>
          {Youtube.map((item: any, index: number) => {
            return (
              <ExerciseCard key={index} className="!rounded-lg">
                <SwiperSlide
                 key={index}
                  className="!h-[100%] !w-full !flex !justify-center mb-10"
                >
                  <Link
                    href={item.url}
                    target="_blank"
                    className="!rounded-lg !h-full !w-full bg-white"
                  >
                    <Image
                      // loading="lazy"
                      className="!w-[100%] !object-cover !h-[300px] !rounded-lg"
                      priority={true}
                      width="0"
                      height="0"
                      sizes="100vw"
                      src={item?.thumbnail?.url}
                      alt={"icon"}
                    
                      
                    />
                    <div className="flex mt-5 items-center ml-3  mx-h-[10px] gap-2">
                      <div>
                        <Image
                          className="rounded-full w-[50px] h-[50px]"
                          priority={true}
                          height={30}
                          width={50}
                          src={item?.channel.icon}
                          alt="icon"
                        />
                      </div>
                      <ExerciseName className="!bg-gray-900">
                        {item?.channel.name}
                      </ExerciseName>
                    </div>
                    <h1 className="font-bold p-2 ml-3 mt-3 text-center text-ellipsis overflow-hidden ">
                      {item?.title}
                    </h1>
                  </Link>
                </SwiperSlide>
              </ExerciseCard>
            );
          })}
        </ForSwiper>
      </ExercisesContainer>
    </Main>
  );
};

export default SecondSection;
