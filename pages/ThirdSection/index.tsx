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
import {SelectedExercise} from "../../components/features/selectedExercise"
import {EXERCISENAME} from "../../components/features/exerciseName"
import { useDispatch, useSelector } from 'react-redux';
import Loading from '@/pages/Loading';
export const ExercisesContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 30px;
  position: relative;

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
  font-weight: 500;
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
  border-radius: 16px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden; 
  flex:1;
  margin-right: 10px ;
  height: 2.2em;
  font-weight: bold;

`
const ThirdSection = () => {

  const Item = useSelector((state:any) => state.exercisename.value)
  const Item2 = useSelector((state:any) => state.exercise.value)
  const [value, loading, error] = useDocument(doc(db, "List by body part", Item));
  const [ArrayLength, setArrayLength] = useState(1)
  const [isCounted, setisCounted] = useState(false)
  const router = useRouter();
  useEffect(() => {
    setisCounted(false)
  } , [EXERCISENAME])
  const recordsNum = 6;
  const [selectedNum, setselectedNum] = useState(recordsNum)
  const paginationWidth = Math.ceil(ArrayLength / recordsNum)
  const pageCount = paginationWidth;
  const handlePageClick = (data: any) => {
    let selected = data.selected;
    setselectedNum((selected + 1)*recordsNum);
  };
    if(error) console.log(error); 
    if(loading){
      return <Loading/>
    }
    if(value) {
      if(!isCounted){
        setArrayLength(value?.data()?.firstArray?.length)
        setisCounted(true)
      }
    }
      return (
        <div>
          <div className='mobile:mt-20'>
            <ExercisesContainer>
              {value && value?.data()?.firstArray?.slice(selectedNum-recordsNum,selectedNum).map((item: any, index: number) => {
                return (
                  <ExerciseCard key={index} onClick={async() => {
                    // dispatch(SelectedExercise(item));
                    await setDoc(doc(db, "ITEM", "res"), {
                      SELECTEDITEM: item,
                    });  
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