import React from 'react'
import Image from 'next/image'
import logo from '../public/assets/images/Logo.png'
import Link from 'next/link'
import { useRouter } from 'next/router';



function Header() { 
  const router = useRouter();

  return (
    <div className='flex pt-3  items-end'>
      <a href={"/"} className='mr-20 200screen:mr-10'> 
        <Image className='w-[50px] h-[50px]' height={70} width={70} src={logo} alt='logo' />
      </a>
      <div>
        <Link href={"/"} className={(router.pathname == '/' ? "border-b-2 border-b-red-500 font-bold mr-7" : " font-bold mr-7 text-red") }>Home</Link>
        <Link className= {(router.pathname !== '/' ? "!border-b-2 !border-b-red-500 !font-bold" : "!font-bold") } href="/Exercises">Exercises</Link>
      </div>

    </div>
  )
}

export default Header