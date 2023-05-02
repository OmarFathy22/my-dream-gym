"use client";
import { useState } from "react";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import Loading from "@/components/Loading";
const SecondSection = dynamic(() => import("@/components/SecondSection"), {
  ssr: false,
  suspense: true,
});
const ThirdSection = dynamic(() => import("@/components/ThirdSection"), {
  ssr: false,
  suspense: true,
});

import FirstSection from "@/components/FirstSection";
// import SecondSection from "@/components/SecondSection";
// import ThirdSection from "@/components/ThirdSection";
// import Footer from "@/components/Footer";
function Home() {

  const [loading, setloading] = useState(true);
  setTimeout(() => {
    setloading(false);
  }, 1000);
  if (loading) {
    return <Loading />;
  }
  return (
    <div className="overflow-hidden">
      <Suspense fallback={<Loading />}>
        <FirstSection />
        <SecondSection />
        <ThirdSection />
      </Suspense>
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
