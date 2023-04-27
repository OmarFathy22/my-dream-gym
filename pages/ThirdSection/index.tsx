import React from 'react'
import styled from 'styled-components';
import Image from 'next/image';
import ReactPaginate from 'react-paginate';
import { useState , useEffect } from 'react';
import axios from 'axios'
import { useRouter } from 'next/router';
import Link from 'next/link';
import { doc, setDoc } from "firebase/firestore"; 
import {db} from '../../firebase'
import { useDocument } from 'react-firebase-hooks/firestore';
import {SelectedExercise} from "../features/selectedExercise"
import { useDispatch, useSelector } from 'react-redux';

export const ExercisesContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 30px;
`

export const ExerciseCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 420px;
  width: 320px;
  border-radius: 3px;
  background-color: white;
  border-top: 2px solid red;
`
export const Target = styled.button`
background-color: #ee8989;
  border: none;
  color: white;
  padding: 5px 10px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 16px;
`
export const ExerciseName = styled.button`
  background-color: #f3d657;
  border: none;
  color: white;
  padding: 5px 10px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 16px;
`
const ThirdSection = ({exerciseName }: any) => {
  const [value, loading, error] = useDocument(doc(db, "List by body part", exerciseName));
  const [ArrayLength, setArrayLength] = useState(1)
  const [isCounted, setisCounted] = useState(false)
  const dispatch = useDispatch();
  const router = useRouter();
  const uId = router.query;
  const [bodyPart, setbodyPart] = useState([])
  // useEffect(() => {
  //   const renderingExercises = async() => {
  //     const options2 = {
  //       method: 'GET',
  //       url: `https://exercisedb.p.rapidapi.com/exercises/bodyPart/${exerciseName}`,
  //       headers: {
  //         'content-type': 'application/octet-stream',
  //         'X-RapidAPI-Key': '6dd8960324mshd96e07e4e75a71ap11c919jsnb14d66383537',
  //         'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
  //       }
  //     };
  //     const res = await axios.request(options2);
  //     setbodyPart(res.data);
  //   }
  //   renderingExercises()
  // }, [exerciseName])
  useEffect(() => {
    setisCounted(false)
  } , [exerciseName])
  const recordsNum = 6;
  const [selectedNum, setselectedNum] = useState(recordsNum)
  const paginationWidth = Math.ceil(ArrayLength / recordsNum)
  const pageCount = paginationWidth;
  const handlePageClick = (data: any) => {
    let selected = data.selected;
    setselectedNum((selected + 1)*recordsNum);
  };
  const sendData = async () => {

    await setDoc(doc(db, "List by body part",exerciseName ), {
      firstArray: bodyPart,
    });  
    }
    if(error) return <h1>error</h1>
    if(loading) return <h1>loading</h1>
    if(value) {
      console.log(value?.data()?.firstArray?.length)
      if(!isCounted){
        setArrayLength(value?.data()?.firstArray?.length)
        setisCounted(true)
      }
    }
      return (
        <div>
          <div>
            <ExercisesContainer>
              {value && value?.data()?.firstArray?.slice(selectedNum-recordsNum,selectedNum).map((item: any, index: number) => {
                return (
                  <ExerciseCard key={index} onClick={() => {
                    dispatch(SelectedExercise(item));
                  }}>
                  <Link href={'/' + item?.id}>
                      <Image    
                       loading='lazy'
                        // priority
                        height={300}
                        width={300}
                        src={item?.gifUrl}
                        alt={"icon"} />
                      <div className='flex  gap-2'>
                          <Target>{item?.target}</Target>
                          <ExerciseName>{item?.bodyPart}</ExerciseName>
                      </div>
                      <h1 className='font-bold p-2'>{item?.name}</h1>
                  </Link>
                  </ExerciseCard>
                )
              })}
              
                </ExercisesContainer>
            <button className="bg-red-500 m-10"
            onClick={() => {
              sendData();
              console.log("doneeeeeeeeeeeeeee");
            }}
            >Send Data</button>
          </div>
          <ReactPaginate
              className='py-7 flex justify-center items-center gap-3'
              containerClassName='pagination'
              pageClassName='page-item'
              pageLinkClassName='page-link'
              previousLabel="< "
              nextLabel=" >"
              breakLabel="..."
              onPageChange={handlePageClick}
              pageCount={pageCount}
              pageRangeDisplayed={3}
              marginPagesDisplayed={2}
              renderOnZeroPageCount={null}
              activeClassName='bg-red-400 text-white px-2 py-[2px] rounded-sm'
            />
        </div>
      )
    
}

export default ThirdSection; 