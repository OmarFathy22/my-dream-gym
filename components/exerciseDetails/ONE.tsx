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
import { useSelector } from "react-redux";
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
  const Item = useSelector((state:any) => state.exercise.value)
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

//   useEffect(() => {
//     const renderingExercises = async () => {
//       const options = {
//         method: "GET",
//         url: `https://exercisedb.p.rapidapi.com/exercises/exercise/${uId}`,
//         headers: {
//           'content-type': 'application/octet-stream',
//           'X-RapidAPI-Key': '8451c7a52emsh643db112ce206d8p1260a1jsnb1030c5df37a',
//           'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
//         }
//       };
//       const res = await axios.request(options);
//       setItem(res.data);
//       setstillLoading(res.data.name)
//     };
//     renderingExercises();
//   }, [uId]);
  useEffect(() => {
    const renderingSimilarExercises = async () => {
      const options = {
        method: "GET",
        url: `https://exercisedb.p.rapidapi.com/exercises/target/${
          Item.target ? Item.target : "lats"
        }`,
        headers: {
          'content-type': 'application/octet-stream',
          'X-RapidAPI-Key': '6dd8960324mshd96e07e4e75a71ap11c919jsnb14d66383537',
          'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
        }
      };
      const similar = await axios.request(options);
      setSimilarExercises(similar.data);
    };
    renderingSimilarExercises();
  }, [Item]);
//   useEffect(() => {
//     const renderingSimilarEquipment = async () => {
//       const options = {
//         method: "GET",
//         url: "https://exercisedb.p.rapidapi.com/exercises/equipment/assisted",
//         headers: {
//           'content-type': 'application/octet-stream',
//           'X-RapidAPI-Key': '6dd8960324mshd96e07e4e75a71ap11c919jsnb14d66383537',
//           'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
//         }
//       };

//       try {
//         const response = await axios.request(options);
//         const similar = await axios.request(options);
//         setSimilarEquipments(similar.data);
//       } catch (error) {
//         console.error("errorrrrrrrrrrrr" , setSimilarEquipments);
//       }
//     };
//     renderingSimilarEquipment();
//   }, []);
//   useEffect(() => {
//     const renderingRelatedVideos = async () => {
// const options = {
//   method: 'GET',
//   url: 'https://simple-youtube-search.p.rapidapi.com/search',
//   params: {
//     query: stillLoading,
//     safesearch: 'false'
//   },
//   headers: {
//     'content-type': 'application/octet-stream',
//     'X-RapidAPI-Key': '6dd8960324mshd96e07e4e75a71ap11c919jsnb14d66383537',
//     'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
//   }
// };

// try {
// 	const response = await axios.request(options);
//   setRelatedVideos(response.data.results);
//   console.log(response.data.results);
//   console.log(Item.name)
// } catch (error) {
// 	console.error(error);
// }
//     };
//     renderingRelatedVideos();
//   }, []);
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
      
        <h1 className="text-[30px] text-left w-full my-6  pl-[40px] font-bold">Similar <span className="text-red-500">Target Muscle</span> Exerscises</h1>      
        <ExercisesContainer>
          <SWIPER SlideRef={SliderRef1}>
            {/* {SimilarExercises.map((item: any, index: number) => {
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
            })} */}
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
        <h1  className="text-[30px] pl-[40px] text-left w-full my-6 font-bold">Similar <span className="text-red-500">Equipment</span> Exerscises</h1>
        <ExercisesContainer>
          <SWIPER SlideRef={SliderRef2}>
            {/* {SimilarEquipments.map((item: any, index: number) => {
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
            })} */}
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
        
      </ParentSection>
      <section className="flex gap-3 justify-center flex-wrap">
            {/* {
            RelatedVideos?
            (RelatedVideos.slice(0 , Math.min(RelatedVideos.length , 3)).map((item:any , index:number) => {
                console.log(item.name);
                console.log
                return(
                   <div key={index} className="w-[340px] h-[300px] ">
                    <Link target="_blank" href={item.shorts_url} className="">
                      <Image className="rounded-md" width={item.thumbnail.width} height={item.thumbnail.height} src={item.thumbnail.url} alt={"image"}/>
                    </Link>
                   </div>
                )
              })):
               <h1>not found</h1>
            } */}
        </section>
    </div>
  );
};

export default Details;
