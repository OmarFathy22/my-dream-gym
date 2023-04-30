'use client';
import FirstSection from "@/components/FirstSection";
import SecondSection from "./SecondSection/index";
import ThirdSection from "./ThirdSection";
import Footer from "@/components/Footer";
import { useState } from "react";
import Loading from "./Loading";


function Home() {   
  const [loading, setloading] = useState(true)
  setTimeout(() => {
    setloading(false)
  }, 1000);
  if(loading){
    return <Loading/>
  }
  return (
    <div className="overflow-hidden">
      <FirstSection />
      <SecondSection/> 
      <ThirdSection/>
      <Footer/>
    </div>
  );
}



// export const getStaticProps = async () => {
//   const options = {
//     method: 'GET',
//     url: 'https://exercisedb.p.rapidapi.com/exercises/equipmentList',
//     headers: {
//       'content-type': 'application/octet-stream',
//       'X-RapidAPI-Key': '44a7c0af56msh63e4b6a53bd328cp1544dajsn6b850a3623bb',
//       'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
//     }
//   };
//   const res = await axios.request(options);
//   return {
//     props: {
//       exercises: res.data,
//     }
//   }
// }



export default Home;
