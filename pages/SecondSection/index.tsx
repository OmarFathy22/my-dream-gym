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
import {EXERCISENAME} from '../features/exerciseName'
import { useDispatch, useSelector } from 'react-redux';
import { ExerciseName } from '../ThirdSection/index';
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
const Text = styled.h1`
  font-size: 35px;
  width: 100%;
  font-weight: 500;
  text-align: center;
`;
const SearchBox = styled.div`
  width: 100%;
  display: flex;
`;
const SearchBar = styled.input`
  flex: 9;
  border: 1px solid #888;
  border-radius: 2px;
  padding: 10px;
  color: #888;
  &:focus {
    outline: none;
  }
`;
const SearchButton = styled.button`
  border: none;
  background-color: #fe3535;
  color: #e0dede;
  border-radius: 2px;
  flex: 2;
`;
export const CardsBox = styled.div`
  width: 100%;
  display: flex;
  gap: 30px;
  flex-wrap: wrap;
  align-items: center;
  position: relative;
  justify-content: center;
  flex-direction: column;
`;
export const ExerciseCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 30px;
  cursor: pointer;
  width: 200px;
  height: 250px;
  background-color: white;
  border-radius: 3px;
  margin-bottom: 60px;
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
`;

const SecondSection = () => {
  const [Value, loading, error] = useDocument(doc(db, "List of bodyparts", "result"));
  const exerciseName = useSelector((state:any) => state.exercisename.value)
 const dispatch = useDispatch()
 const [TempArray, setTempArray] = useState([])
//  useEffect(() => {
//    const renderArray = async() => {
// const options = {
//   method: 'GET',
//   url: `https://exercisedb.p.rapidapi.com/exercises/equipment/${exerciseName}`,
//   headers: {
//     'content-type': 'application/octet-stream',
//     'X-RapidAPI-Key': '44a7c0af56msh63e4b6a53bd328cp1544dajsn6b850a3623bb',
//     'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
//   }
// };

// try {
// 	const response = await axios.request(options);
// 	console.log(response.data);
//   setTempArray(response.data)
// } catch (error) {
// 	console.error(error);
// }
//    }
//     renderArray()
//  }, [exerciseName])
  const SlideRef: any = useRef();
  const handleNext = () => {
    SlideRef.current.swiper.slideNext();
  };

  const handlePrev = () => {
    SlideRef.current.swiper.slidePrev();
  };
  // const sendData = async () => {

  //   await setDoc(doc(db, "List by equipment", EXERCISENAME.toString() ), {
  //     Array: TempArray,
  //   });  
    
  //   }
  if(error) return <h1>error</h1>
  if(loading) return <h1>loading</h1>
  if(Value) console.log("Valueeeee", Value?.data()?.firstArray)
  return (
    <Main>
    <Text>
      Awesome Exercises You <br /> Should Know
    </Text>
    <SearchBox>
      <SearchBar placeholder="Search Exercises" />
      <SearchButton>Search</SearchButton>
    </SearchBox>
    <CardsBox >
      
        <SWIPER SlideRef = {SlideRef} >
          { Value?.data()?.firstArray?.map((exercise:any , index:number) => {
            return(
              <SwiperSlide
              onClick={() => {
                console.log("cliked", exercise);
                dispatch(EXERCISENAME(exercise));
                console.log("doneeeeeeeee" , exerciseName);
                // sendData()
               window.scrollTo({top:1800 , left:100,behavior:"smooth"})
             }} className="swiper-slide pl-[1.9rem]" key={index}>
               <ExerciseCard className={EXERCISENAME === exercise ? "border-t-[4px] border-red-500":""}>
                 {/* <Link
                   className="flex flex-col gap-5 justify-center items-center w-full h-full"
                   href={"/Exercises"}
                   
                 > */}
                   <div>
                     <Image
                       priority
                       height={50}
                       width={50}
                       src={GymIcon}
                       alt={"icon"}
                     />
                   </div>
                   <ExercisesName>{exercise}</ExercisesName>
                 {/* </Link> */}
               </ExerciseCard>
             </SwiperSlide>
            )
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
    </CardsBox>
  
  </Main>
    )
}



export default SecondSection