import React from 'react'
import Image from 'next/image'
import logo from '../public/assets/images/Logo.png'
import Link from 'next/link'
import { useRouter } from 'next/router';


type Props = {}

function Header({ }: Props) { 
  const router = useRouter();

  return (
    <div className='flex w-[50%] space-x-20 items-end'>
      <Image className='w-[50px] h-[50px]' height={70} width={70} src={logo} alt='logo' />
      <div>
        <Link className= {(router.pathname !== "/Exercises" ? "Active " : "") + "font-semibold mr-7"} href="/" >Home</Link>
        <Link className= {(router.pathname == "/Exercises" ? "Active " : "") + "font-semibold"} href="/Exercises">Exercises</Link>
      </div>

    </div>
  )
}

export default Header