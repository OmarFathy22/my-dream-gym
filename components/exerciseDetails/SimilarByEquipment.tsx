import React, { useRef } from "react";
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
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/firebase";
import { useDocument } from "react-firebase-hooks/firestore";
import { ExerciseName, Target } from "@/pages/ThirdSection";
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
  border-top: 2px solid red;
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

const SecondSection = ({ equipment }: any) => {
  const [value, loading, error] = useDocument(
    doc(db, "List by equipment", equipment)
  );
  const SlideRef: any = useRef();
  let Id = new Date().getTime();
  if (error) return <h1>error</h1>;
  if(loading){
    console.log("loading.....");
    return <Loading/>
  }
  return (
    <Main>
      <h1 className="mobile:text-[24px] tablet:text-[30px] text-center w-full  font-bold">
        Similar <span className="text-red-500">Equipment</span> Exerscises
      </h1>
      <ExercisesContainer>
        <ForSwiper SlideRef={SlideRef}>
          {value?.data()?.Array?.map((item: any, index: number) => {
            return (
              <ExerciseCard
               key={item.id}
                className=" !rounded-lg"
                onClick={async () => {
                  await setDoc(doc(db, "ITEM", "res"), {
                    SELECTEDITEM: item,
                  });
                }}
              >
                <SwiperSlide
                  key={index}
                  onClick={async () => {
                    await setDoc(doc(db, "ITEM", "res"), {
                      SELECTEDITEM: item,
                    });
                  }}
                  
                  className="
                  
                  !h-[100%] !w-full !flex !justify-center mb-10"
                >
                  <Link
                    className="!rounded-lg !h-full !w-full bg-white"
                    href={"/" + item?.id}
                  >
                    <Image
                      className="!w-[350px] !h-[80%] !rounded-[30px]"
                      priority={true}
                      height={100}
                      width={100}
                      src={item?.gifUrl}
                      alt={"icon"}
                    />
                    <div className="flex pl-5 pr-3 gap-2">
                      <Target>{item?.target}</Target>
                      <ExerciseName>{item?.bodyPart}</ExerciseName>
                    </div>
                    <h1 className="font-bold p-2 pt-4 text-center ">
                      {item?.name}
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
