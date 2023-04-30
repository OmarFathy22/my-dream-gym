import React from 'react'
import Image from 'next/image'
import logo from '../public/assets/images/0_Mohamed-Salah-Liverpool-removebg.png'


const FirstSection = () => {
  return (
    <main className="flex items-center ">
        <section className="  flex flex-1 justify-center flex-col h-[99.9vh]">
          <div className="relative mobile:items-center mobile:justify-start desktop:h-[90%] flex flex-col gap-6 justify-center">
            <h3 className="text-red-500 text-2xl font-medium">Fintness Club</h3>
            <h1 className="text-[45px] font-bold">
              Sweat, Smile <br /> And Repeat
            </h1>
            <p className="text-[15px]">
              Check out the most effective exercises personalized to you
            </p>
            <button className="text-[18px] w-fit text-gray-200 bg-red-600 rounded-sm py-[4px] px-[10px]">
              Explore Exercises
            </button>
          </div>
          <h1 className=" mobile:text-[100px] mobile:text-center mobile:static tablet:text-[140px] absolute bottom-[-120px] left-12  laptop:text-[220px] text-red-100 ">
            Exercise
          </h1>
        </section>
        <section className="laptop:flex laptop:absolute laptop:top-[20px] laptop:right-[0px] hidden flex-2 ">
          <Image
            className="h-[100vh] w-[100%] relative z-10"
            quality={100}
            priority
            width={500}
            height={500}
            src={logo}
            alt="image"
          />
        </section>
      </main>

  )
}

export default FirstSection