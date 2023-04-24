import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import bodyPartlogo from "../../public/assets/icons/body-part.png";
import equipmentlogo from "../../public/assets/icons/equipment.png";
import targetlogo from "../../public/assets/icons/target.png";
import Header from "../Header";
import axios from "axios";
import styled from "styled-components";
import {
  ExerciseName,
  ExercisesContainer,
  Target,
} from "../../pages/ThirdSection/index";
import { ExerciseCard } from "../../pages/ThirdSection/index";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";

import SWIPER from "../SWIPER";
import Link from "next/link";
import forwardIcon from "../../public/assets/icons/right-arrow.png";
import backwardIcon from "../../public/assets/icons/left-arrow.png";
const MoveSlider = styled.div`
  width: 80%;
  display: flex;
  justify-content: flex-start;
  flex-direction: row-reverse;
  gap: 50px;
`;
type Props = {};
const Section = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  height: 95vh;
  flex: 1;
  gap: 30px;
`;
const ParentSection = styled.section`
  display: flex;
  flex-direction: column;
  padding-top: 15px;
  align-items: center;
  justify-content: center;
`;
const Details = ({ uId }: any) => {
  const [Item, setItem] = useState<any>({});
  const [SimilarExercises, setSimilarExercises] = useState<any>([]);
  const [SimilarEquipments, setSimilarEquipments] = useState<any>([]);
  const recordsNum = 6;
  const [selectedNum, setselectedNum] = useState(recordsNum);
  const paginationWidth = Math.ceil(SimilarExercises.length / recordsNum);
  const pageCount = paginationWidth;
  const handlePageClick = (data: any) => {
    let selected = data.selected;
    setselectedNum((selected + 1) * recordsNum);
  };

  useEffect(() => {
    const renderingExercises = async () => {
      const options = {
        method: "GET",
        url: `https://exercisedb.p.rapidapi.com/exercises/exercise/${uId}`,
        headers: {
          "content-type": "application/octet-stream",
          "X-RapidAPI-Key":
            "52424c0bd8msh3ac18a221b579f1p18f335jsn0d6b325cbe21",
          "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
        },
      };
      const res = await axios.request(options);
      setItem(res.data);
    };
    renderingExercises();
  }, [uId]);
  useEffect(() => {
    console.log(Item.target);
    const renderingSimilarExercises = async () => {
      console.log(Item.target);
      const options = {
        method: "GET",
        url: `https://exercisedb.p.rapidapi.com/exercises/target/${
          Item.target ? Item.target : "lats"
        }`,
        headers: {
          "content-type": "application/octet-stream",
          "X-RapidAPI-Key":
            "52424c0bd8msh3ac18a221b579f1p18f335jsn0d6b325cbe21",
          "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
        },
      };
      const similar = await axios.request(options);
      setSimilarExercises(similar.data);
      console.log(Item.target);
    };
    renderingSimilarExercises();
    console.log("doneeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee", Item.gifUrl);
  }, [Item]);
  useEffect(() => {
    const renderingSimilarEquipment = async () => {
      const options = {
        method: "GET",
        url: "https://exercisedb.p.rapidapi.com/exercises/equipment/assisted",
        headers: {
          "content-type": "application/octet-stream",
          "X-RapidAPI-Key":
            "52424c0bd8msh3ac18a221b579f1p18f335jsn0d6b325cbe21",
          "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
        },
      };

      try {
        const response = await axios.request(options);
        console.log(response.data);
        const similar = await axios.request(options);
        setSimilarEquipments(similar.data);
      } catch (error) {
        console.error("errorrrrrrrrrrrr" , setSimilarEquipments);
      }
    };
    renderingSimilarEquipment();
  }, []);
  const SliderRef1: any = useRef();
  const SliderRef2: any = useRef();
  const swiper = useSwiper();

  const handleNext = (SliderRef:any) => {
    SliderRef.current.swiper.slideNext();
  };

  const handlePrev = (SliderRef:any) => {
    SliderRef.current.swiper.slidePrev();
  };
  return (
    <div>
      <div className="pt-4">
        <Header />
      </div>
      <ParentSection>
        <main className="flex items-center" key={Item}>
          <Section>
            {Item.gifUrl && (
              <Image
                loading="lazy"
                className="h-[80%]"
                width={500}
                height={500}
                src={Item.gifUrl}
                alt="image"
              />
            )}
          </Section>
          <Section>
            <h1 className="text-[50px] font-bold  ">{Item?.name}</h1>
            <p>
              Exercieses Keep you strong. {Item?.name} is one of the best.
              exercieses to target your {Item?.target}.It will help you improve
              your mood and gain energy
            </p>
            <article className="flex flex-col gap-[30px] w-full">
              <div className="flex gap-3 items-center">
                <div className="bg-yellow-100 rounded-full p-5">
                  <Image width={40} height={40} src={bodyPartlogo} alt="icon" />
                </div>
                <h4 className="font-semibold">{Item?.bodyPart}</h4>
              </div>
              <div className="flex gap-3 items-center">
                <div className="bg-yellow-100 rounded-full p-5">
                  <Image width={40} height={40} src={targetlogo} alt="icon" />
                </div>
                <h4 className="font-semibold">{Item?.target} </h4>
              </div>
              <div className="flex gap-3 items-center">
                <div className="bg-yellow-100 rounded-full p-5">
                  <Image
                    width={40}
                    height={40}
                    src={equipmentlogo}
                    alt="icon"
                  />
                </div>
                <h4 className="font-semibold">{Item?.equipment} </h4>
              </div>
            </article>
          </Section>
        </main>

        <ExercisesContainer>
          <SWIPER SlideRef={SliderRef1}>
            {SimilarExercises.map((item: any, index: number) => {
              console.log(item.id);
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
                      <h1 className="font-bold p-2">{item?.name}</h1>
                    </Link>
                  </ExerciseCard>
                </SwiperSlide>
              );
            })}
          </SWIPER>
        </ExercisesContainer>
        <MoveSlider>
          <Image
            className="cursor-pointer "
            onClick={() => {
              handleNext(SliderRef1)
            }}
            height={30}
            width={30}
            src={forwardIcon}
            alt="icon"
          />
          <Image
            className="cursor-pointer"
            onClick={() => {
              handlePrev(SliderRef1)
            }}
            height={30}
            width={30}
            src={backwardIcon}
            alt="icon"
          />
        </MoveSlider>
        <h1>everything is doing well</h1>
        <ExercisesContainer>
          <SWIPER SlideRef={SliderRef2}>
            {SimilarEquipments.map((item: any, index: number) => {
              return (
                <SwiperSlide key={index} className="mb-[60px]">
                  <ExerciseCard>
                    <Link href={"/" + item?.id}>
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
                      <h1 className="font-bold p-2">{item?.name}</h1>
                    </Link>
                  </ExerciseCard>
                </SwiperSlide>
              );
            })}
          </SWIPER>
        </ExercisesContainer>
        <MoveSlider>
          <Image
            className="cursor-pointer "
            onClick={() => {
              handleNext(SliderRef2)
            }}
            height={30}
            width={30}
            src={forwardIcon}
            alt="icon"
          />
          <Image
            className="cursor-pointer"
            onClick={() => {
              handlePrev(SliderRef2)
            }}
            height={30}
            width={30}
            src={backwardIcon}
            alt="icon"
          />
        </MoveSlider>
        <h1>everything is doing well</h1>
      </ParentSection>
    </div>
  );
};

export default Details;
