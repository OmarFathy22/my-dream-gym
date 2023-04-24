'use client';
import FirstSection from "@/components/FirstSection";
import Footer from "@/components/Footer";
import SecondSection from "./SecondSection/index";
import axios from 'axios'
import ThirdSection from "./ThirdSection";
import { useState } from "react";

function Home({ exercises , bodyPart }: any) {    
  const [exerciseName, setexerciseName] = useState('back')
  return (
    <div>
      <FirstSection />
      <SecondSection exercises = {exercises} setexerciseName = {setexerciseName} exerciseName = {exerciseName}/> 
      <ThirdSection   exerciseName = {exerciseName}/>
      {/* <Footer/> */}
    </div>
  );
}



export const getStaticProps = async () => {
  const options = {
    method: 'GET',
    url: 'https://exercisedb.p.rapidapi.com/exercises/bodyPartList',
    headers: {
      'content-type': 'application/octet-stream',
      'X-RapidAPI-Key': "52424c0bd8msh3ac18a221b579f1p18f335jsn0d6b325cbe21",
      'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
    }
  };
  const res = await axios.request(options);
  return {
    props: {
      exercises: res.data,
    
    }
  }
}



export default Home;
