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

import { useSelector } from "react-redux";
import SimilarbyTarget from "./SimilarbyTarget";
import SimilarByEquipment from "./SimilarByEquipment";
import { useDocument } from "react-firebase-hooks/firestore";
import { doc } from "firebase/firestore";
import { db } from "@/firebase";
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
  const [value, loading, error] = useDocument(doc(db, "ITEM", 'res'));
  const [stillLoading, setstillLoading] = useState<any>('');
  const [SimilarExercises, setSimilarExercises] = useState<any>([]);
  const [SimilarEquipments, setSimilarEquipments] = useState<any>([]);
  const [RelatedVideos, setRelatedVideos] = useState<any>([]);
  const recordsNum = 6;
  const [selectedNum, setselectedNum] = useState(recordsNum);
  const paginationWidth = Math.ceil(SimilarExercises.length / recordsNum);
  const pageCount = paginationWidth;
  const handlePageClick = (data: any) => {
    let selected = data.selected;
    setselectedNum((selected + 1) * recordsNum);
  };

  const SliderRef2: any = useRef();
  console.log('iteeeeeeeeeeeeeeeeem');
  if(error)console.log(error);
  if(loading)console.log(loading);
  if(value)console.log("doneeeeeeeee");
  return (
    <div>
      <div className="pt-4">
        <Header />
      </div>
        <ParentSection>
        <main className="flex items-center">
          <Section>
            {value?.data()?.SELECTEDITEM.gifUrl && (
              <Image
                loading="lazy"
                className="h-[80%]"
                width={500}
                height={500}
                src={value.data()?.SELECTEDITEM.gifUrl}
                alt="image"
              />
            )}
          </Section>
          <Section>
            <h1 className="text-[40px] font-bold  ">{value?.data()?.SELECTEDITEM.name}</h1>
            <p>
              Exercieses Keep you strong. {value?.data()?.SELECTEDITEM.name} is one of the best.
              exercieses to target your {value?.data()?.SELECTEDITEM.target}.It will help you improve
              your mood and gain energy
            </p>
            <article className="flex flex-col gap-[30px] w-full">
              <div className="flex gap-3 items-center">
                <div className="bg-yellow-100 rounded-full p-5">
                  <Image width={40} height={40} src={bodyPartlogo} alt="icon" />
                </div>
                <h4 className="font-semibold">{value?.data()?.SELECTEDITEM.bodyPart}</h4>
              </div>
              <div className="flex gap-3 items-center">
                <div className="bg-yellow-100 rounded-full p-5">
                  <Image width={40} height={40} src={targetlogo} alt="icon" />
                </div>
                <h4 className="font-semibold">{value?.data()?.SELECTEDITEM.target} </h4>
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
                <h4 className="font-semibold">{value?.data()?.SELECTEDITEM.equipment} </h4>
              </div>
            </article>
          </Section>
        </main>
       {value && <SimilarbyTarget target ={value?.data()?.SELECTEDITEM?.target}/>}
       {value && <SimilarByEquipment equipment={value?.data()?.SELECTEDITEM?.equipment}/>}
      </ParentSection>
      <section className="flex gap-3 justify-center flex-wrap">
          
        </section>
    </div>
  );
};

export default Details;
