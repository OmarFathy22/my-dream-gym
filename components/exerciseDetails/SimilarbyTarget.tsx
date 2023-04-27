import React, { useEffect, useRef, useState } from 'react'
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import Image from 'next/image'
import Link from 'next/link'
import styled from 'styled-components'
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'
import GymIcon from "../../public/assets/icons/gym.png";
import forwardIcon from "../../public/assets/icons/right-arrow.png";
import backwardIcon from "../../public/assets/icons/left-arrow.png";
import SWIPER from '@/components/SWIPER';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '@/firebase';
import {useDocument } from "react-firebase-hooks/firestore";
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { ExerciseName, Target } from '@/pages/ThirdSection';
import { ExercisesContainer } from '@/pages/ThirdSection';
type Props = {}
const Main = styled.div`
  margin-top: 30px;
  height: 105vh;
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
  border-top: 2px solid red;;
  border-radius: 3px;
  scale: 0.9;
  transition: all 0.5s;
  &:hover{
    scale: 1;
  }
`;
export const ExercisesName = styled.h1`
  font: 20px;
  font-weight: 700;
`;
const MoveSlider = styled.div`
  width: 80%;
  display: flex;
  justify-content: flex-start;
  flex-direction: row-reverse;
  gap: 50px;
  position: absolute;
  right: 50%;
  bottom: 0;
  z-index: 100000;
`;

const SecondSection = ({target}:any) => {
  const [value, loading, error] = useDocument(doc(db, "List by target muscle", target));

  const SlideRef: any = useRef();
  const handleNext = () => {
    SlideRef.current.swiper.slideNext();
  };

  const handlePrev = () => {
    SlideRef.current.swiper.slidePrev();
  };

  if(error) return <h1>error</h1>
  if(loading) return <h1>loading</h1>
  console.log(target);
  return (
    <Main>
      <h1 className="text-[30px] text-left w-full   pl-[40px] font-bold">Similar <span className="text-red-500">Target Muscle</span> Exerscises</h1>  
    <ExercisesContainer >
    <SWIPER SlideRef = {SlideRef} >
    {value?.data()?.Array?.map((item: any, index: number) => {
              return (
                <SwiperSlide key={index} className="mb-[60px]">
                  <ExerciseCard>
                    <Link  href={"/" + item?.id}>
                      <Image
                        loading="lazy"
                        // priority={true}
                        height={300}
                        width={300}
                        src={item?.gifUrl}
                        alt={"icon"}
                      />
                      <div className="flex  gap-2">
                        <Target>{item?.target}</Target>
                        <ExerciseName>{item?.bodyPart}</ExerciseName>
                      </div>
                      <h1 className="font-bold p-2 ">{item?.name}</h1>
                    </Link>
                  </ExerciseCard>
                </SwiperSlide>
              );
            })}
        </SWIPER>
      <MoveSlider>
        <Image
         className="cursor-pointer "
          onClick={handleNext}
          height={30}
          width={30}
          src={forwardIcon}
          alt="icon"
        />
      <Image
       className="cursor-pointer"
        onClick={handlePrev}
        height={30}
        width={30}
        src={backwardIcon}
        alt="icon"
      />
    </MoveSlider>
      
      
    </ExercisesContainer>
  
  </Main>
    )
}



export default SecondSection