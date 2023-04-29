import React from 'react'
import logo from '../public/assets/images/Logo.png'
import Image from 'next/image'
import styled from 'styled-components'
import Head from 'next/head'


type Props = {}
const GymName = styled.h1`
    
 `
const Footer = (props: Props) => {
  return (
    <div>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Abril+Fatface&display=swap" rel="preconnect" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Abril+Fatface&family=Orbitron&display=swap" rel="preconnect" />
      </Head>
      <footer className='bg-white flex justify-center items-center mt-10   gap-3 py-5 rounded-md border-t-2 border-t-red-500 flex-col '>
        <div className='flex gap-2 items-end'>
          <Image height={30} width={30} src={logo} alt='icon' />
          <GymName style={{ fontFamily: 'Abril Fatface, cursive', textTransform: 'lowercase' }} className='morata'>Mortos Gym</GymName>
        </div>
        <div>
          <h3 style={{ fontFamily: 'Orbitron ,sans-serif,Abril Fatface , cursive' , fontWeight: '400' , color: "#f07408" }}>Made with ❤️ by Omar Fathy</h3>
    </div>
      </footer >
    </div >
  )
} 

export default Footer