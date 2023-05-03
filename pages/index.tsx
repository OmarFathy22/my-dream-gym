"use client";
// import { useState } from "react";
import FirstSection from "@/components/FirstSection";
import Footer from "@/components/Footer";
import SecondSection from "@/components/SecondSection";
import ThirdSection from "@/components/ThirdSection";
import Head from "next/head";
function Home() {

  return (
    <div className="overflow-hidden">
       <Head>
       <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests"/>
       </Head>
        <FirstSection />
        <SecondSection />
        <ThirdSection />
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
