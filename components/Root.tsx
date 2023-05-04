import React from 'react'
import FirstSection from "@/components/FirstSection";
import Footer from "@/components/Footer";
import SecondSection from "@/components/SecondSection";
import ThirdSection from "@/components/ThirdSection";
type Props = {}

const Root = (props: Props) => {
  return (
    <div className="overflow-hidden">
      <FirstSection />
        <SecondSection />
        <ThirdSection />
        <Footer/>
    </div>
  )
}

export default Root